import datetime
import crawler
import comunicacao
import time

def main():
    print("Bem vindo ao sistema Crawler da TradeFlux\n")
    print("Essa é uma API Python que cadastra servidores e monitoriza os componentes de cada servidor.\n")

    print("Escolha uma opção:\n1 - Cadastrar essa máquina no banco de dados\n2 - Coletar dados dessa máquina\n3 - Sair")
    opcao = int(input("Digite a opção desejada: ")) 

    if opcao == 1:
        info = crawler.coletar_informacoes()
        uuidServidor = info['UUID da Placa Mãe']
        print("Procurando no Bando de dados uma maquina com a UUID: ", uuidServidor)
        idServidor = comunicacao.buscar_servidor(uuidServidor)

        # idServidor = selectbd.coletarMaquinasDisponiveis(uuidServidor)
        time.sleep(2)

        if idServidor == None:
            print("Máquina não encontrada no banco de dados.")
            print("Cadastrando máquina...")
            SO = info["Sistema Operacional"]
            ramTotal = info["RAM Máxima"]
            discoTotal = info["Armazenamento Máximo"]
            cpuInfo = info["Modelo do Processador"]
            insert.inserirMaquina(uuidServidor , SO, discoTotal, ramTotal, cpuInfo, idDataCenter)
            print("Dados inseridos:")
            print("Sistema operacional: ", SO)
            print("RAM total: ", ramTotal)
            print("Armazenamento total: ", discoTotal)
            print("Modelo do processador: ", cpuInfo)
        else:
            print("Máquina já registrada no banco")
            print("ID da máquina: ", idServidor)
            print("Deseja realizar a captura de dados com a nossos parametros padrões? \n1 - SIM | 2 - NÃO")
            option = int(input())
            if option == 1:
                coletarDados(idServidor)
            else:
                print("Saindo...")
                exit()

    elif opcao == 2:   
        dadoscapturados = crawler.coletar_dados(1,2)

        print(dadoscapturados)
    elif opcao == 3:
        print("Saindo...")
        exit()
main()