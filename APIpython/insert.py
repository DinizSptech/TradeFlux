import database;

mydb = database.gerarMyDbInsert()
cursor = mydb.cursor()

def inserirData(idMaquina, cpu, ram, disk):
    query = f"INSERT INTO Data (idMachine, cpuUsage, ramUsage, diskUsage) VALUES('{idMaquina}', '{cpu}', '{ram}', '{disk}');"
    cursor.execute(query)
    mydb.commit()


def inserirAlert(idMaquina, cpu, ram, disk):
    query = f"INSERT INTO Alert (fkMachine, cpuUsage, ramUsage, diskUsage) VALUES('{idMaquina}', '{cpu}', '{ram}', '{disk}');"
    cursor.execute(query)
    mydb.commit()

