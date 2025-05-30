import json
import requests
import tempfile
import os
import boto3

def lambda_handler(event, context):

    url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.26926/dados?formato=json"   

    try:
        
        resultado = requests.get(url)
        resultado.raise_for_status()
        
        dados = resultado.json()
        transacoes = dados
        
        nome_arquivo = os.path.join(tempfile.gettempdir(), 'dados.json')

        with open(nome_arquivo, mode='wt') as f:

            json.dump(transacoes, f)

        s3 = boto3.client('s3')

        s3.upload_file(

            Filename=nome_arquivo,

            Bucket='bucket-raw-tradeflux',

            Key='pix/dados.json'

        )

        return transacoes

    except requests.exceptions.RequestException as e:

        print(f"Erro na requisição: {e}")

        return None

    except json.JSONDecodeError as e:

        print(f"Erro ao decodificar JSON: {e}")

        print(f"Resposta completa da API: {resultado.text}")

        return None