import requests
import json

API_URL = 'http://34.239.37.209:3000'

def obter_parametros_servidor(uuid_maquina):
    try:
        headers = {'Content-Type': 'application/json'}
        resposta = requests.get(f"{API_URL}/bd/parametros/{uuid_maquina}", headers=headers)
        
        if resposta.status_code == 200:
            return resposta.json()
        else:
            print(f"Erro ao obter parâmetros: {resposta.status_code} - {resposta.text}")
            return {"erro": "Falha ao obter parâmetros"}
    except Exception as e:
        print(f"Erro na requisição de parâmetros: {e}")
        return {"erro": "Falha na comunicação"}

def buscar_servidor(uuid_maquina):
    try:
        headers = {'Content-Type': 'application/json'}
        resposta = requests.get(f"{API_URL}/bd/servidor/{uuid_maquina}", headers=headers)
        
        if resposta.status_code == 200:
            data = resposta.json()
            if data.get("success") and data.get("idservidor"):
                return data.get("idservidor")
            return None
        else:
            print(f"Erro ao buscar servidor: {resposta.status_code} - {resposta.text}")
            return None
    except Exception as e:
        print(f"Erro na busca do servidor: {e}")
        return None

def cadastrar_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo):
    try:
        payload = {
            "id_datacenter": id_datacenter,
            "uuidservidor": uuidservidor,
            "sistemaoperacional": sistemaoperacional,
            "discototal": discototal,
            "ramtotal": ramtotal,
            "processadorinfo": processadorinfo
        }
        
        headers = {'Content-Type': 'application/json'}
        resposta = requests.post(f"{API_URL}/bd/cadastrar_servidor", json=payload, headers=headers)
        
        if resposta.status_code == 200:
            return resposta.json()
        else:
            print(f"Erro ao cadastrar servidor: {resposta.status_code} - {resposta.text}")
            return {"erro": "Falha ao cadastrar servidor"}
    except Exception as e:
        print(f"Erro ao cadastrar servidor: {e}")
        return {"erro": "Falha na comunicação"}

def enviar_alerta(fkparametro, valor, medida, data, criticidade, nomeservidor, nomecomponente):
    try:
        payload = {
            "valor": valor,
            "medida": medida,
            "data": data,
            "criticidade": criticidade,
            "fkparametro": fkparametro,
            "servidor": nomeservidor,
            "componente": nomecomponente
        }
        
        headers = {'Content-Type': 'application/json'}
        resposta = requests.post(f"{API_URL}/alerta", json=payload, headers=headers)
        
        if resposta.status_code == 200:
            return resposta.json()
        else:
            print(f"Erro ao enviar alerta: {resposta.status_code} - {resposta.text}")
            return {"erro": "Falha ao enviar alerta"}
    except Exception as e:
        print(f"Erro ao enviar alerta: {e}")
        return {"erro": "Falha na comunicação"}

def enviar_dados(dados):
    try:
        headers = {'Content-Type': 'application/json'}
        resposta = requests.post(f"{API_URL}/monitoria", json=dados, headers=headers)
        
        if resposta.status_code == 200:
            return resposta.json()
        else:
            print(f"Erro ao enviar dados: {resposta.status_code} - {resposta.text}")
            return {"erro": "Falha ao enviar dados"}
    except Exception as e:
        print(f"Erro ao enviar dados: {e}")
        return {"erro": "Falha na comunicação"}

def verificar_e_enviar_alertas(dados_capturados, parametros_servidor):
    try:
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
    except Exception as e:
        print(f"Erro ao verificar e enviar alertas: {e}")