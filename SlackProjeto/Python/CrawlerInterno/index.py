import extract
import insert
import selectbd
import time

idCompany = 1
idDataCenter = 1

print("Bem vindo ao sistema Crawler da TradeFlux\n")
print("Essa é uma API Python que cadastra servidores e monitoriza os componentes de cada servidor.\n")

print("Escolha uma opção:")
print("1 - Cadastrar essa máquina no banco de dados")
print("2 - Coletar dados dessa máquina")
print("3 - Sair")
opcao = int(input("Digite a opção desejada: ")) 

if opcao == 1:
    info = extract.coletar_informacoes()
    uuidServidor = info['UUID da Placa Mãe']
    print("Procurando no Bando de dados uma maquina com a UUID: ", uuidServidor)
    idServidor = selectbd.coletarMaquinasDisponiveis(uuidServidor)
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
     print("Para capturar os dados, por favor, reinicie a API e escolha a opção 2.")
     exit()
    else:
       print("Máquina já registrada no banco")
       print("ID da máquina: ", idServidor)
       print("Para capturar os dados, por favor, reinicie a API e escolha a opção 2.")
       print("OBSERVAÇÃO: PARA CAPTURAR OS DADOS DESTE SERVIDOR, É NECESSÁRIO QUE O LIMIAR DOS ALERTAS TAMBÉM ESTEJA CADASTRADO.")  
       exit()
      

elif opcao == 2:   
    print("Coletando informações da máquina...")
    info = extract.coletar_informacoes()
    uuidServidor = info['UUID da Placa Mãe']
    print("Coletando dados da maquina que possui o UUID: ", uuidServidor)
    idServidor = selectbd.coletarMaquinasDisponiveis(uuidServidor)

    if idServidor is None:
        print("Máquina não encontrada no banco de dados.")
        print("Por favor, cadastre a máquina antes de coletar os dados.")
        print("Para cadastrar a máquina, reinicie a API e escolha a opção 1.")
        exit()

    time.sleep(3)
    print("O id do servidor é: ", idServidor)
    print("Coletando dados do servidor...")
    time.sleep(3)
    extract.coletaLocal(idServidor)
elif opcao == 3:
    print("Saindo...")
    exit()
  