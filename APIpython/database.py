
from mysql.connector import (connection)

def gerarMyDb():
    return connection.MySQLConnection(
            host='localhost',          
            user='root',        
            password='Luiza0312@',      
            database='TradeFlux',
            auth_plugin='mysql_native_password',
            ssl_disabled= True
        )

mydb = gerarMyDb()
cursor = mydb.cursor()

def inserirBanco(idMaquina, cpu, ram, disk):
    query = f"INSERT INTO Dados (idMachine, cpuPercent, ramPercent, diskPercent) VALUES('{idMaquina}', '{cpu}', '{ram}', '{disk}');"
    cursor.execute(query)
    mydb.commit()
