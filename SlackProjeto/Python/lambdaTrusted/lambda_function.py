import boto3
import pandas as pd
import io
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import json

def lambda_handler(event, context):
    try:

  
        s3 = boto3.client('s3')

        bucket_name = 'bucket-trusted-teste125'
        prefix = 'servidoresAmanda' 

        response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)


        dfs = []


        # Percorre todos os arquivos encontrados
        if 'Contents' in response:
            for obj in response['Contents']:
                key = obj['Key']
                if key.endswith('.csv'):
                    # Lê o conteúdo do arquivo CSV direto da memória
                    csv_obj = s3.get_object(Bucket=bucket_name, Key=key)
                    body = csv_obj['Body'].read()
                    df = pd.read_csv(io.BytesIO(body))  # transforma em DataFrame
                    dfs.append(df)


        df_final = pd.concat(dfs, ignore_index=True)



        df_final["Data Hora"] = pd.to_datetime(df_final["Data Hora"], format="%Y-%m-%d %H:%M:%S", errors='coerce')
        df_final = df_final[df_final["Data Hora"].notna()]

        hoje = datetime.today()
        seis_meses_atras = hoje - relativedelta(months=3)
        trinta_dias_atras = hoje - timedelta(days = 30)
        sete_dias_atras = hoje - timedelta(days = 7)




        df_6_meses = df_final[(df_final["Data Hora"] >= seis_meses_atras) & (df_final['Data Hora'] <= hoje)]
        df_30_dias = df_final[(df_final['Data Hora'] >= trinta_dias_atras) & (df_final['Data Hora'] <= hoje)]
        df_7_dias = df_final[(df_final["Data Hora"] >= sete_dias_atras) & (df_final['Data Hora'] <= hoje)]

        servidores = len(dfs)

        # priemria kpi 
        ociosidade_6meses = df_6_meses[(df_6_meses['CPU Percentual'] <= 5) & (df_6_meses['RAM Percentual'] <= 25 ) & (df_6_meses['Disco Percentual'] <= 25)]
        ociosidade_30dias = df_30_dias[(df_30_dias['CPU Percentual'] <= 5) & (df_30_dias['RAM Percentual'] <= 25 ) & (df_30_dias['Disco Percentual'] <= 25)]
        ociosidade_7dias = df_7_dias[(df_7_dias['CPU Percentual'] <= 5) & (df_7_dias['RAM Percentual'] <= 25 ) & (df_7_dias['Disco Percentual'] <= 25)]

        # Listas para armazenar os resultados por servidor
        TabelaOciosidade_6meses = {}
        TabelaOciosidade_30dias = {}
        TabelaOciosidade_7dias = {}

        # Lista com os dataframes e nomes
        periodos = [
            ("6meses", df_6_meses),
            ("30dias", df_30_dias),
            ("7dias", df_7_dias)
        ]

        data_inicial = datetime(2025, 3, 5, 0, 1, 0)


        quantidade = 7

        # Lista para armazenar os DataFrames
        vetor_ociosidade6meses = []

        # Loop para gerar de 5 em 5 dias
        for i in range(quantidade):
            data_alvo = data_inicial + timedelta(days=15 * i)
            
            filtro = len(df_6_meses[
                (df_6_meses['CPU Percentual'] <= 5) &
                (df_6_meses['RAM Percentual'] <= 25) &
                (df_6_meses['Disco Percentual'] <= 25) &
                (df_6_meses['Data Hora'] == data_alvo)
            ])
            
            vetor_ociosidade6meses.append(filtro)

        quantidade2 = 7
        data_inicial2 = datetime(2025, 5, 3, 0, 1, 0)
        # Lista para armazenar os DataFrames
        vetor_ociosidade30dias = []

        # Loop para gerar de 15 em 15 dias
        for i in range(quantidade2):
            data_alvo = data_inicial2 + timedelta(days=5 * i)
            
            filtro = len(df_30_dias[
                (df_30_dias['CPU Percentual'] <= 5) &
                (df_30_dias['RAM Percentual'] <= 25) &
                (df_30_dias['Disco Percentual'] <= 25) &
                (df_30_dias['Data Hora'] == data_alvo)
            ])
            
            vetor_ociosidade30dias.append(filtro)

        vetor_ociosidade7dias = []
        data_inicial3 = datetime(2025, 5, 28, 0, 1, 0)

        for i in range(quantidade):
            data_alvo = data_inicial3 + timedelta(days=1 * i)
            
            filtro = len(df_7_dias[
                (df_7_dias['CPU Percentual'] <= 5) &
                (df_7_dias['RAM Percentual'] <= 25) &
                (df_7_dias['Disco Percentual'] <= 25) &
                (df_7_dias['Data Hora'] == data_alvo)
            ])
            
            vetor_ociosidade7dias.append(filtro)


        for servidor_id in range(1, 11):
            for nome_periodo, df in periodos:
                filtro = (
                    (df['CPU Percentual'] <= 5) &
                    (df['RAM Percentual'] <= 25) &
                    (df['Disco Percentual'] <= 25) &
                    (df['Servidor'] == servidor_id)
                )
                
                valor = len(df[filtro]) / 60  # divide por 60 como no seu código

                # Armazena no dicionário
                if nome_periodo == "6meses":
                    TabelaOciosidade_6meses[servidor_id] = valor
                elif nome_periodo == "30dias":
                    TabelaOciosidade_30dias[servidor_id] = valor
                elif nome_periodo == "7dias":
                    TabelaOciosidade_7dias[servidor_id] = valor

        cpuOcioso6meses = (df_6_meses['CPU Percentual'] <= 5).sum()
        ramOcioso6meses = (df_6_meses['RAM Percentual'] <= 25).sum()
        discoOcioso6meses = (df_6_meses['Disco Percentual'] <= 25).sum()

        cpuOcioso30dias = (df_30_dias['CPU Percentual'] <= 5).sum()
        ramOcioso30dias = (df_30_dias['RAM Percentual'] <= 25).sum()
        discoOcioso30dias = (df_30_dias['Disco Percentual'] <= 25).sum()

        cpuOcioso7dias = (df_7_dias['CPU Percentual'] <= 5).sum()
        ramOcioso7dias = (df_7_dias['RAM Percentual'] <= 25).sum()
        discoOcioso7dias = (df_7_dias['Disco Percentual'] <= 25).sum()

        ociosidade6meses = []

        ociosidade6meses = [
            int(cpuOcioso6meses),
            int(ramOcioso6meses),
            int(discoOcioso6meses)
        ]

        ociosidade30dias = []

        ociosidade30dias = [
            int(cpuOcioso30dias),
            int(ramOcioso30dias),
            int(discoOcioso30dias)
        ]

        ociosidade7dias = []

        ociosidade7dias = [
            int(cpuOcioso7dias),
            int(ramOcioso7dias),
            int(discoOcioso7dias)
        ]



        # 6 meses
        if cpuOcioso6meses > ramOcioso6meses and cpuOcioso6meses > discoOcioso6meses:
            componenteMaisOcioso6meses = 'CPU'
        elif ramOcioso6meses > discoOcioso6meses:
            componenteMaisOcioso6meses = 'RAM'
        else:
            componenteMaisOcioso6meses = 'Disco'

        # 30 dias
        if cpuOcioso30dias > ramOcioso30dias and cpuOcioso30dias > discoOcioso30dias:
            componenteMaisOcioso30dias = 'CPU'
        elif ramOcioso30dias > discoOcioso30dias:
            componenteMaisOcioso30dias = 'RAM'
        else:
            componenteMaisOcioso30dias = 'Disco'

        # 7 dias
        if cpuOcioso7dias > ramOcioso7dias and cpuOcioso7dias > discoOcioso7dias:
            componenteMaisOcioso7dias = 'CPU'
        elif ramOcioso7dias > discoOcioso7dias:
            componenteMaisOcioso7dias = 'RAM'
        else:
            componenteMaisOcioso7dias = 'Disco'


        media_ociosidade_6meses = round(len(ociosidade_6meses) / 60,1) / servidores
        media_ociosidade_30dias = round(len(ociosidade_30dias) / 60,1) / servidores
        media_ociosidade_7dias = round(len(ociosidade_7dias) / 60, 1) / servidores

        mediaOciosidade = {
            "MediaOciosidade6Meses": media_ociosidade_6meses,
            "MediaOciosidade30dias": media_ociosidade_30dias,
            "MediaOciosidade7dias": media_ociosidade_7dias
        }

        componenteMaisOciosioso = {
            "componente6meses": componenteMaisOcioso6meses,
            "componente30dias": componenteMaisOcioso30dias,
            "componente7dias": componenteMaisOcioso7dias,
            "ociosidade6meses": ociosidade6meses,
            "ociosidade30dias": ociosidade30dias,
            "ociosidade7dias": ociosidade7dias
        }

        # Tabela de ociosidade para os últimos 6 meses
        tabela6meses = {
            "servidor1": TabelaOciosidade_6meses[1],
            "servidor2": TabelaOciosidade_6meses[2],
            "servidor3": TabelaOciosidade_6meses[3],
            "servidor4": TabelaOciosidade_6meses[4],
            "servidor5": TabelaOciosidade_6meses[5],
            "servidor6": TabelaOciosidade_6meses[6],
            "servidor7": TabelaOciosidade_6meses[7],
            "servidor8": TabelaOciosidade_6meses[8],
            "servidor9": TabelaOciosidade_6meses[9],
            "servidor10": TabelaOciosidade_6meses[10]
        }

        # Tabela de ociosidade para os últimos 30 dias
        tabela30dias = {
            "servidor1": TabelaOciosidade_30dias[1],
            "servidor2": TabelaOciosidade_30dias[2],
            "servidor3": TabelaOciosidade_30dias[3],
            "servidor4": TabelaOciosidade_30dias[4],
            "servidor5": TabelaOciosidade_30dias[5],
            "servidor6": TabelaOciosidade_30dias[6],
            "servidor7": TabelaOciosidade_30dias[7],
            "servidor8": TabelaOciosidade_30dias[8],
            "servidor9": TabelaOciosidade_30dias[9],
            "servidor10": TabelaOciosidade_30dias[10]
        }

        # Tabela de ociosidade para os últimos 7 dias
        tabela7dias = {
            "servidor1": TabelaOciosidade_7dias[1],
            "servidor2": TabelaOciosidade_7dias[2],
            "servidor3": TabelaOciosidade_7dias[3],
            "servidor4": TabelaOciosidade_7dias[4],
            "servidor5": TabelaOciosidade_7dias[5],
            "servidor6": TabelaOciosidade_7dias[6],
            "servidor7": TabelaOciosidade_7dias[7],
            "servidor8": TabelaOciosidade_7dias[8],
            "servidor9": TabelaOciosidade_7dias[9],
            "servidor10": TabelaOciosidade_7dias[10]
        }

        ociodade3mesesTemporal = {
            "05/03/2025": vetor_ociosidade6meses[0],
            "20/03/2025": vetor_ociosidade6meses[1],
            "04/04/2025": vetor_ociosidade6meses[2],
            "19/04/2025": vetor_ociosidade6meses[3],
            "04/05/2025": vetor_ociosidade6meses[4],
            "19/05/2025": vetor_ociosidade6meses[5],
            "03/06/2025": vetor_ociosidade6meses[6]
        }

        ociodade30diasTemporal = {
            "03/05/2025": vetor_ociosidade30dias[0],
            "08/05/2025": vetor_ociosidade30dias[1],
            "13/05/2025": vetor_ociosidade30dias[2],
            "18/05/2025": vetor_ociosidade30dias[3],
            "23/05/2025": vetor_ociosidade30dias[4],
            "28/05/2025": vetor_ociosidade30dias[5],
            "03/06/2025": vetor_ociosidade30dias[6]
        }

        ociodade7diasTemporal = {
            "28/05/2025": vetor_ociosidade7dias[0],
            "29/05/2025": vetor_ociosidade7dias[1],
            "30/05/2025": vetor_ociosidade7dias[2],
            "31/05/2025": vetor_ociosidade7dias[3],
            "01/06/2025": vetor_ociosidade7dias[4],
            "02/06/2025": vetor_ociosidade7dias[5],
            "03/06/2025": vetor_ociosidade7dias[6]
        }



        dados = [mediaOciosidade, componenteMaisOciosioso, tabela6meses, tabela30dias, tabela7dias, ociodade3mesesTemporal, ociodade30diasTemporal, ociodade7diasTemporal]


        json_final = json.dumps(dados, indent=4)
        

        # envia o json para o client
        #por enquanto json se der tempo csv
        data_hoje = datetime.today().strftime('%Y-%m-%d')

        nome_arquivo = f'dados_eficiencia_{data_hoje}.json'

        s3.put_object(
        Bucket='bucket-client-test-125',
        Key=f'dataCenter1/{nome_arquivo}',
        Body=json_final,
        ContentType='application/json'
        )


        return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",  
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "*"
        },
            "body": json_final
        }
    except Exception as e:
        return {
                "statusCode": 500,
                "body": json.dumps({"erro": str(e)})
            }




