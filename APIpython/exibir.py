import database

mydb = database.gerarMyDb()
cursor = mydb.cursor()

def coletarRecursoPorMaquina(idMaquina, recurso):
    query = f"SELECT {recurso} FROM Dados WHERE idMachine={idMaquina} LIMIT 10;"
    cursor.execute(query)
    return cursor.fetchall()

def coletarRecursosGeral(recurso):
    query = f"SELECT {recurso} FROM Dados LIMIT 10;"
    cursor.execute(query)
    return cursor.fetchall()

def coletarMaquinasDisponiveis():
    query = f"SELECT DISTINCT idMachine FROM Dados;"
    cursor.execute(query)
    return cursor.fetchall()

def mediaValoresMaquina(idMaquina, recurso):
    vetor = coletarRecursoPorMaquina(idMaquina, recurso)
    soma = sum(valor[0] for valor in vetor)
    return soma/len(vetor)


def mediaValoresMaquina(idMaquina, recurso):
    vetor = coletarRecursoPorMaquina(idMaquina, recurso)
    soma = 0
    for i in range(len(vetor)):
        soma += vetor[i][0]
    return soma/len(vetor)

def mediaValoresGeral(recurso):
    vetor = coletarRecursosGeral(recurso)
    soma = sum(valor[0] for valor in vetor)
    return soma/len(vetor)

def converterGbToByte(valor):
    return valor * 1024**3

def solicitarTipoMaquina():
    opc = 0
    while (opc not in range (1,3)):
        opc = int(input("Deseja monitar uma máquina unitária (1) ou a média geral (2)?\n-->"))
    return opc

def solicitarComponente():
    opc = 0
    while (opc not in range (1,4)):
        opc = int(input("Deseja monitar Disco(1), Ram(2) ou CPU(3)?\n-->"))
    return opc

def solicitarMaquina():
    maquinas = coletarMaquinasDisponiveis()
    vetor = list(valor[0] for valor in maquinas)
    opc = 0
    print(f"Máquinas disponíveis para monitoramento")
    for  i in range(len(vetor)):
        print(vetor[i])
    while opc not in vetor:
        opc = int(input("Qual máquina deseja monitorar\n-->"))
    return opc

def perguntarConversao():
    opc = 0
    while (opc not in range (1,3)):
        opc = int(input("Deseja converter de GB para Byte? Sim(1), Não(2)?\n-->"))
    if opc == 1:
        return True
    else:
        return False

def exibir():
    while True:
        opc = solicitarTipoMaquina()
        if opc == 1:
            opc = solicitarComponente()
            idMaquina = solicitarMaquina()
            if opc == 1:
                valor = mediaValoresMaquina(idMaquina, 'diskPercent')
                if(perguntarConversao()):
                    print(converterGbToByte(valor))
                else:
                    print(valor)
            if opc == 2:
                print(mediaValoresMaquina(idMaquina, 'ramPercent'))
            if opc == 3:
                print(mediaValoresMaquina(idMaquina, 'cpuPercent'))

        if opc == 2:
            opc = solicitarComponente()
            if opc == 1:
                print(mediaValoresGeral('diskPercent'))
            if opc == 2:
                print(mediaValoresGeral('ramPercent'))
            if opc == 3:
                print(mediaValoresGeral('cpuPercent'))

exibir()
