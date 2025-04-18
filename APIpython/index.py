import extract
import insert
import selectbd 
import time

idCompany = 1
idDataCenter = 1

print("Bem vindo ao sistema Crawler da TradeFlux\n")

print("Deseja cadastrar essa maquina? (se for a primeira vez que está rodando o sistema, por favor, cadastre a máquina)")
print("1 - Sim, quero cadastrar esssa maquina")
print("2 - Não, quero proseguir com a coleta de dados")
opcao = int(input("Digite a opção desejada: ")) 

if opcao == 1:
    print("Cadastrando máquina...")
    info = extract.coletar_informacoes()
    uuidServidor = info['UUID da Placa Mãe']
    print("UUID da Placa Mãe: ", uuidServidor)
    idServidor = selectbd.coletarMaquinasDisponiveis(uuidServidor)

    SO = info["Sistema Operacional"]
    ramTotal = info["RAM Máxima"]
    discoTotal = info["Armazenamento Máximo"]
    cpuInfo = info["Modelo do Processador"]

    try:        
        insert.inserirMaquina(SO, discoTotal, ramTotal, cpuInfo, idDataCenter, uuidServidor)
        print("Máquina inserida no banco de dados.")
    except Exception as e:
        print("Erro ao cadastrar máquina:", e)

    print("Fazendo coleta de dados...")

    time.sleep(3)
    extract.coletaLocal(idServidor)

        


elif opcao == 2:   
    print("Coletando informações da máquina...")
    info = extract.coletar_informacoes()
    uuidServidor = info['UUID da Placa Mãe']
    print("UUID da Placa Mãe: ", uuidServidor)
    idServidor = selectbd.coletarMaquinasDisponiveis(uuidServidor)

    if idServidor is None:
        print("Máquina não encontrada no banco de dados.")
        exit()

    time.sleep(3)
    extract.coletaLocal(idServidor)
  