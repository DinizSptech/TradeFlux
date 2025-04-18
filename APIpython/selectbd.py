import database

mydb = database.gerarMyDbSelect()
cursor = mydb.cursor()

def coletarMaquinasDisponiveis(uuidServidor):
    query = f"select `idServidor` from servidor_cliente WHERE uuid_servidor = '{uuidServidor}';"
    cursor.execute(query)
    idMaquina = cursor.fetchone()
    if idMaquina is None:
        return None  
    return int(idMaquina[0])  

def coletarIdDoComponente(nomeComponente):
    query = f"SELECT idComponente FROM componente WHERE nomeComponente = '{nomeComponente}';"
    cursor.execute(query)
    idComponente = cursor.fetchone()
    if idComponente is None:
        return None  
    return int(idComponente[0])

def coletarIdDoParametro(idComponente):
    query = f"SELECT idParametros_Servidor FROM parametro_servidor WHERE fkComponente = '{idComponente}';"
    cursor.execute(query)
    idParametro = cursor.fetchone()
    if idParametro is None:
        return None  
    return int(idParametro[0])

def coletarLimiarPorComponente(idComponente):
    query = "SELECT limiar_alerta FROM Parametro_Servidor WHERE fkComponente = %s"
    cursor.execute(query, (idComponente,))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        return None 

def coletarLimiarPorMaquina(idMaquina):
    query = """
    SELECT limiar_alerta FROM parametro_servidor WHERE fkServidor = %s AND fkComponente =  ;
    """
    cursor.execute(query, (idMaquina,))
    return cursor.fetchall()
