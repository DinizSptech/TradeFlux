import database;
import extract;

while True:
    print("Por favor, digite 'Nome de Usuario e Senha para prosseguir.'")
    userName = input("Nome de Usuario: ")
    senha = input("Senha: ")
    if(database.consultaUser(userName, senha)):
        break
    else:
        print('Usuario ou senha incorretos. Por favor tente novamente')


print("Bem vindo ao Sistema de coleta TradeFlux!!!")

while True:
    print("Selecione o que deseja fazer agora: ")
    escolha = input("[1]- Iniciar monitoramento remoto \n"
        "[2]- Monitoramento Local \n"
        "[3]- Sair")
    if(escolha == 1):

