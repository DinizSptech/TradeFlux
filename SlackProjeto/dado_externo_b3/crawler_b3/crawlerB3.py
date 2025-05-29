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

    # Ordena por CPU (descendente) e pega os top 10
    processos_top_cpu = sorted(processos, key=lambda x: x['cpu_percent'], reverse=True)[:10]
    
    # Ordena por RAM (descendente) e pega os top 10  
    processos_top_ram = sorted(processos, key=lambda x: x['ram_percent'], reverse=True)[:10]
    
    # Cria conjunto de PIDs para evitar duplicatas
    pids_top_cpu = {p['pid'] for p in processos_top_cpu}
    pids_top_ram = {p['pid'] for p in processos_top_ram}
    
    # Combina os processos e marca a qual grupo pertencem
    processos_finais = []
    
    # Adiciona processos do top CPU
    for proc in processos_top_cpu:
        proc_info = proc.copy()
        if proc['pid'] in pids_top_ram:
            proc_info['grupo'] = 'top_cpu_ram'  # Está nos dois tops
        else:
            proc_info['grupo'] = 'top_cpu'
        processos_finais.append(proc_info)
    
    # Adiciona processos do top RAM que não estão no top CPU
    for proc in processos_top_ram:
        if proc['pid'] not in pids_top_cpu:
            proc_info = proc.copy()
            proc_info['grupo'] = 'top_ram'
            processos_finais.append(proc_info)
    
    # Ordena o resultado final por CPU (descendente) e depois por RAM (descendente)
    processos_finais_ordenados = sorted(
        processos_finais, 
        key=lambda x: (x['cpu_percent'], x['ram_percent']), 
        reverse=True
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
        dict: Processos organizados por categoria (top_cpu, top_ram, top_ambos)
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

    # Top 10 por CPU
    top_cpu = sorted(processos, key=lambda x: x['cpu_percent'], reverse=True)[:10]
    
    # Top 10 por RAM
    top_ram = sorted(processos, key=lambda x: x['ram_percent'], reverse=True)[:10]
    
    # Processos que estão em ambos os tops
    pids_cpu = {p['pid'] for p in top_cpu}
    pids_ram = {p['pid'] for p in top_ram}
    pids_ambos = pids_cpu.intersection(pids_ram)
    
    top_ambos = [p for p in processos if p['pid'] in pids_ambos]
    top_ambos = sorted(top_ambos, key=lambda x: (x['cpu_percent'] + x['ram_percent']), reverse=True)
    
    # Processos exclusivos de cada categoria
    top_cpu_exclusivo = [p for p in top_cpu if p['pid'] not in pids_ram]
    top_ram_exclusivo = [p for p in top_ram if p['pid'] not in pids_cpu]
    
    return {
        'top_cpu': top_cpu_exclusivo,
        'top_ram': top_ram_exclusivo, 
        'top_ambos': top_ambos,
        'resumo': {
            'total_processos': len(processos),
            'processos_cpu': len(top_cpu_exclusivo),
            'processos_ram': len(top_ram_exclusivo),
            'processos_ambos': len(top_ambos)
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

def coletar_dados(nome_servidor="Servidor 1", separar_processos=False):
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
        'dados': [
            {
                'Momento': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'ram': ram_percentual,
                'cpu': cpu_percentual,
                'disco': disco_percentual,
                'download': velocidade_download,
                'upload': velocidade_upload,
                'ram_gb': memoria_usada_gb,
                'cpu_freq': cpu_freq,
                'disco_gb': disco_usado_gb,
                'tempoAtivo': tempo_ativo,
                'processos': processos
            }
        ]
    }
    
    return dados_estruturados

# Função para adicionar novos dados ao histórico existente
def adicionar_dados_ao_historico(dados_existentes, nome_servidor="Servidor 1", separar_processos=False):
    """
    Adiciona novos dados de monitoramento ao histórico existente
    
    Args:
        dados_existentes (dict): Estrutura de dados existente
        nome_servidor (str): Nome do servidor
        separar_processos (bool): Se True, retorna processos separados por categoria
    
    Returns:
        dict: Dados atualizados com nova coleta
    """
    novos_dados = coletar_dados(nome_servidor, separar_processos)
    
    if 'dados' not in dados_existentes:
        dados_existentes['dados'] = []
    
    # Adiciona os novos dados ao histórico
    dados_existentes['dados'].extend(novos_dados['dados'])
    
    return dados_existentes

# Exemplo de uso
if __name__ == "__main__":
    print("=== DADOS COLETADOS (PROCESSOS UNIFICADOS) ===")
    dados = coletar_dados("Meu Servidor")
    import json
    print(json.dumps(dados, indent=2, ensure_ascii=False))
    
    print("\n=== DADOS COLETADOS (PROCESSOS SEPARADOS) ===")
    dados_separados = coletar_dados("Meu Servidor", separar_processos=True)
    print(json.dumps(dados_separados, indent=2, ensure_ascii=False))
    
    # Exemplo de interpretação dos grupos de processos
    print("\n=== INTERPRETAÇÃO DOS GRUPOS ===")
    processos = dados['dados'][0]['processos']
    for proc in processos[:5]:  # Mostra apenas os 5 primeiros
        grupo = proc.get('grupo', 'indefinido')
        if grupo == 'top_cpu_ram':
            print(f"🔥 {proc['name']} (PID: {proc['pid']}) - Alto CPU E RAM")
        elif grupo == 'top_cpu':
            print(f"⚡ {proc['name']} (PID: {proc['pid']}) - Alto CPU apenas")
        elif grupo == 'top_ram':
            print(f"💾 {proc['name']} (PID: {proc['pid']}) - Alta RAM apenas")
    
    # Exemplo de coleta contínua (descomente para testar)
    # historico = {'servidor': 'Servidor Teste', 'dados': []}
    # for i in range(3):  # 3 coletas de exemplo
    #     print(f"\n--- Coleta {i+1} ---")
    #     historico = adicionar_dados_ao_historico(historico, "Servidor Teste", separar_processos=True)
    #     time.sleep(5)  # Aguarda 5 segundos entre coletas
    # 
    # print("\n=== HISTÓRICO COMPLETO ===")
    # print(json.dumps(historico, indent=2, ensure_ascii=False))