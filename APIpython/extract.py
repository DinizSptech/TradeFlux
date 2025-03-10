import insert
import psutil
import time
import math


idMaquina = 1

def coletarCPU():
    cpu = psutil.cpu_percent()
    return cpu

def coletarRam():
    ramUsada = round(psutil.virtual_memory().percent, 2)
    return ramUsada

def coletarDisk():
    usedDisk = round(psutil.disk_usage("/").percent, 2)
    return usedDisk

def coletarPorCpuLogico():
    listaCPUs = psutil.cpu_percent(interval=1, percpu=True)
    for i in range(len(listaCPUs)):
            usoCPUs += f"Uso do {i + 1}° núcleo: {listaCPUs[i]}%\n"
            if listaCPUs[i] > 70:
                alertaCPUs += f"O {i}° está com o uso acima de 70%!!!!!\n"

def coletaLocal():
    while True:
        ram = coletarRam()
        disk = coletarDisk()
        cpu = coletarCPU()
        if cpu > 70 or disk > 70 or ram > 70:
            insert.inserirAlert(idMaquina, cpu, ram, disk)
        insert.inserirData(idMaquina, cpu, ram, disk)
        time.sleep(2)


print("Iniciando Coleta")
coletaLocal()
