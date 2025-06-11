import json
import pandas as pd
import boto3

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
    servidor_id = event.get('servidor')  # Novo parâmetro opcional para filtrar por servidor específico

    # Validação obrigatória
    if not datacenter:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps('datacenter não informado.')
        }

    try:
        # Download do arquivo do S3
        key = f'dadosRobertClient/processosPythonTeste.csv'
        bucket = 'bucket-client-tradeflux-123'
        local_file = '/tmp/processos.csv'
        
        s3.download_file(bucket, key, local_file)
        df = pd.read_csv(local_file)

        # Filtrar pelos dias solicitados (se especificado)
        if qtd_dias:
            df_filtrado = df[df['dias'] == int(qtd_dias)]
            if df_filtrado.empty:
                return {
                    'statusCode': 404,
                    'headers': cors_headers,
                    'body': json.dumps(f'Nenhum dado encontrado para {qtd_dias} dias.')
                }
        else:
            df_filtrado = df  # Retorna todos os períodos

        # Filtrar por servidor específico (se especificado)
        if servidor_id:
            df_filtrado = df_filtrado[df_filtrado['servidor'] == int(servidor_id)]
            if df_filtrado.empty:
                return {
                    'statusCode': 404,
                    'headers': cors_headers,
                    'body': json.dumps(f'Nenhum dado encontrado para o servidor {servidor_id}.')
                }

        # Agrupar por período (dias)
        periodos_unicos = sorted(df_filtrado['dias'].unique())
        resultado = {}
        
        for periodo in periodos_unicos:
            dados_periodo = df_filtrado[df_filtrado['dias'] == periodo]
            
            # Agrupar por servidor
            servidores_unicos = sorted(dados_periodo['servidor'].unique())
            periodo_resultado = []
            
            for servidor in servidores_unicos:
                dados_servidor = dados_periodo[dados_periodo['servidor'] == servidor]
                
                # Criar lista de processos para este servidor
                processos = []
                for _, row in dados_servidor.iterrows():
                    processos.append({
                        'name': row['name'],
                        'cpuPercent': float(row['cpuPercent']),
                        'ramPercent': float(row['ramPercent'])
                    })
                
                periodo_resultado.append({
                    'servidor': int(servidor),
                    'processos': processos
                })
            
            # Se foi solicitado período específico, retorna array simples
            if qtd_dias:
                # Se também foi especificado um servidor, retorna apenas esse servidor
                if servidor_id:
                    resultado = periodo_resultado[0] if periodo_resultado else {}
                else:
                    resultado = periodo_resultado
            else:
                # Senão, agrupa por período
                resultado[f'{periodo}dias'] = periodo_resultado

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