import database;
from mysql.connector import Error 

mydb = database.gerarMyDbInsert()
cursor = mydb.cursor()

def inserirData(valor, medida, dataHora, alerta, idParametro):
 try:
    query = """
    INSERT INTO captura (valor, medida, data, alerta, fkParametro) VALUES (%s, %s, %s, %s, %s)
    """
    valores = (valor, medida, dataHora, alerta, idParametro)
    cursor.execute(query, valores)
    mydb.commit()
 except Error as err:
    print("Erro na hora de inserir dados no banco de dados:")
    print(f"Erro: {err.errno} {err.msg}\n")
    exit()       


def inserirMaquina(uuidServidor, SO , ramTotal, discoTotal, cpuInfo, idDataCenter):
    try:
     print(uuidServidor, SO , ramTotal, discoTotal, cpuInfo, idDataCenter)
     query = (
    "INSERT INTO Servidor_Cliente (uuidServidor, sistemaOperacional, ramTotal, discoTotal, processadorInfo, fkDataCenter) "
    "VALUES (%s, %s, %s, %s, %s, %s)")
     valores = (uuidServidor, SO, ramTotal, discoTotal, cpuInfo, idDataCenter)
     cursor.execute(query, valores)
     mydb.commit()
     print("Máquina inserida no bando de dados\n")
    except Error as err:
        print("Erro na hora de inserir máquina no banco de dados:")
        print(f"Erro: {err.errno} {err.msg}\n")
        exit()




