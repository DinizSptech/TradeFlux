import database
import psutil
import time
import math


idMaquina = 4

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
        database.inserirBanco(idMaquina, cpu, ram, disk)
        time.sleep(2)

print("Iniciando Coleta")
coletaLocal()
