import database
import select
mydb = database.gerarMyDb()
cursor = mydb.cursor()


def mediaValoresMaquina(idMaquina, recurso):
    vetor = select.coletarRecursoPorMaquina(idMaquina, recurso)
    soma = sum(valor[0] for valor in vetor)
    return soma/len(vetor)


def mediaValoresMaquina(idMaquina, recurso):
    vetor = select.coletarRecursoPorMaquina(idMaquina, recurso)
    soma = 0
    for i in range(len(vetor)):
        soma += vetor[i][0]
    return soma/len(vetor)

def mediaValoresGeral(recurso):
    vetor = select.coletarRecursosGeral(recurso)
    soma = sum(valor[0] for valor in vetor)
    return soma/len(vetor)

def converterGbToByte(valor):
    return valor * 1024**3

def solicitarTipoMaquina():
    opc = 0
    while (opc not in range (1,4)):
        opc = int(input("\nDeseja monitar uma máquina unitária (1), média geral (2) ou sair (3)?\n-->"))
    return opc

def solicitarComponente():
    opc = 0
    while (opc not in range (1,4)):
        opc = int(input("\nDeseja monitar Disco(1), Ram(2) ou CPU(3)?\n-->"))
    return opc

def solicitarMaquina():
    maquinas = select.coletarMaquinasDisponiveis()
    vetor = list(valor[0] for valor in maquinas)
    opc = 0
    print(f"\nMáquinas disponíveis para monitoramento:\n")
    for  i in range(len(vetor)):
        print(vetor[i])
    while opc not in vetor:
        opc = int(input("\nQual máquina deseja monitorar\n-->"))
    return opc

def perguntarConversao():
    opc = 0
    while (opc not in range (1,3)):
        opc = int(input("\nDeseja converter de GB para Byte? Sim(1), Não(2)?\n-->"))
    if opc == 1:
        return True
    else:
        return False

def exibir():
    while True:
        opcTipo = solicitarTipoMaquina()
        if opcTipo == 1:
            componente = solicitarComponente()
            idMaquina = solicitarMaquina()
            if componente == 1:
                valor = mediaValoresMaquina(idMaquina, 'diskUsage')
                if(perguntarConversao()):
                    print(converterGbToByte(valor), " Bytes\n")
                else:
                    print(valor, " GB\n")
            if componente == 2:
                print("Ram: ",mediaValoresMaquina(idMaquina, 'ramUsage'),"%\n")
            if componente == 3:
                print("CPU: ",mediaValoresMaquina(idMaquina, 'cpuUsage'),"%\n")
        if opcTipo == 2:
            componente = solicitarComponente()
            if componente == 1:
                valor = mediaValoresMaquina(idMaquina, 'diskUsage')
                if(perguntarConversao()):
                    print("Disco: ",converterGbToByte(valor), " Bytes\n")
                else:
                    print("Disco: ",valor, " GB")
            if componente == 2:
                print("Ram: ",mediaValoresGeral('ramUsage'),"%")
            if componente == 3:
                print("CPU: ",mediaValoresGeral('cpuUsage'),"%")
        if opcTipo == 3:
            print("Encerrando programa")
            exit()
