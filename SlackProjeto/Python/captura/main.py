import datetime
import crawler
import comunicacao
import time

id_datacenter = 1

def main():
    print("Bem vindo ao sistema Crawler da TradeFlux\n")
    print("Essa é uma API Python que cadastra servidores e monitoriza os componentes de cada servidor.\n")

    print("Escolha uma opção:\n1 - Iniciar coleta de dados\n2 - Sair")
    opcao = int(input("Digite a opção desejada: ")) 
    
    if opcao == 1:
        info = crawler.coletar_informacoes()
        print(info)
        
        uuidServidor = info['UUID da Placa Mãe']
        print("Procurando no Banco de dados uma máquina com a UUID: ", uuidServidor)
        
        idServidor = comunicacao.buscar_servidor(uuidServidor)
        
        if idServidor == None:
            print("Máquina não encontrada no banco de dados.")
            print("Cadastrando máquina...")
            SO_maq = info["Sistema Operacional"]
            cpuInfo = info["Modelo do Processador"]
            ramTotal = info["RAM Máxima"]
            discoTotal = info["Armazenamento Máximo"]
            
            comunicacao.cadastrar_servidor(id_datacenter, uuidServidor, SO_maq, discoTotal, ramTotal, cpuInfo)
            print("Dados inseridos:")
            print("Sistema operacional: ", SO_maq)
            print("RAM total: ", ramTotal)
            print("Armazenamento total: ", discoTotal)
            print("Modelo do processador: ", cpuInfo)
        
        contador = 1
        dados_parametros = comunicacao.obter_parametros_servidor(uuidServidor)
        
        if "erro" not in dados_parametros:
            id_servidor_final = dados_parametros.get("idservidor", idServidor)
            print(f"Iniciando monitoramento do servidor ID: {id_servidor_final}")
            
            while True:
                try:
                    if contador == 0 or contador == 300:
                        dados_parametros = comunicacao.obter_parametros_servidor(uuidServidor)
                        if contador == 300:
                            contador = 0
                    
                    dados_capturados = crawler.coletar_dados(id_datacenter, id_servidor_final)
                    comunicacao.enviar_dados(dados_capturados)
                    comunicacao.verificar_e_enviar_alertas(dados_capturados, dados_parametros)
                    
                    contador += 1
                    time.sleep(1)
                    
                except KeyboardInterrupt:
                    print("\nMonitoramento interrompido pelo usuário.")
                    break
                except Exception as e:
                    print(f"Erro na coleta: {e}")
                    time.sleep(2)
        else:
            print("Erro ao obter parâmetros do servidor.")
            
    elif opcao == 2:
        print("Saindo...")
        exit()

if __name__ == "__main__":
    main()