import boto3
import os 

def upload(pathArq, nomeArq, nomeBucket):
    s3 = boto3.client('s3')

    try:
        s3.upload_file(pathArq, nomeBucket, nomeArq)
        print(f"Arquivo '{nomeArq}' enviado para o bucket '{nomeBucket}' com sucesso!")
        os.remove(nomeArq)
    except Exception as erro:
        print(f"Erro ao fazer upload para o S3: {erro}")
