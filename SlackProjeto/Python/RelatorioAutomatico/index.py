import boto3
import pandas as pd

import io
# O io é pra manipular os arquivos sem ter que ficar baixando ele na máquina, aquilo de buffer que o Hugo mostrou, eu acho que utilizava isso
import json

s3 = boto3.client('s3')
funcaoLambda = boto3.client('lambda', region_name='us-east-1')

parametros = {
    'Datacenter': '1'
}

resultado = funcaoLambda.invoke(
    FunctionName='nome-da-sua-lambda',
    InvocationType='RequestResponse',
    Payload=json.dumps(parametros)

    # json.dumps() é uma função da biblioteca padrão json do Python, usada para converter um objeto Python (como dict, list, int, str, etc.) em uma string JSON e para fazer o contrário, utilizamos json.loads().
    # Basicamente, é boa prática o Json dumps pq "conversas" entre APIs e afins, são esperadas em JSON para não houver problemas de uma API ser montado esperando arquivo tipo X ou Y e a internet virar uma bagunça

)

payload = json.load(resultado['Payload'])
# "payload" é sempre a carga de dados que é transportada, no nosso caso, a resposta da Lambda contendo o CSV

# Só um adendo importante, nesse caso, ele vem como uma String 
# Tipo isso aqui ó:
# "csv": "idServidor,cpuPorcentagem\n1,30\n2,90"

conteudoCSV = payload['csv']
# Armazenando o conteúdo da String CSV numa variável
# Só para explicar, a gente poderia fazer esse payload direto no comando de baixo, mas fiz assim para faciliat a leitura do código pra mim 

buffer = io.StringIO(conteudoCSV)
# Eu ainda não entendi 100% o que é um buffer, mas é aquilo que a Marise deu de dica para a gente não precisar baixar nada como eu expliquei lá dps do Import

csv = pd.read_csv(buffer, sep=';', quotechar='"')