import platform
import psutil
import subprocess
import math
import time;

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
            armazenamento = math.ceil(armazenamento)
        elif sistema == "Linux":
            # Linux: usando o comando df para obter o espaço total do disco
            armazenamento = subprocess.check_output("df --total -h | grep total", shell=True).decode().split()[1]
            armazenamento = float(armazenamento[:-1])  # Removendo o "G" e convertendo para float
            armazenamento = math.ceil(armazenamento)
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

informacoes = coletar_informacoes()
for chave, valor in informacoes.items():
    print(f"{chave}: {valor}")

def coletarCPU():
    cpu = psutil.cpu_percent()
    return cpu

def coletarRam():
    ramLivre = psutil.virtual_memory().used
    return ramLivre

def coletarDisk():
    freeDisk = psutil.disk_usage("C:").free
    usedDisk = psutil.disk_usage("C:").used
    return freeDisk, usedDisk
