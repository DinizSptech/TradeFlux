import database
import extract

while True:
    print("Por favor, digite 'Nome de Usuario e Senha para prosseguir.'")
    userNameInput = input("Nome de Usuario: ")
    passwordInput = input("Senha: ")
    if database.consultaUser(userNameInput, passwordInput):
        break
    else:
        print('Usuario ou senha incorretos. Por favor tente novamente')


print("Bem vindo ao Sistema de coleta TradeFlux!!!")

while True:
    print("Selecione o que deseja fazer agora: ")
    escolha = input("[1]- Iniciar monitoramento remoto \n"
        "[2]- Monitoramento Local \n"
        "[3]- Sair \n"
        "Digite a opção: ")
    if escolha == '1':
        print("Iniciando processo...")
        extract.printarInformacoes()
        database.consultaMaquina()
        extract.coletaLocal()

    elif escolha == '2':
        print("Iniciando monitoramento...")
        extract.coletaLocal()

    elif escolha == '3':
        print("Encerrando o sistema...")
        exit()
    else:
        print("Por favor digite apenas uma opção valida")

