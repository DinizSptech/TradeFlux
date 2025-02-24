import mysql.connector

mydb = mysql.connector.connect(
            host='localhost',          
            user='machine',        
            password='machineMYDB@01',      
            database='TradeFlux' 
        )

cursor = mydb.cursor()

def consultaUser(nome, senha):
    query = f"SELECT userName, password FROM users WHERE userName LIKE '{nome}' AND password = '{senha}';"
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
    

def cadastrarMaquina(machineName, UUID, processor, disk, ram, so):
    query = f"INSERT INTO machine VALUES(DEFAULT, '{machineName}', '{UUID}', '{processor}', '{disk}', '{ram}', '{so}')"
    cursor.execute(query)
    mydb.commit()

def consultaMaquina(uuid):
    query = f"SELECT machineName FROM machine WHERE motherboardUUID = '{uuid}';"
    cursor.execute(query)
    resultado = cursor.fetchall()
    if(resultado):
        print("Maquina já registrada detectada!")
        
    else:
        print("Maquina nova detectada!, criando novo registro")