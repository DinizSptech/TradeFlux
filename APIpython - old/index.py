import exibir
import json
usuarios = '[{"usuario": "admin", "password": "admin", "idCompany": 1 }]'
y = json.loads(usuarios)

print(y)
print("Bem vindo ao sistema Crawler da TradeFlux")
def index():
    while True:
        usuEntrada = input("Digite seu Usuario: ")
        senha = input("Digite sua senha: ")
        autenticado = False
        for user in y:
            if(user["usuario"] == usuEntrada and user["password"] == senha):
                autenticado = True
                exibir.exibir(user["idCompany"])
        if (not autenticado):
            print("Usuario ou senha incorretos, por favor tente novamente!")

index()