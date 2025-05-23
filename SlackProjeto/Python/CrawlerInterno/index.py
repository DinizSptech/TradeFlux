import extract
import insert
import selectbd
import time

idCompany = 1
idDataCenter = 1

def coletarDados(idServidor):
   if idServidor is None:
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
   else:
    print("Coletando dados do servidor...")
    time.sleep(3)
    extract.coletaLocal(idServidor)

print("Bem vindo ao sistema Crawler da TradeFlux\n")
print("Essa é uma API Python que cadastra servidores e monitoriza os componentes de cada servidor.\n")

print("Escolha uma opção:\n1 - Cadastrar essa máquina no banco de dados\n2 - Coletar dados dessa máquina\n3 - Sair")
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
    coletarDados()
elif opcao == 3:
    print("Saindo...")
    exit()
  