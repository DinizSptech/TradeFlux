import mysql.connector
from mysql.connector import (connection)

mydb = connection.MySQLConnection(
            host='10.18.32.68',          
            user='machine',        
            password='machineMYDB@01',      
            database='TradeFlux',
            ssl_disabled= True
        )

cursor = mydb.cursor()

def inserirBanco(idMaquina, cpu, ram, disk):
    query = f"INSERT INTO Dados (idMachine, cpuPercent, ramPercent, diskPercent) VALUES('{idMaquina}', '{cpu}', '{ram}', '{disk}');"
    cursor.execute(query)
    mydb.commit()
