import boto3
import pandas as pd
import io

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket = 'trusted-israel-058'
    prefixo = 'capturas/'

    resposta = s3.list_objects_v2(Bucket=bucket, Prefix=prefixo)

    # Coletar até 10 arquivos CSV de forma clara
    arquivos = []
    for item in resposta.get('Contents', []):
        chave = item['Key']
        if chave.endswith('.csv'):
            arquivos.append(chave)
        if len(arquivos) == 10:
            break

    todos_dfs = []

    for nome_arquivo in arquivos:
        object_capturas = s3.get_object(Bucket=bucket, Key=nome_arquivo)
        conteudo = object_capturas['Body'].read().decode('utf-8')
        df_captura = pd.read_csv(io.StringIO(conteudo))

        condicao = (df_captura['CPU Percentual'] > 80) | (df_captura['RAM Percentual'] > 80) | (df_captura['Disco Percentual'] > 80)
        df_captura['isAlerta'] = condicao.map(lambda x: 'sim' if x else 'nao')

        todos_dfs.append(df_captura)

    df_final = pd.concat(todos_dfs, ignore_index=True)

    print(df_final.head()) 

    return {
        'statusCode': 200,
        'linhas_processadas': len(df_final)
    }
