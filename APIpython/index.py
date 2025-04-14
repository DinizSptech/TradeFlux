import extract
import insert
import selectbd 

idCompany = 1
idDataCenter = 1

print("Bem vindo ao sistema Crawler da TradeFlux")

info = extract.coletar_informacoes()
uuidServidor = info['UUID da Placa Mãe']
idServidor = selectbd.coletarMaquinasDisponiveis(info["UUID da Placa Mãe"])
if idServidor == 0:
    SO = info["Sistema Operacional"]
    ramTotal = info["RAM Máxima"]
    discoTotal = info["Armazenamento Máximo"]
    cpuInfo = info["Modelo do Processador"]
    print("Máquina ainda não cadastrada no sistema.")
    try:
        insert.inserirMaquina(uuidServidor, SO , ramTotal, discoTotal, cpuInfo)
        print("Máquina inserida no banco de dados.")
    except:
        print("Erro em cadastrar máquina no sistema.")

extract.coletaLocal(idServidor)
  