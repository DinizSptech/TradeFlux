from mysql.connector import connection, Error

def gerarMyDbInsert():
    try:
        conn = connection.MySQLConnection(
            host='localhost',
            user='user_insert_tradeflux',
            password='tradeflux_insert',
            database='tradeflux',
            auth_plugin='mysql_native_password',
            ssl_disabled=True
        )
        if conn.is_connected():
            return conn
        else:
            print("Falha na conexão (Insert): conexão não foi estabelecida.")
            return None
    except Error as e:
        print(f"Erro ao seu conectar ao (Insert): {e}")
        return None

def gerarMyDbSelect():
    try:
        conn = connection.MySQLConnection(
            host='localhost',
            user='user_select_tradeflux',
            password='tradeflux_select',
            database='tradeflux',
            auth_plugin='mysql_native_password',
            ssl_disabled=True
        )
        if conn.is_connected():
            return conn
        else:
            print("Falha na conexão (Select): conexão não foi estabelecida.")
            return None
    except Error as e:
        print(f"Erro ao seu conectar ao (Select): {e}")
        return None
