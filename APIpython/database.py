
from mysql.connector import (connection)

def gerarMyDbInsert():
    return connection.MySQLConnection(
            host='localhost',          
            user='user_insert',        
            password='machineMYDB@01',      
            database='TradeFlux',
            auth_plugin='mysql_native_password',
            ssl_disabled= True
        )

def gerarMyDbSelect():
    return connection.MySQLConnection(
            host='localhost',          
            user='user_select',        
            password='machineMYDB@01',      
            database='TradeFlux',
            auth_plugin='mysql_native_password',
            ssl_disabled= True
        )


