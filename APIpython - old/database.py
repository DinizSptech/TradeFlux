
from mysql.connector import (connection)

def gerarMyDbInsert():
    return connection.MySQLConnection(
            host='localhost',          
            user='user_insert_tradeflux',        
            password='tradeflux_insert',      
            database='tradeflux',
            auth_plugin='mysql_native_password',
            ssl_disabled= True
        )

def gerarMyDbSelect():
    return connection.MySQLConnection(
            host='localhost',          
            user='user_select_tradeflux',        
            password='tradeflux_select',      
            database='tradeflux',
            auth_plugin='mysql_native_password',
            ssl_disabled= True
        )


