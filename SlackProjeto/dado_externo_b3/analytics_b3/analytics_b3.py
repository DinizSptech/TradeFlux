import boto3
import pandas as pd
import io

def lambda_handler(event, context):
    s3 = boto3.client('s3')

    # Nome dos buckets
    bucket_origem = 'trusted-israel-058'
    bucket_destino = 'client-israel-058'

    # Lista até 10 arquivos da pasta capturas/
    resposta = s3.list_objects_v2(Bucket=bucket_origem, Prefix='capturas/')
    arquivos = []
    for item in resposta.get('Contents', []):
        if item['Key'].endswith('.csv'):
            arquivos.append(item['Key'])
        if len(arquivos) == 10:
            break

    # Junta todos os arquivos em um único DataFrame
    lista_dfs = []
    for nome in arquivos:
        obj = s3.get_object(Bucket=bucket_origem, Key=nome)
        texto = obj['Body'].read().decode('utf-8')
        df = pd.read_csv(io.StringIO(texto))
        df['datahora'] = pd.to_datetime(df['Data Hora'], format='%m/%d/%Y %I:%M:%S %p').dt.floor('H')
        lista_dfs.append(df[['datahora', 'CPU Percentual', 'RAM Percentual', 'Disco Percentual']])

    df_capturas = pd.concat(lista_dfs)

    # Lê o arquivo da B3
    obj_b3 = s3.get_object(Bucket=bucket_origem, Key='b3/dados_b3.csv')
    texto_b3 = obj_b3['Body'].read().decode('utf-8')
    df_b3 = pd.read_csv(io.StringIO(texto_b3))
    df_b3['datahora'] = pd.to_datetime(df_b3['datahora'])

    # Junta os dois DataFrames
    df_total = pd.merge(df_capturas, df_b3[['datahora', 'num_negociacoes']], on='datahora')

    # Calcula as correlações
    correlacoes = {
        'CPU Percentual': df_total['num_negociacoes'].corr(df_total['CPU Percentual']),
        'RAM Percentual': df_total['num_negociacoes'].corr(df_total['RAM Percentual']),
        'Disco Percentual': df_total['num_negociacoes'].corr(df_total['Disco Percentual']),
    }

    # Pega a maior correlação positiva
    melhor_variavel = ''
    melhor_valor = 0
    for nome, valor in correlacoes.items():
        if valor > melhor_valor:
            melhor_variavel = nome
            melhor_valor = valor

    # Cria um DataFrame com o resultado
    resultado = pd.DataFrame([{
        'variavel': melhor_variavel,
        'correlacao': round(melhor_valor, 4)
    }])

    # Salva como CSV
    buffer = io.StringIO()
    resultado.to_csv(buffer, index=False)

    # Envia para o bucket client
    s3.put_object(
        Bucket=bucket_destino,
        Key='saida/melhor_correlacao.csv',
        Body=buffer.getvalue()
    )

    return {
        'statusCode': 200,
        'variavel': melhor_variavel,
        'correlacao': round(melhor_valor, 4),
        'mensagem': 'Arquivo enviado para o bucket client com sucesso.'
    }
