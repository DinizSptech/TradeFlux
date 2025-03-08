import insert
import psutil
import time
import math


idMaquina = 3

def coletarCPU():
    cpu = psutil.cpu_percent()
    return cpu

def coletarRam():
    ramUsada = round((psutil.virtual_memory().used) / (1024 ** 3), 2)
    return ramUsada

def coletarDisk():
    usedDisk = math.ceil((psutil.disk_usage("/").used) / (1024 ** 3))
    return usedDisk

def coletaLocal():
    while True:
        ram = coletarRam()
        disk = coletarDisk()
        cpu = coletarCPU()
        if cpu or disk or ram > 70:
            insert.inserirAlert(idMaquina, cpu, ram, disk)
        insert.inserirData(idMaquina, cpu, ram, disk)
        time.sleep(2)


print("Iniciando Coleta")
coletaLocal()
