import database
from mysql.connector import Error 

mydb = database.gerarMyDbSelectLocal()
cursor = mydb.cursor()

def coletarMaquinasDisponiveis(uuidServidor):
    try:
     query = f"select idServidor from servidor_cliente WHERE uuidServidor = '{uuidServidor}';"
     cursor.execute(query)
     idMaquina = cursor.fetchone()
     if idMaquina is None:
        return None  
     return int(idMaquina[0])  
    except Error as err:
     print("Erro na coleta do servidor baseado no UUID")
     print(err)

def coletarIdDoComponente(nomeComponente):
    query = f"SELECT idComponente FROM componente WHERE nomeComponente = '{nomeComponente}';"
    cursor.execute(query)
    idComponente = cursor.fetchone()
    if idComponente is None:
        return None  
    return int(idComponente[0])

def selecionarComponentes():
    query = "SELECT nomeComponente FROM componente;"
    cursor.execute(query)
    componentes = cursor.fetchall()
    return [componente[0] for componente in componentes]

def coletarIdDoParametro(idComponente):
    query = f"SELECT idParametros_Servidor FROM parametro_servidor WHERE fkComponente = '{idComponente}';"
    cursor.execute(query)
    idParametro = cursor.fetchone()
    if idParametro is None:
        return None  
    return int(idParametro[0])

def coletarLimiarPorComponente(idComponente):
    query = "SELECT limiar_alerta FROM parametro_servidor WHERE fkComponente = %s"
    cursor.execute(query, (idComponente,))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        return None 

def coletarLimiarPorMaquina(idMaquina):
    query = """
    SELECT limiar_alerta FROM parametro_servidor WHERE fkServidor = %s ;
    """
    cursor.execute(query, (idMaquina,))
    return cursor.fetchall()
