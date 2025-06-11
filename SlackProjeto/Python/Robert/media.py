import pandas as pd
import boto3
import json

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Headers CORS para reutilização
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    }
    
    # Tratamento para requisição OPTIONS (CORS preflight)
    if event.get('httpMethod', '') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'message': 'CORS preflight'})
        }
    
    # Verifica se o evento veio do API Gateway (com 'body')
    if 'body' in event:
        try:
            event = json.loads(event['body'])
        except json.JSONDecodeError as e:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps(f'Erro no JSON recebido: {str(e)}')
            }

    # Extrai parâmetros
    qtd_dias = event.get('qtdDias')  # Opcional - se não informado, retorna todos
    datacenter = event.get('datacenter')

    # Validação obrigatória
    if not datacenter:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps('datacenter não informado.')
        }

    try:
        # Download do arquivo do S3
        key = f'dadosRobertClient/client_datacenter{datacenter}_resultado.csv'
        # key = f'dadosRobertClient/mediasPythonTeste.csv'
        bucket = 'bucket-client-tradeflux-123'
        local_file = '/tmp/servidor1.csv'
        
        s3.download_file(bucket, key, local_file)
        df = pd.read_csv(local_file)

        # Filtrar pelos dias solicitados (se especificado)
        if qtd_dias:
            periodo_filtro = f'{qtd_dias} dias'
            df_filtrado = df[df['periodo'] == periodo_filtro]
            if df_filtrado.empty:
                return {
                    'statusCode': 404,
                    'headers': cors_headers,
                    'body': json.dumps(f'Nenhum dado encontrado para {qtd_dias} dias.')
                }
        else:
            df_filtrado = df  # Retorna todos os períodos

        # Debug: verificar se as colunas existem
        required_columns = ['servidor', 'periodo', 'mediaCPU', 'mediaRAM', 'mediaDisco']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps(f'Colunas faltando no CSV: {missing_columns}. Colunas disponíveis: {list(df.columns)}')
            }

        # Agrupar por período
        try:
            periodos_unicos = sorted(df_filtrado['periodo'].unique(), key=lambda x: int(x.split()[0]) if x and len(x.split()) > 0 else 0)
        except (ValueError, IndexError, AttributeError):
            # Fallback para ordenação simples se houver problema com a ordenação customizada
            periodos_unicos = sorted(df_filtrado['periodo'].unique())
        
        resultado = {}
        
        for periodo in periodos_unicos:
            dados_periodo = df_filtrado[df_filtrado['periodo'] == periodo]
            
            # Separar servidores individuais da média total
            servidores_individuais = dados_periodo[dados_periodo['servidor'] != 'mediaTotal']
            media_total = dados_periodo[dados_periodo['servidor'] == 'mediaTotal']
            
            periodo_resultado = []
            
            # Adicionar servidores individuais (ordenados numericamente)
            try:
                # Converter servidor para numérico para ordenação
                servidores_individuais = servidores_individuais.copy()
                servidores_individuais['servidor_num'] = pd.to_numeric(servidores_individuais['servidor'], errors='coerce')
                servidores_individuais = servidores_individuais.sort_values('servidor_num')
            except Exception:
                # Se der erro na ordenação, usa sem ordenar
                pass
                
            for _, row in servidores_individuais.iterrows():
                try:
                    periodo_resultado.append({
                        'servidor': int(float(row['servidor'])) if str(row['servidor']).replace('.', '').isdigit() else row['servidor'],
                        'CPU': float(row['mediaCPU']),
                        'RAM': float(row['mediaRAM']),
                        'Disco': float(row['mediaDisco'])
                    })
                except (ValueError, TypeError) as e:
                    # Log do erro mas continua processamento
                    print(f"Erro ao processar servidor {row['servidor']}: {e}")
                    continue
            
            # Adicionar média total se existir
            if not media_total.empty:
                try:
                    row = media_total.iloc[0]
                    periodo_resultado.append({
                        'servidor': 'mediaTotal',
                        'CPU': float(row['mediaCPU']),
                        'RAM': float(row['mediaRAM']),
                        'Disco': float(row['mediaDisco'])
                    })
                except (ValueError, TypeError) as e:
                    print(f"Erro ao processar mediaTotal: {e}")
            
            # Se foi solicitado período específico, retorna array simples
            if qtd_dias:
                resultado = periodo_resultado
            else:
                # Senão, agrupa por período (usando o número de dias como chave)
                try:
                    dias_numero = periodo.split()[0] if periodo and len(periodo.split()) > 0 else str(periodo)
                    resultado[f'{dias_numero}dias'] = periodo_resultado
                except (AttributeError, IndexError):
                    resultado[str(periodo)] = periodo_resultado

        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps(resultado)
        }

    except FileNotFoundError:
        return {
            'statusCode': 404,
            'headers': cors_headers,
            'body': json.dumps('Arquivo CSV não encontrado no S3.')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps(f'Erro ao processar: {str(e)}') 
        }