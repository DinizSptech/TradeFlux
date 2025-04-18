import psutil
import time
import subprocess
import platform
import math
import json
import insert
import selectbd
import s3

from datetime import datetime

# CPU
def coletarCPUPercentual():
    cpuPercentual = psutil.cpu_percent()
    return cpuPercentual

def coletarCPUFreqGhz():
    cpuFreq = (psutil.cpu_freq()) 
    return cpuFreq.current / 1000  # Converte para GHz

# RAM
def coletarRamPercentual():
    ramPercentual = round(psutil.virtual_memory().percent, 1)
    return ramPercentual

def coletarMemoriaUsadaGB():
    memoria = psutil.virtual_memory()  
    memoria_usada_gb = memoria.used / (1024 ** 3)  # Converte de bytes para GB
    return round(memoria_usada_gb, 1)  # Retorna o valor arredondado para 1 casa decimal

# Disco
def coletarDiscoPercentual():
    discoPercentual = psutil.disk_usage("/").percent
    return discoPercentual

def coletarDiscoUsadoGB():
    disco = psutil.disk_usage("/")  
    disco_usado_gb = disco.used / (1024 ** 3)  # Converte de bytes para GB
    return round(disco_usado_gb, 1)  # Retorna o valor arredondado para 1 casa decimal

def coletaLocal(idMaquina):
    contador = 0
    listaJson = []
    while True:
        contador += 1
        CPUPercentual = coletarCPUPercentual()
        CPUFreq = coletarCPUFreqGhz()
        RamPercentual = coletarRamPercentual()
        MemoriaUsadaGB = coletarMemoriaUsadaGB()
        DiscoPercentual = coletarDiscoPercentual()
        DiscoUsadoGB = coletarDiscoUsadoGB()
        print(f"Repetição: {contador}")
        print(f"Servidor: {idMaquina}")
        print(f"Uso da CPU: {CPUPercentual}%")
        print(f"Frequência da CPU: {CPUFreq} GHz")
        print(f"Uso da RAM: {RamPercentual}%")
        print(f"Memória usada: {MemoriaUsadaGB} GB")
        print(f"Uso do Disco: {DiscoPercentual}%")
        print(f"Disco usado: {DiscoUsadoGB} GB")
        print(f"Data-hora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-----------------------------------")
        momento = datetime.now()
        segundos = momento.strftime("%S")
        print(segundos)
    

        #inserção no banco de dados
        #cpu
        idComponente = selectbd.coletarIdDoComponente("CPU_percentual")
        idParametro = selectbd.coletarIdDoParametro(idComponente)
        limiarAlerta = selectbd.coletarLimiarPorComponente(idComponente)
        if CPUPercentual >= limiarAlerta:
            insert.inserirData(CPUPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 2, idParametro)
        elif  CPUPercentual > (limiarAlerta - 10) and CPUPercentual < limiarAlerta:
            insert.inserirData(CPUPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 1, idParametro)
        else:
            insert.inserirData(CPUPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 0, idParametro)

        idComponente = selectbd.coletarIdDoComponente("CPU_frequencia")
        idParametro = selectbd.coletarIdDoParametro(idComponente)
        limiarAlerta = selectbd.coletarLimiarPorComponente(idComponente)
        if CPUFreq >= limiarAlerta:
            insert.inserirData(CPUFreq, 'GHz', momento.strftime("%Y-%m-%d %H:%M:%S"), 2, idParametro)
        elif  CPUFreq > (limiarAlerta - 0.10) and CPUFreq < limiarAlerta:
            insert.inserirData(CPUFreq, 'GHz', momento.strftime("%Y-%m-%d %H:%M:%S"), 1, idParametro)
        else:
            insert.inserirData(CPUFreq, 'GHz', momento.strftime("%Y-%m-%d %H:%M:%S"), 0, idParametro)

        #ram
        idComponente = selectbd.coletarIdDoComponente("RAM_percentual")
        idParametro = selectbd.coletarIdDoParametro(idComponente)
        limiarAlerta = selectbd.coletarLimiarPorComponente(idComponente)
        if RamPercentual >= limiarAlerta:
            insert.inserirData(RamPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 2, idParametro)
        elif  RamPercentual > (limiarAlerta - 10) and RamPercentual < limiarAlerta:
            insert.inserirData(RamPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 1, idParametro)
        else:
            insert.inserirData(RamPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 0, idParametro)

        idComponente = selectbd.coletarIdDoComponente("RAM_usada")
        idParametro = selectbd.coletarIdDoParametro(idComponente)
        limiarAlerta = selectbd.coletarLimiarPorComponente(idComponente)
        if MemoriaUsadaGB >= limiarAlerta:
            insert.inserirData(MemoriaUsadaGB, 'GB', momento.strftime("%Y-%m-%d %H:%M:%S"), 2, idParametro)
        elif  MemoriaUsadaGB > (limiarAlerta - 5) and MemoriaUsadaGB < limiarAlerta:
            insert.inserirData(MemoriaUsadaGB, 'GB', momento.strftime("%Y-%m-%d %H:%M:%S"), 1, idParametro)
        else:
            insert.inserirData(MemoriaUsadaGB, 'GB', momento.strftime("%Y-%m-%d %H:%M:%S"), 0, idParametro)

        #disco
        idComponente = selectbd.coletarIdDoComponente("Disco_percentual")
        idParametro = selectbd.coletarIdDoParametro(idComponente)
        limiarAlerta = selectbd.coletarLimiarPorComponente(idComponente)
        if DiscoPercentual >= limiarAlerta:
            insert.inserirData(DiscoPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 2, idParametro)
        elif  DiscoPercentual > (limiarAlerta - 10) and DiscoPercentual < limiarAlerta:
            insert.inserirData(DiscoPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 1, idParametro)
        else:
            insert.inserirData(DiscoPercentual, '%', momento.strftime("%Y-%m-%d %H:%M:%S"), 0, idParametro)


        idComponentedo = selectbd.coletarIdDoComponente("Disco_usado")
        idParametro = selectbd.coletarIdDoParametro(idComponentedo)
        limiarAlerta = selectbd.coletarLimiarPorComponente(idComponentedo)
        if DiscoUsadoGB >= limiarAlerta:
            insert.inserirData(DiscoUsadoGB, 'GB', momento.strftime("%Y-%m-%d %H:%M:%S"), 2, idParametro)
        elif  DiscoUsadoGB > (limiarAlerta - 50) and DiscoUsadoGB < limiarAlerta:
            insert.inserirData(DiscoUsadoGB, 'GB', momento.strftime("%Y-%m-%d %H:%M:%S"), 1, idParametro)
        else:
            insert.inserirData(DiscoUsadoGB, 'GB', momento.strftime("%Y-%m-%d %H:%M:%S"), 0, idParametro)

        jsonDados = {
            "percentualCPU": CPUPercentual,
            "frequenciaCPU": CPUFreq,
            "percentualRAM": RamPercentual,
            "memoriaUsadaGB": MemoriaUsadaGB,
            "percentualDisco": DiscoPercentual,
            "discoUsadoGB": DiscoUsadoGB,
            "data-hora": momento.strftime("%Y-%m-%d %H:%M:%S")
        }

        listaJson.append(jsonDados)
        if contador == 3:
            nomeArq = momento.strftime("%y-%m-%d_%H-%M") + f"_{idMaquina}" + ".json"
            with open(nomeArq, "w", encoding="utf-8") as arquivo:
                json.dump(listaJson, arquivo, ensure_ascii=False, indent=2)
            # s3.upload(nomeArq)
            listaJson = []
            contador = 0
        time.sleep(5)

