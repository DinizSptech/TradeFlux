import database

mydb = database.gerarMyDbSelect()
cursor = mydb.cursor()


def coletarRecursoPorMaquina(idMaquina, recurso, idCompany):
    query = f"WITH RankedData AS ( SELECT Data.{recurso}, Data.idMachine, Company.idCompany, ROW_NUMBER() OVER (PARTITION BY Data.idMachine ORDER BY Data.idData DESC) AS num_linhas FROM Data JOIN Machine ON Data.idMachine = Machine.idMachine JOIN Company ON Machine.idCompany = Company.idCompany) SELECT {recurso}, idMachine FROM RankedData WHERE idMachine = {idMaquina} AND idCompany = {idCompany} AND num_linhas <= 3;"
    cursor.execute(query)
    return cursor.fetchall()

def coletarRecursosGeral(recurso, idCompany):
    query = f"WITH RankedData AS ( SELECT {recurso}, Data.idMachine, Company.idCompany, ROW_NUMBER() OVER (PARTITION BY Data.idMachine ORDER BY Data.idData DESC) AS num_linhas FROM Data JOIN Machine ON Data.idMachine = Machine.idMachine JOIN Company ON Machine.idCompany = Company.idCompany) SELECT {recurso}, idMachine FROM RankedData WHERE idCompany = {idCompany} AND num_linhas <= 3;"
    cursor.execute(query)
    return cursor.fetchall()

def coletarMaquinasDisponiveis(idCompany):
    query = f"SELECT COUNT(idMachine) FROM Machine JOIN Company ON Machine.idCompany = Company.idCompany WHERE Machine.idCompany = {idCompany};"
    cursor.execute(query)
    return cursor.fetchall()

