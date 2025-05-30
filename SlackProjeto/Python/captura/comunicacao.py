import requests

API_URL = 'http://0.0.0.0:3000'

def obter_parametros_servidor(uuid_maquina):
    resposta = requests.get(f"{API_URL}/bd/parametros/{uuid_maquina}")
    return resposta.json() if resposta.status_code == 200 else {"erro": "Falha ao obter parâmetros"}

def buscar_servidor(uuid_maquina):
    try:
        resposta = requests.get(f"{API_URL}/bd/servidor/{uuid_maquina}")
        if resposta.status_code == 200:
            return resposta.json().get("idservidor")
        return None
    except:
        return None

def cadastrar_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo):
    payload = {
        "id_datacenter": id_datacenter,
        "uuidservidor": uuidservidor,
        "sistemaoperacional": sistemaoperacional,
        "discototal": discototal,
        "ramtotal": ramtotal,
        "processadorinfo": processadorinfo
    }
    
    resposta = requests.post(f"{API_URL}/bd/cadastrar_servidor", json=payload)
    return resposta.json()

def enviar_alerta(fkparametro, valor, medida, data, criticidade, nomeservidor, nomecomponente):
    payload = {
        "valor": valor,
        "medida": medida,
        "data": data,
        "criticidade": criticidade,
        "fkparametro": fkparametro,
        "servidor": nomeservidor,
        "componente": nomecomponente
    }
    resposta = requests.post(f"{API_URL}/alerta", json=payload)
    return resposta.json()

def enviar_dados(dados):
    resposta = requests.post(f"{API_URL}/monitoria", json=dados)
    return resposta.json()

def verificar_e_enviar_alertas(dados_capturados, parametros_servidor):
    dados_momento = dados_capturados['dados'][0]
    data_atual = dados_momento['Momento']
    nome_servidor = dados_capturados['servidor'] 
    
    mapeamento_componentes = {
        'cpu': {'id': 1, 'nome': 'cpu_percentual'},
        'ram': {'id': 3, 'nome': 'ram_percentual'}, 
        'disco': {'id': 5, 'nome': 'disco_percentual'},
    }
    
    for componente, valor in [('cpu', dados_momento['cpu']), 
                             ('ram', dados_momento['ram']), 
                             ('disco', dados_momento['disco'])]:
        
        id_componente = mapeamento_componentes[componente]['id']
        nome_componente = mapeamento_componentes[componente]['nome']
        
        param_encontrado = None
        for param in parametros_servidor.get('parametros', []):
            if param.get('fk_componente') == id_componente:
                param_encontrado = param
                break
        
        if param_encontrado:
            limiar_atencao = param_encontrado.get('limiar_alerta_atencao', 70)
            limiar_critico = param_encontrado.get('limiar_alerta_critico', 80)
            fk_parametro = param_encontrado.get('idparametros_servidor')
            
            criticidade = None
            if valor >= limiar_critico:
                criticidade = 3
            elif valor >= limiar_atencao:
                criticidade = 1
            
            if criticidade:
                enviar_alerta(fk_parametro, valor, '%', data_atual, criticidade, nome_servidor, nome_componente)