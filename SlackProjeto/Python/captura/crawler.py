import psutil
import time
import subprocess
import platform
import math
from datetime import datetime, timedelta

def coletarCPUPercentual():
    cpuPercentual = psutil.cpu_percent()
    return cpuPercentual

def coletarCPUFreqGhz():
    cpuFreq = (psutil.cpu_freq()) 
    return cpuFreq.current / 1024

# RAM
def coletarRamPercentual():
    ramPercentual = round(psutil.virtual_memory().percent, 1)
    return ramPercentual

def coletarMemoriaUsadaGB():
    memoria = psutil.virtual_memory()  
    memoria_usada_gb = memoria.used / (1024 ** 3)
    return round(memoria_usada_gb, 1)

# Disco
def coletarDiscoPercentual():
    discoPercentual = psutil.disk_usage("/").percent
    return discoPercentual

def coletarDiscoUsadoGB():
    disco = psutil.disk_usage("/")  
    disco_usado_gb = disco.used / (1024 ** 3) 
    return round(disco_usado_gb, 1)  

def coletarTempoAtivo():
    """Coleta o tempo de atividade do sistema"""
    try:
        boot_time = psutil.boot_time()
        uptime_seconds = time.time() - boot_time
        uptime_timedelta = timedelta(seconds=uptime_seconds)
        
        # Formatando como HH:MM:SS
        total_seconds = int(uptime_seconds)
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    except Exception as e:
        return "00:00:00"

def coletarProcessos():
    num_cores = psutil.cpu_count(logical=True)

    # Inicia medição de CPU
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            proc.cpu_percent(interval=None)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

    time.sleep(1)

    processos = []
    for proc in psutil.process_iter(['pid', 'name', 'memory_percent']):
        try:
            nome = proc.info['name']
            if nome == "System Idle Process":
                continue

            cpu = proc.cpu_percent(interval=None) / num_cores
            mem = proc.memory_percent()

            if cpu > 0 or mem > 0:
                processos.append({
                    'pid': proc.pid,
                    'name': nome,
                    'cpu_percent': round(cpu, 2),
                    'ram_percent': round(mem, 2)
                })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    # Top 5 por CPU (descendente)
    processos_top_cpu = sorted(processos, key=lambda x: x['cpu_percent'], reverse=True)[:5]
    
    # Top 5 por RAM (descendente)  
    processos_top_ram = sorted(processos, key=lambda x: x['ram_percent'], reverse=True)[:5]
    
    # Lista final com processos duplicados quando necessário
    processos_finais = []
    
    # Adiciona processos do top CPU com grupo 'top_cpu'
    for proc in processos_top_cpu:
        proc_cpu = proc.copy()
        proc_cpu['grupo'] = 'top_cpu'
        processos_finais.append(proc_cpu)
    
    # Adiciona processos do top RAM com grupo 'top_ram'
    for proc in processos_top_ram:
        proc_ram = proc.copy()
        proc_ram['grupo'] = 'top_ram'
        processos_finais.append(proc_ram)
    
    # Ordena o resultado final: primeiro por grupo (CPU primeiro), depois por CPU desc, depois por RAM desc
    processos_finais_ordenados = sorted(
        processos_finais, 
        key=lambda x: (
            0 if x['grupo'] == 'top_cpu' else 1,  # CPU primeiro
            -x['cpu_percent'],  # CPU descendente
            -x['ram_percent']   # RAM descendente
        )
    )
    
    return processos_finais_ordenados

def coletarVelocidadeDownload():
    antes = psutil.net_io_counters()
    time.sleep(1)
    depois = psutil.net_io_counters()

    bytes_recebidos = depois.bytes_recv - antes.bytes_recv
    velocidade_mbps = (bytes_recebidos * 8) / (1024 ** 2)  # Correção: MB/s, não GB/s

    return round(velocidade_mbps, 2)

def coletarVelocidadeUpload():
    antes = psutil.net_io_counters()
    time.sleep(1)
    depois = psutil.net_io_counters()

    bytes_enviados = depois.bytes_sent - antes.bytes_sent
    velocidade_mbps = (bytes_enviados * 8) / (1024 ** 2)  # Correção: MB/s, não GB/s

    return round(velocidade_mbps, 2)

