import exibir

usuario = "admin"
password = "admin"


print("Bem vindo ao sistema Crawler da TradeFlux")
while True:
    usuEntrada = input("Digite seu Usuario: ")
    senha = input("Digite sua senha: ")
    if usuario == usuEntrada and password == senha:
        exibir.exibir()
    else:
        print("Usuario ou senha incorretos, por favor tente novamente!")

