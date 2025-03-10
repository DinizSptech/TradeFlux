import selectbd


def mediaValoresMaquina(idMaquina, recurso, idCompany):
    vetor = selectbd.coletarRecursoPorMaquina(idMaquina, recurso, idCompany)
    soma = sum(valor[0] for valor in vetor)
    if len(vetor) == 0:
        return "Não há dados registradas"
    else:
        return soma/len(vetor)

def mediaValoresGeral(recurso, idCompany):
    vetor = selectbd.coletarRecursosGeral(recurso, idCompany)
    soma = sum(valor[0] for valor in vetor)
    if len(vetor) == 0:
        return "Não há máquinas registradas"
    else:
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

def solicitarMaquina(idCompany):
    maquinas = selectbd.coletarMaquinasDisponiveis(idCompany)
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

def exibir(idCompany):
    while True:
        opcTipo = solicitarTipoMaquina()
        if opcTipo == 1:
            componente = solicitarComponente()
            idMaquina = solicitarMaquina(idCompany)
            if componente == 1:
                valor = mediaValoresMaquina(idMaquina, 'diskUsage', idCompany)
                if(perguntarConversao()):
                    print(converterGbToByte(valor), " Bytes\n")
                else:
                    print(valor, " GB\n")
            if componente == 2:
                print("Ram: ",mediaValoresMaquina(idMaquina, 'ramUsage', idCompany),"%\n")
            if componente == 3:
                print("CPU: ",mediaValoresMaquina(idMaquina, 'cpuUsage', idCompany),"%\n")
        if opcTipo == 2:
            componente = solicitarComponente()
            if componente == 1:
                valor = mediaValoresMaquina(idMaquina, 'diskUsage', idCompany)
                if(perguntarConversao()):
                    print("Disco: ",converterGbToByte(valor), " Bytes\n")
                else:
                    print("Disco: ",valor, " GB")
            if componente == 2:
                print("Ram: ",mediaValoresGeral('ramUsage', idCompany),"%")
            if componente == 3:
                print("CPU: ",mediaValoresGeral('cpuUsage', idCompany),"%")
        if opcTipo == 3:
            print("Encerrando programa")
            exit()
