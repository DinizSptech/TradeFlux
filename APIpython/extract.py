import psutil
import time
import subprocess
import platform
import math
import selectbd
import json
import s3

from datetime import datetime

def coletarCPU():
    cpu = psutil.cpu_percent()
    return cpu

def coletarRam():
    ramUsada = round(psutil.virtual_memory().percent, 2)
    return ramUsada

def coletarDisk():
    usedDisk = round(psutil.disk_usage("/").percent, 2)
    return usedDisk

def coletaLocal(idMaquina):
    # bucket_name = "nome-do-seu-bucket"  
    limites = selectbd.coletarLimiarPorMaquina(idMaquina)
    cpuLim = 0
    discoLim = 0
    ramLim = 0
    for componente, limite in limites:
        if componente == "CPU":
            cpuLim = limite
        elif componente == "RAM":
            ramLim = limite
        else:
            discoLim = limite
    contador = 0
    listaJson = []
    while True:
        contador += 1
        ram = coletarRam()
        disk = coletarDisk()
        cpu = coletarCPU()
        print(f"Repetição: {contador}")
        print(f"Uso da CPU: {cpu}%")
        print(f"Uso da RAM: {ram}%")
        print(f"Uso do disco: {disk}%")
        print("-----------------------------------")
        momento = datetime.now()
        segundos = momento.strftime("%S")
        print(segundos)
        jsonDados = {
          "ram": ram,
          "disco": disk,
          "cpu": cpu
        }
        listaJson.append(jsonDados)
        if contador == 3:
            nomeArq =  momento.strftime("%y-%m-%d_%H-%M") + f"_{idMaquina}" + ".json"
            with open(nomeArq, "w", encoding="utf-8") as arquivo:
                json.dump(listaJson, arquivo, ensure_ascii=False, indent=2)
            # s3.upload(nomeArq)
            listaJson = []
            contador = 0
        time.sleep(5)


# print("Iniciando Coleta")
# coletaLocal()

def coletar_informacoes():
    informacoes = {}

    # Sistema Operacional
    sistema = platform.system()  # Sistema operacional
    versao = platform.version()  # Versão do sistema operacional
    informacoes["Sistema Operacional"] = f"{sistema} {versao}"

    # Modelo do Processador
    try:
        if sistema == "Windows":
            # Usando PowerShell para pegar o modelo do processador
            processador = subprocess.check_output(["powershell", "-Command", "Get-WmiObject Win32_Processor | Select-Object -ExpandProperty Name"], shell=True).decode().strip()
            if not processador:
                processador = "Modelo do Processador não encontrado"
        elif sistema == "Linux":
            # Linux: lendo de /proc/cpuinfo
            processador = subprocess.check_output("cat /proc/cpuinfo | grep 'model name' | uniq", shell=True).decode().split(":")[1].strip()
        else:
            processador = "Desconhecido"
        informacoes["Modelo do Processador"] = processador
    except Exception as e:
        informacoes["Modelo do Processador"] = "Erro ao coletar"

    # Quantidade Máxima de RAM
    ram_maxima = psutil.virtual_memory().total / (1024 ** 3)
    informacoes["RAM Máxima"] = f"{math.ceil(ram_maxima)} GB"

    # Quantidade Máxima de Armazenamento
    try:
        if sistema == "Windows":
            # Windows: pegando o espaço total do disco principal (C:)
            armazenamento = psutil.disk_usage("C:/").total / (1024 ** 3) 
            armazenamento = math.ceil(armazenamento).__ceil__()
            armazenamento = int(armazenamento)
        elif sistema == "Linux":
            # Linux: usando o comando df para obter o espaço total do disco
            armazenamento = subprocess.check_output("df --total -h | grep total", shell=True).decode().split()[1]
            armazenamento = float(armazenamento[:-1])  # Removendo o "G" e convertendo para float
            armazenamento = math.ceil(armazenamento).__ceil__()
            armazenamento = int(armazenamento)
        else:
            armazenamento = "Desconhecido"
        informacoes["Armazenamento Máximo"] = f"{armazenamento} GB"
    except Exception as e:
        informacoes["Armazenamento Máximo"] = "Erro ao coletar"

    # UUID da placa mãe
    try:
        if sistema == "Windows":
            # Usando PowerShell para tentar pegar o UUID da placa-mãe
            uuid_placa_mae = subprocess.check_output(["powershell", "-Command", "Get-WmiObject Win32_BaseBoard | Select-Object -ExpandProperty SerialNumber"], shell=True).decode().strip()
            if not uuid_placa_mae:
                uuid_placa_mae = "UUID não encontrado"
        elif sistema == "Linux":
            # Linux: usando o comando dmidecode para pegar o UUID da placa mãe
            uuid_placa_mae = subprocess.check_output("sudo dmidecode -s system-uuid", shell=True).decode().strip()
        else:
            uuid_placa_mae = "Desconhecido"
        informacoes["UUID da Placa Mãe"] = uuid_placa_mae
    except Exception as e:
        informacoes["UUID da Placa Mãe"] = "Erro ao coletar"

    return informacoes



# def coletarPorCpuLogico():
#     listaCPUs = psutil.cpu_percent(interval=1, percpu=True)
#     for i in range(len(listaCPUs)):
#             usoCPUs += f"Uso do {i + 1}° núcleo: {listaCPUs[i]}%\n"
#             if listaCPUs[i] > 70:
#                 alertaCPUs += f"O {i}° está com o uso acima de 70%!!!!!\n"