# Função alternativa para obter processos separados por categoria
def coletarProcessosSeparados():
    """
    Coleta processos separados em categorias distintas
    
    Returns:
        dict: Processos organizados por categoria (top_cpu, top_ram)
    """
    num_cores = psutil.cpu_count(logical=True)

    # Inicia medição de CPU
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            proc.cpu_percent(interval=None)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

    time.sleep(1)

    processos = []
    for proc in psutil.process_iter(['pid', 'name', 'memory_percent']):
        try:
            nome = proc.info['name']
            if nome == "System Idle Process":
                continue

            cpu = proc.cpu_percent(interval=None) / num_cores
            mem = proc.memory_percent()

            if cpu > 0 or mem > 0:
                processos.append({
                    'pid': proc.pid,
                    'name': nome,
                    'cpu_percent': round(cpu, 2),
                    'ram_percent': round(mem, 2)
                })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    # Top 5 por CPU
    top_cpu = sorted(processos, key=lambda x: x['cpu_percent'], reverse=True)[:5]
    
    # Top 5 por RAM
    top_ram = sorted(processos, key=lambda x: x['ram_percent'], reverse=True)[:5]
    
    # Adiciona grupo a cada processo
    for proc in top_cpu:
        proc['grupo'] = 'top_cpu'
    
    for proc in top_ram:
        proc['grupo'] = 'top_ram'
    
    # Calcula estatísticas
    pids_cpu = {p['pid'] for p in top_cpu}
    pids_ram = {p['pid'] for p in top_ram}
    processos_duplicados = len(pids_cpu.intersection(pids_ram))
    
    return {
        'top_cpu': top_cpu,
        'top_ram': top_ram,
        'resumo': {
            'total_processos': len(processos),
            'processos_top_cpu': len(top_cpu),
            'processos_top_ram': len(top_ram),
            'processos_duplicados': processos_duplicados,
            'total_entradas': len(top_cpu) + len(top_ram)  # Incluindo duplicatas
        }
    }
def coletar_informacoes():
    informacoes = {}
    sistema = platform.system()
    versao = platform.version()
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
    informacoes["RAM Máxima"] = f"{math.ceil(ram_maxima)}"

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
        informacoes["Armazenamento Máximo"] = f"{armazenamento}"
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

def coletar_dados(id_datacenter=1, id_servidor=1, separar_processos=False):
    nome_servidor = "Servidor "+ str(id_servidor)
    """
    Coleta dados do sistema e retorna na estrutura solicitada
    
    Args:
        nome_servidor (str): Nome do servidor para identificação
        separar_processos (bool): Se True, retorna processos separados por categoria
    
    Returns:
        dict: Dados estruturados conforme especificado
    """
    cpu_percentual = coletarCPUPercentual()
    cpu_freq = coletarCPUFreqGhz()
    
    ram_percentual = coletarRamPercentual()
    memoria_usada_gb = coletarMemoriaUsadaGB()
    
    disco_percentual = coletarDiscoPercentual()
    disco_usado_gb = coletarDiscoUsadoGB()
    
    velocidade_download = coletarVelocidadeDownload()
    velocidade_upload = coletarVelocidadeUpload()
    
    tempo_ativo = coletarTempoAtivo()
    
    # Escolhe entre processos unificados ou separados
    if separar_processos:
        processos = coletarProcessosSeparados()
    else:
        processos = coletarProcessos()

    # Estrutura de dados conforme solicitado
    dados_estruturados = {
        'servidor': nome_servidor,
        'dados': {
                'Momento': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'ram': ram_percentual,
                'cpu': cpu_percentual,
                'disco': disco_percentual,
                'download': velocidade_download,
                'upload': velocidade_upload,
                'ram_gb': memoria_usada_gb,
                'cpu_freq': cpu_freq,
                'disco_gb': disco_usado_gb,
                'tempo_ativo': tempo_ativo,
                'processos': processos
            }
        
    }
    
    # print('\n\n\n' + dados_estruturados + '\n\n\n')

    return dados_estruturados
