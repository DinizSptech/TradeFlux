import mysql.connector
from mysql.connector import (connection)
import extract

mydb = connection.MySQLConnection(
            host='localhost',          
            user='machine',        
            password='machineMYDB@01',      
            database='TradeFlux' 
        )

cursor = mydb.cursor()

def consultaUser(nome, senha):
    query = f"SELECT userName, password FROM User WHERE userName = '{nome}' AND password = '{senha}';"
    cursor.execute(query)
    resultado = cursor.fetchall()
    userName = ''
    password = ''
    for tupla in resultado:
        userName = tupla[0]
        password = tupla[1]
    
    if(nome == userName and senha == password):
        print('Usuario Conectado com sucesso')

        return True
    else:
        return False


def cadastrarMaquina():

    informacoes = extract.coletar_informacoes()

    machineName = input("Insira um Nome para essa maquina: ")
    UUID = informacoes.get("UUID da Placa Mãe")
    processor = informacoes.get("Modelo do Processador")
    disk = informacoes.get("Armazenamento Máximo")
    disk = int(disk.split()[0])
    ram = informacoes.get("RAM Máxima")
    ram = int(ram.split()[0])
    so = informacoes.get("Sistema Operacional")

    if not UUID or UUID in ["UUID não encontrado", "Erro ao coletar"]:
        print("Erro: UUID inválido, cadastro não realizado.")
        return False

    query = """
    INSERT INTO Machine (machineName, motherboardUUID, processor, disk, ram, os) 
    VALUES (%s, %s, %s, %s, %s, %s);
    """
    try:
        cursor.execute(query, (machineName, UUID, processor, disk, ram, so))
        mydb.commit()
        print("Máquina cadastrada com sucesso!")
        return True
    except Exception as e:
        print(f"Erro ao cadastrar máquina: {e}")
        mydb.rollback()
        return False


def consultaMaquina():
    informacoes = extract.coletar_informacoes()
    uuid = informacoes.get("UUID da Placa Mãe")
    query = "SELECT machineName, idMachine FROM Machine WHERE motherboardUUID = %s;"
    cursor.execute(query, (uuid,))
    resultado = cursor.fetchone()

    if resultado:
        machineName, idMachine = resultado  # Desempacota os valores
        print(f"Máquina já registrada detectada! Nome: {machineName}")
        return resultado
    else:
        print("Máquina nova detectada! Criando novo registro.")
        cadastrarMaquina()


def coletaRemota():
    while True:
        ram = extract.coletarRam()
        disk = extract.coletarDisk()
        cpu = extract.coletarCPU()