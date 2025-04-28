import database;
from mysql.connector import Error 

mydbQuente = database.gerarMyDbInsertQuente()
cursorQuente = mydbQuente.cursor()

mydbFrio = database.gerarMyDbInsertFrio()
cursorFrio = mydbFrio.cursor()

def inserirData(valor, medida, dataHora, alerta, idParametro):
 try:
    query = """
    INSERT INTO captura (valor, medida, data, alerta, fkParametro) VALUES (%s, %s, %s, %s, %s)
    """
    valores = (valor, medida, dataHora, alerta, idParametro)
    cursorQuente.execute(query, valores)
    mydbQuente.commit()
 except Error as err:
    print("Erro na hora de inserir dados no banco de dados:")
    print(f"Erro: {err.errno} {err.msg}\n")
    exit()       


def inserirMaquina(uuidServidor, SO , discoTotal, ramTotal, cpuInfo, idDataCenter):
    try:
     query = """
            INSERT INTO servidor_cliente (uuidServidor, sistemaOperacional, discoTotal, ramTotal, processadorInfo, fkDataCenter)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
     valores = (uuidServidor, SO, discoTotal, ramTotal, cpuInfo, idDataCenter)
     cursorFrio.execute(query, valores)
     mydbFrio.commit()
     print("Máquina inserida no bando de dados\n")
    except Error as err:
        print("Erro na hora de inserir máquina no banco de dados:")
        print(f"Erro: {err.errno} {err.msg}\n")
        exit()