# Coleta de Informações do Sistema
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
            processador = subprocess.check_output(
                ["powershell", "-Command", "Get-WmiObject Win32_Processor | Select-Object -ExpandProperty Name"], 
                shell=True
            ).decode().strip()
            if not processador:
                processador = "Modelo do Processador não encontrado"
        elif sistema == "Linux":
            # Linux: lendo de /proc/cpuinfo
            processador = subprocess.check_output(
                "cat /proc/cpuinfo | grep 'model name' | uniq", 
                shell=True
            ).decode().split(":")[1].strip()
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
            armazenamento = subprocess.check_output(
                "df --total -h | grep total", 
                shell=True
            ).decode().split()[1]
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
            # Usando PowerShell para pegar o UUID da placa-mãe
            uuid_placa_mae = subprocess.check_output(
                ["powershell", "-Command", "Get-WmiObject Win32_BaseBoard | Select-Object -ExpandProperty SerialNumber"], 
                shell=True
            ).decode().strip()
            if not uuid_placa_mae:
                uuid_placa_mae = "UUID não encontrado"

        elif sistema == "Linux":
            # Linux: usando o comando dmidecode para pegar o UUID da placa mãe
            try:
                uuid_placa_mae = subprocess.check_output(
                    "sudo dmidecode -s system-uuid", 
                    shell=True
                ).decode().strip()
            except subprocess.CalledProcessError as e:
                uuid_placa_mae = "Erro ao executar dmidecode (necessário sudo)"
            except Exception as e:
                uuid_placa_mae = f"Erro ao coletar UUID no Linux: {e}"

        else:
            uuid_placa_mae = "Desconhecido"
        
        informacoes["UUID da Placa Mãe"] = uuid_placa_mae

    except Exception as e:
        informacoes["UUID da Placa Mãe"] = f"Erro ao coletar UUID: {e}"

    return informacoes
