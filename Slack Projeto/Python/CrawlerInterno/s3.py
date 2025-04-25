import boto3
import os 

def upload(nomeArq):
    nomeBucket = 's3-raw-lab-04242028'

    session = boto3.client('s3')
     # É necessário baixar a CLI da AWS
     #  Configurar o token de sessão a cada ver que rodar
     # Entrar no C:\Users\Usuario\.aws
     # Clicar em AWS Details (no academy antes de entrar)ao iniciar laboratório e colar no credentials
     # Config é baseado na região
    try:
        session.upload_file(nomeArq, nomeBucket, nomeArq)
        print(f"Arquivo '{nomeArq}' enviado para o bucket '{nomeBucket}' com sucesso!")
        os.remove(nomeArq)
        return True  
    except Exception as erro:
        print(f"Erro ao fazer upload para o S3: {erro}")
        return False 