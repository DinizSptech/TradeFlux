import database;

mydb = database.gerarMyDbInsert()
cursor = mydb.cursor()

def inserirData(valor, medida, dataHora, alerta, idParametro):
    query = """
    INSERT INTO captura (valor, medida, data, alerta, fkParametro) VALUES (%s, %s, %s, %s, %s)
    """
    valores = (valor, medida, dataHora, alerta, idParametro)
    cursor.execute(query, valores)
    mydb.commit()


def inserirMaquina(SO, discoTotal, ramTotal, cpuInfo, idDataCenter, uuidServidor):
    query = """
    UPDATE Servidor_Cliente 
    SET sistemaOperacional = %s, ramTotal = %s, discoTotal = %s, processadorInfo = %s, fkDataCenter = %s
    WHERE uuid_servidor = %s
    """
    valores = (SO, ramTotal, discoTotal, cpuInfo, idDataCenter, uuidServidor)
    cursor.execute(query, valores)
    mydb.commit()




