import json
import pandas as pd
from datetime import datetime, timedelta
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):
    """    
    Como tem que vir o JSON pra não dar cadu:
    - qtdDias: int (7, 30, 90)
    Isso é mandado pelo front tbk
    - dtInicial: str (YYYY-MM-DD HH:MM:SS)
    Isso é tratado no front
    - datacenter: int → define o nome do arquivo client_datacenter{N}.csv
    Isso é pego de acordo com da onde é o cientista
    """
        
    qtd_dias = int(event.get('qtdDias'))
    dt_inicial_str = event.get('dtInicial')
    datacenter = event.get('datacenter')
    # Tá pegando os valores do JSON

    if not dt_inicial_str:
        return {
            'statusCode': 400,
            'body': json.dumps('dtInicial não informada.')
        }
        
    if datacenter is None:
        return {
            'statusCode': 400,
            'body': json.dumps('datacenter não informado.')
        }

    dt_inicial = datetime.strptime(dt_inicial_str, '%Y-%m-%d %H:%M:%S')
    dt_final = dt_inicial + timedelta(days=qtd_dias)

    # --- Monta key do arquivo ---
    key = f'Datacenter1Robert/client_datacenter{datacenter}.csv'
    bucket = 'bucket-client-tradeflux-123 '
    local_file = f'/tmp/{key}'
    # Salvando em um arquivo temporário

    # --- Download do arquivo ---
    s3.download_file(bucket, key, local_file)

    # --- Leitura do CSV inteiro ---
    df = pd.read_csv(local_file)

    df['Data Hora'] = pd.to_datetime(df['Data Hora'], errors='coerce')

    df = df.dropna(subset=['Data Hora'])

    # --- Filtro por data ---
    filtro = (df['Data Hora'] >= dt_inicial) & (df['Data Hora'] <= dt_final)
    df_filtrado = df.loc[filtro, ['Servidor', 'CPU Percentual', 'RAM Percentual', 'Disco Percentual']]

    # --- Agrupa por servidor e calcula médias ---
    medias_por_servidor = df_filtrado.groupby('Servidor')[['CPU Percentual', 'RAM Percentual', 'Disco Percentual']].mean().round(2)

    # --- Resultado ---
    resultado = []
    
    for servidor in medias_por_servidor.index:
        servidor_data = {
            'servidor': int(servidor),
            'CPU': medias_por_servidor.loc[servidor, 'CPU Percentual'],
            'RAM': medias_por_servidor.loc[servidor, 'RAM Percentual'],
            'Disco': medias_por_servidor.loc[servidor, 'Disco Percentual']
            # 'data_inicial': dt_inicial.strftime('%Y-%m-%d %H:%M:%S'),
            # 'data_final': dt_final.strftime('%Y-%m-%d %H:%M:%S')
        }
        resultado.append(servidor_data)

    return {
        'statusCode': 200,
        'body': json.dumps(resultado)
    }