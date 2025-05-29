import requests

API_URL = 'http://0.0.0.0:3000'

def obter_parametros_servidor(uuid_maquina):
    resposta = requests.get(f"{API_URL}/coletar/parametros/{uuid_maquina}")
    return resposta.json() if resposta.status_code == 200 else {"erro": "Falha ao obter parâmetros"}

def cadastrar_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo):
    # param_critico_cpu = 80
    # param_critico_ram = 80
    # param_critico_disco = 80
    # param_atencao_cpu = 70
    # param_atencao_ram = 70
    # param_atencao_disco = 70
    payload = {
        "id_datacenter": id_datacenter,
        "uuidservidor": uuidservidor,
        "sistemaoperacional": sistemaoperacional,
        "discototal": discototal,
        "ramtotal": ramtotal,
        "processadorinfo": processadorinfo,
        # "param_atencao_cpu": param_atencao_cpu,
        # "param_atencao_ram": param_atencao_ram,
        # "param_atencao_disco": param_atencao_disco,
        # "param_critico_cpu": param_critico_cpu,
        # "param_critico_ram": param_critico_ram,
        # "param_critico_disco": param_critico_disco
    }
    
    resposta = requests.post(f"{API_URL}/cadastrar_servidor", json=payload)
    return resposta.json()

def enviar_alerta(fkparametro, valor, medida, data, criticidade):
    payload = {
        "valor": valor,
        "medida": medida,
        "data": data,
        "criticidade": criticidade,
        "fkparametro": fkparametro
    }
    resposta = requests.post(f"{API_URL}/alerta", json=payload)
    return resposta.json()

def enviar_dados(dados):
    payload = {dados}
    resposta = requests.post(f"{API_URL}/tempo_real", json=payload)
    return resposta.json()