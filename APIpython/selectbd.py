import database

mydb = database.gerarMyDbSelect()
cursor = mydb.cursor()

def coletarMaquinasDisponiveis(uuidCliente):
    query = f"SELECT idServidor FROM servidor_cliente WHERE uuidServidor = '{uuidCliente}';"
    cursor.execute(query)
    idMaquina = cursor.fetchall()
    if len(idMaquina) == 0:
        return 0
    return int(idMaquina[0][0])


def coletarLimiarPorMaquina(idMaquina):
    query = f"SELECT componente, limiar_alerta FROM servidor_cliente JOIN parametro_servidor ON idServidor = fkServidor JOIN componente ON fkComponente = idComponente WHERE idServidor = {idMaquina};"
    cursor.execute(query)
    return cursor.fetchall()

