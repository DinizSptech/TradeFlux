import requests
import json

API_URL = 'http://34.239.37.209:3000'

def obter_parametros_servidor(uuid_maquina):
    try:
        headers = {'Content-Type': 'application/json'}
        resposta = requests.get(f"{API_URL}/bd/parametros/{uuid_maquina}", headers=headers, timeout=10)
        
        if resposta.status_code == 200:
            data = resposta.json()
            print(f"Parâmetros obtidos com sucesso para UUID: {uuid_maquina}")
            return data
        else:
            print(f"Erro ao obter parâmetros: {resposta.status_code} - {resposta.text}")
            return {"erro": f"HTTP {resposta.status_code}"}
    except requests.exceptions.Timeout:
        print("Timeout ao obter parâmetros do servidor")
        return {"erro": "Timeout"}
    except requests.exceptions.ConnectionError:
        print("Erro de conexão ao obter parâmetros")
        return {"erro": "Conexão"}
    except Exception as e:
        print(f"Erro na requisição de parâmetros: {e}")
        return {"erro": str(e)}

def buscar_servidor(uuid_maquina):
    try:
        headers = {'Content-Type': 'application/json'}
        resposta = requests.get(f"{API_URL}/bd/servidor/{uuid_maquina}", headers=headers, timeout=10)
        
        if resposta.status_code == 200:
            data = resposta.json()
            print(f"Resposta da busca do servidor: {data}")
            
            # Verificar se o servidor foi encontrado - tratando diferentes formatos de resposta
            id_servidor = None
            
            if isinstance(data, list) and len(data) > 0:
                # Se a resposta é uma lista com servidores
                servidor = data[0]
                # Tentar diferentes nomes de campos possíveis
                id_servidor = (servidor.get('idservidor') or 
                              servidor.get('idservidor_cliente') or 
                              servidor.get('id'))
                              
            elif isinstance(data, dict):
                # Se a resposta é um objeto direto
                if data.get("success"):
                    # Resposta estruturada com success
                    id_servidor = data.get("idservidor")
                    if not id_servidor and data.get("data") and len(data["data"]) > 0:
                        # Buscar no array data
                        primeiro_servidor = data["data"][0]
                        id_servidor = (primeiro_servidor.get('idservidor') or 
                                      primeiro_servidor.get('idservidor_cliente') or 
                                      primeiro_servidor.get('id'))
                else:
                    # Resposta direta do servidor
                    id_servidor = (data.get('idservidor') or 
                                  data.get('idservidor_cliente') or 
                                  data.get('id'))
            
            if id_servidor:
                print(f"Servidor encontrado com ID: {id_servidor}")
                return id_servidor
            else:
                print("Servidor não encontrado no banco de dados")
                print(f"Estrutura da resposta recebida: {data}")
                return None
                
        else:
            print(f"Erro ao buscar servidor: {resposta.status_code} - {resposta.text}")
            return None
            
    except requests.exceptions.Timeout:
        print("Timeout ao buscar servidor")
        return None
    except requests.exceptions.ConnectionError:
        print("Erro de conexão ao buscar servidor")
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
        
        print(f"Enviando dados para cadastro: {payload}")
        
        headers = {'Content-Type': 'application/json'}
        resposta = requests.post(f"{API_URL}/bd/cadastrar_servidor", json=payload, headers=headers, timeout=15)
        
        if resposta.status_code == 200:
            data = resposta.json()
            print(f"Resposta do cadastro: {data}")
            return data
        else:
            print(f"Erro ao cadastrar servidor: {resposta.status_code} - {resposta.text}")
            return {"erro": f"HTTP {resposta.status_code}"}
    except requests.exceptions.Timeout:
        print("Timeout ao cadastrar servidor")
        return {"erro": "Timeout"}
    except requests.exceptions.ConnectionError:
        print("Erro de conexão ao cadastrar servidor")
        return {"erro": "Conexão"}
    except Exception as e:
        print(f"Erro ao cadastrar servidor: {e}")
        return {"erro": str(e)}

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
        resposta = requests.post(f"{API_URL}/alerta", json=payload, headers=headers, timeout=10)
        
        if resposta.status_code == 200:
            print(f"Alerta enviado: {nomecomponente} = {valor}% (criticidade {criticidade})")
            return resposta.json()
        else:
            print(f"Erro ao enviar alerta: {resposta.status_code} - {resposta.text}")
            return {"erro": f"HTTP {resposta.status_code}"}
    except Exception as e:
        print(f"Erro ao enviar alerta: {e}")
        return {"erro": str(e)}

def enviar_dados(dados):
    try:
        headers = {'Content-Type': 'application/json'}
        resposta = requests.post(f"{API_URL}/monitoria", json=dados, headers=headers, timeout=10)
        
        if resposta.status_code == 200:
            return resposta.json()
        else:
            print(f"Erro ao enviar dados: {resposta.status_code} - {resposta.text}")
            return {"erro": f"HTTP {resposta.status_code}"}
    except Exception as e:
        print(f"Erro ao enviar dados: {e}")
        return {"erro": str(e)}

def verificar_e_enviar_alertas(dados_capturados, parametros_servidor):
    try:
        if not dados_capturados or 'dados' not in dados_capturados or len(dados_capturados['dados']) == 0:
            print("Dados capturados inválidos para verificação de alertas")
            return
            
        dados_momento = dados_capturados['dados'][0]
        data_atual = dados_momento['Momento']
        nome_servidor = dados_capturados['servidor'] 
        
        mapeamento_componentes = {
            'cpu': {'id': 1, 'nome': 'cpu_percentual'},
            'ram': {'id': 3, 'nome': 'ram_percentual'}, 
            'disco': {'id': 5, 'nome': 'disco_percentual'},
        }
        
        # Verificar se existem parâmetros
        if 'parametros' not in parametros_servidor:
            print("Nenhum parâmetro encontrado para verificação de alertas")
            return
        
        for componente, valor in [('cpu', dados_momento.get('cpu', 0)), 
                                 ('ram', dados_momento.get('ram', 0)), 
                                 ('disco', dados_momento.get('disco', 0))]:
            
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
            else:
                print(f"Parâmetro não encontrado para componente: {componente}")
                
    except Exception as e:
        print(f"Erro ao verificar e enviar alertas: {e}")