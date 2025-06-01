import boto3
import json

s3 = boto3.client('s3')

# essa lambda pega o ultimo arquivo do bucket client para popular a dash 
# a dash chama ela pela url 

BUCKET_NAME = 'bucket-client-test-125'
PREFIX = 'dataCenter1/'  

def lambda_handler(event, context):
    response = s3.list_objects_v2(Bucket=BUCKET_NAME, Prefix=PREFIX)
    
    if 'Contents' not in response:
        return {
            'statusCode': 404,
            'body': json.dumps('Nenhum arquivo encontrado.')
        }

    latest_file = max(response['Contents'], key=lambda x: x['LastModified'])

    file_obj = s3.get_object(Bucket=BUCKET_NAME, Key=latest_file['Key'])
    file_content = file_obj['Body'].read().decode('utf-8')

    return {
        'statusCode': 200,
        'body': file_content,
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",  
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "*"
        }
    }