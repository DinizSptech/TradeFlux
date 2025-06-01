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
        
        if idServidor is None:
            print("Máquina não encontrada no banco de dados.")
            print("Cadastrando máquina...")
            SO_maq = info["Sistema Operacional"]
            cpuInfo = info["Modelo do Processador"]
            ramTotal = info["RAM Máxima"]
            discoTotal = info["Armazenamento Máximo"]
            
            resultado_cadastro = comunicacao.cadastrar_servidor(id_datacenter, uuidServidor, SO_maq, discoTotal, ramTotal, cpuInfo)
            
            if "erro" not in resultado_cadastro:
                print("Servidor cadastrado com sucesso!")
                print("Dados inseridos:")
                print("Sistema operacional: ", SO_maq)
                print("RAM total: ", ramTotal)
                print("Armazenamento total: ", discoTotal)
                print("Modelo do processador: ", cpuInfo)
                
                # Aguardar um momento e buscar novamente o ID do servidor após cadastro
                time.sleep(2)
                idServidor = comunicacao.buscar_servidor(uuidServidor)
                if idServidor is None:
                    print("Erro: Não foi possível obter o ID do servidor após cadastro.")
                    return
                else:
                    print(f"Servidor cadastrado obteve o ID: {idServidor}")
            else:
                print(f"Erro ao cadastrar servidor: {resultado_cadastro}")
                return
        else:
            print(f"Servidor já existe no banco de dados com ID: {idServidor}")
            print("Pulando etapa de cadastro...")
        
        contador = 1
        # Usar o UUID para obter os parâmetros inicialmente
        dados_parametros = comunicacao.obter_parametros_servidor(uuidServidor)
        
        if "erro" not in dados_parametros:
            # Usar o ID do servidor obtido da busca/cadastro
            id_servidor_final = idServidor
            print(f"Iniciando monitoramento do servidor ID: {id_servidor_final}")
            
            while True:
                try:
                    # Recarregar parâmetros periodicamente
                    if contador == 1 or contador % 300 == 0:
                        print("Atualizando parâmetros do servidor...")
                        dados_parametros = comunicacao.obter_parametros_servidor(uuidServidor)
                        if "erro" in dados_parametros:
                            print("Erro ao obter parâmetros atualizados. Continuando com parâmetros anteriores.")
                    
                    dados_capturados = crawler.coletar_dados(id_datacenter, id_servidor_final)
                    
                    # Verificar se os dados foram coletados com sucesso
                    if dados_capturados and 'dados' in dados_capturados:
                        resultado_envio = comunicacao.enviar_dados(dados_capturados)
                        if "erro" in resultado_envio:
                            print(f"Erro ao enviar dados: {resultado_envio}")
                        
                        # Verificar alertas apenas se temos parâmetros válidos
                        if "erro" not in dados_parametros:
                            comunicacao.verificar_e_enviar_alertas(dados_capturados, dados_parametros)
                        
                        print(f"Ciclo {contador} - Dados coletados e enviados")
                    else:
                        print(f"Erro na coleta de dados no ciclo {contador}")
                    
                    contador += 1
                    time.sleep(1)
                    
                except KeyboardInterrupt:
                    print("\nMonitoramento interrompido pelo usuário.")
                    break
                except Exception as e:
                    print(f"Erro na coleta (ciclo {contador}): {e}")
                    time.sleep(2)
        else:
            print(f"Erro ao obter parâmetros do servidor: {dados_parametros}")
            
    elif opcao == 2:
        print("Saindo...")
        exit()
    else:
        print("Opção inválida!")

if __name__ == "__main__":
    main()