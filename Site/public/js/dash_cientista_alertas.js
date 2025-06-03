var dadosCalendario = [];
var dadosComponentes = [];
var dadosServidores = [];
var dadosTotaisAlertas = [];
var dadosCalendario = [];
var dadosStatus = [];
var tipoAlertaAtual = 'atencao';

// Função para inicializar a dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos dos botões
    document.getElementById('abaAlertasAtencao').addEventListener('click', function() {
        definirAbaAtiva(this);
        document.getElementById('legendaAlertasAtencao').style.display = 'flex';
        document.getElementById('legendaAlertasCriticos').style.display = 'none';
        tipoAlertaAtual = 'atencao';
        renderizarCalendario();
    });
    
    document.getElementById('abaAlertasCriticos').addEventListener('click', function() {
        definirAbaAtiva(this);
        document.getElementById('legendaAlertasAtencao').style.display = 'none';
        document.getElementById('legendaAlertasCriticos').style.display = 'flex';
        tipoAlertaAtual = 'critico';
        renderizarCalendario();
    });
    
    // Carregar todos os dados
    carregarDadosDashboard();
});

// Função principal para carregar todos os dados
function carregarDadosDashboard() {
    Promise.all([
        buscarDadosCalendario(),
        buscarDadosComponentes(),
        buscarDadosServidores(),
        buscarDadosTotaisAlerta(),
        buscarDadosStatusServidor(),
        
    ])
    .then(() => {
        renderizarCalendario();
        renderizarGraficoComponentes();
        renderizarGraficoServidores();
        renderizarKPIsTotais();
        atualizarKpiCorrelacao()
    })
    .catch(erro => {
        console.error('Erro ao carregar dados da dashboard:', erro);
    });
}

function buscarDadosStatusServidor(){
    var idDataCenter = sessionStorage.getItem('DataCenter')
    return fetch(`/alertas/getStatusServidores/${idDataCenter}`, {
        method: 'GET'
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao buscar dados de status de servidor.')
        }
    })
    .then((registros) => {
        console.log("Dados do calendário recebidos:", registros);
        dadosStatus = renderizarDadosStatusServidor(registros);
    })
    .catch((erro) => {
        console.error('Erro ao buscar dados do calendário:', erro);
        throw erro;
    });
}
// Fetch para dados do calendário
function buscarDadosCalendario() {
    var idDataCenter = sessionStorage.getItem('DataCenter')
    return fetch(`/alertas/getAlertasCalendario/${idDataCenter}`, {
        method: 'GET',
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao buscar dados do calendário.');
        }
    })
    .then((registros) => {
        console.log("Dados do calendário recebidos:", registros);
        dadosCalendario = processarDadosCalendario(registros);
    })
    .catch((erro) => {
        console.error('Erro ao buscar dados do calendário:', erro);
        throw erro;
    });
}
function buscarDadosTotaisAlerta() {
    var idDataCenter = sessionStorage.getItem('DataCenter')
    return fetch(`/alertas/getTotalAlertas/${idDataCenter}`, {
        method: 'GET',
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao buscar quantidade de alertas.');
        }
    })
    .then((registros) => {
        console.log("Dados de quantidade de alertas:", registros);
        dadosTotaisAlertas = registros;
        kpi_alerta_atencao.innerHTML = dadosTotaisAlertas[0].alertas_atencao
        kpi_alerta_critico.innerHTML = dadosTotaisAlertas[0].alertas_criticos
        console.log(dadosTotaisAlertas)
    })
    .catch((erro) => {
        console.error('Erro ao buscar dados de quantidade de alertas:', erro);
        throw erro;
    });
}

// Fetch para dados dos componentes
function buscarDadosComponentes() {
    var idDataCenter = sessionStorage.getItem('DataCenter')
    return fetch(`/alertas/getQtdAlertasComponente/${idDataCenter}`, {
        method: 'GET',
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao buscar dados dos componentes.');
        }
    })
    .then((registros) => {
        console.log("Dados dos componentes recebidos:", registros);
        dadosComponentes = registros;
        renderizarGraficoComponentes(dadosComponentes)
    })
    .catch((erro) => {
        console.error('Erro ao buscar dados dos componentes:', erro);
        throw erro;
    });
}

// Fetch para dados dos servidores
function buscarDadosServidores() {
    var idDataCenter = sessionStorage.getItem('DataCenter')
    return fetch(`/alertas/getTopServidoresAlertas/${idDataCenter}`, {
        method: 'GET',
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao buscar dados dos servidores.');
        }
    })
    .then((registros) => {
        console.log("Dados dos servidores recebidos:", registros);
        dadosServidores = registros;
        renderizarGraficoServidores(dadosServidores)
    })
    .catch((erro) => {
        console.error('Erro ao buscar dados dos servidores:', erro);
        throw erro;
    });
}

// Função para processar dados do calendário
function processarDadosCalendario(dadosDB) {
    const hoje = new Date();
    const diasAtras30 = new Date();
    diasAtras30.setDate(hoje.getDate() - 29);
    
    // Criar array com todos os dias dos últimos 30 dias
    const datas = [];
    const dataAtual = new Date(diasAtras30);
    
    while (dataAtual <= hoje) {
        datas.push({
            data: formatarDataSQL(dataAtual),
            displayData: formatarDataExibicao(dataAtual),
            diaDaSemana: dataAtual.getDay(),
            alertasAtencao: 0,
            alertasCriticos: 0,
            total: 0
        });
        dataAtual.setDate(dataAtual.getDate() + 1);
    }
    
    // Preencher dados do banco
    dadosDB.forEach(registro => {
        const dataFormatada = formatarDataSQL(new Date(registro.data_alerta));
        const dataIndex = datas.findIndex(d => d.data === dataFormatada);
        
        if (dataIndex >= 0) {
            datas[dataIndex].alertasAtencao = parseInt(registro.alertas_atencao) || 0;
            datas[dataIndex].alertasCriticos = parseInt(registro.alertas_criticos) || 0;
            datas[dataIndex].total = parseInt(registro.total_alertas) || 0;
        }
    });
    
    return datas;
}

// Funções auxiliares para formatação de data
function formatarDataSQL(data) {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

function formatarDataExibicao(data) {
    return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
}

// Funções para cores dos alertas
function obterCorAlertaAtencao(valor) {
    if (valor === 0) return '#91cc75';
    if (valor <= 2) return '#ffe066';
    if (valor <= 5) return '#ffc145';
    return '#ffa10a';
}

function obterCorAlertaCritico(valor) {
    if (valor === 0) return '#91cc75';
    if (valor <= 2) return '#ff9e80';
    if (valor <= 5) return '#ff6e40';
    return '#ff3d00';
}

// Função para definir aba ativa
function definirAbaAtiva(botaoAba) {
    document.querySelectorAll('.botaoTipoAlerta').forEach(function(botao) {
        botao.classList.remove('ativo');
    });
    botaoAba.classList.add('ativo');
}

// Função para renderizar o calendário
function renderizarCalendario() {
    if (dadosCalendario.length === 0) return;
    
    const painelCalendario = document.getElementById('calendarioAlertas');
    let htmlCalendario = '';
    
    const semanas = [];
    let semanaAtual = [];
    
    for (let i = 0; i < dadosCalendario.length; i++) {
        semanaAtual.push(dadosCalendario[i]);
        
        if (dadosCalendario[i].diaDaSemana === 6 || i === dadosCalendario.length - 1) {
            if (semanaAtual[0].diaDaSemana !== 0) {
                const diasVazios = semanaAtual[0].diaDaSemana;
                for (let e = 0; e < diasVazios; e++) {
                    semanaAtual.unshift(null);
                }
            }
            
            if (semanaAtual[semanaAtual.length - 1] && semanaAtual[semanaAtual.length - 1].diaDaSemana !== 6) {
                const diasVazios = 6 - semanaAtual[semanaAtual.length - 1].diaDaSemana;
                for (let e = 0; e < diasVazios; e++) {
                    semanaAtual.push(null);
                }
            }
            
            semanas.push([...semanaAtual]);
            semanaAtual = [];
        }
    }
    
    // Renderizar semanas
    semanas.forEach(semana => {
        htmlCalendario += '<div class="linhaCalendario">';
        
        semana.forEach(dia => {
            if (dia) {
                const valorAlerta = tipoAlertaAtual === 'atencao' ? dia.alertasAtencao : dia.alertasCriticos;
                const corAlerta = tipoAlertaAtual === 'atencao' ? 
                    obterCorAlertaAtencao(valorAlerta) : obterCorAlertaCritico(valorAlerta);
                
                htmlCalendario += `
                    <div class="celulaCalendario" 
                        style="background-color: ${corAlerta};" 
                        data-data="${dia.displayData}"
                        data-atencao="${dia.alertasAtencao}"
                        data-critico="${dia.alertasCriticos}"
                        data-total="${dia.total}"
                        onmouseover="mostrarBalaoInfo(event, this.dataset)"
                        onmouseout="ocultarBalaoInfo()">
                        <div class="numeroDiaCelula">${dia.displayData}</div>
                        ${valorAlerta}
                    </div>
                `;
            } else {
                htmlCalendario += '<div class="celulaCalendario" style="background-color: #f4f6fa;"></div>';
            }
        });
        
        htmlCalendario += '</div>';
    });
    
    painelCalendario.innerHTML = htmlCalendario;
}

// Funções para tooltip
function mostrarBalaoInfo(evento, dadosDia) {
    const balaoInfo = document.getElementById('balaoInfoAlertas');
    balaoInfo.style.display = 'block';
    
    balaoInfo.style.left = (evento.pageX + 1) + 'px';
    balaoInfo.style.top = (evento.pageY + 1) + 'px';
    
    balaoInfo.querySelector('.tituloBalaoInfo').textContent = `Data: ${dadosDia.data}`;
    balaoInfo.querySelectorAll('.valorAlertaBalao')[0].textContent = dadosDia.atencao;
    balaoInfo.querySelectorAll('.valorAlertaBalao')[1].textContent = dadosDia.critico;
    balaoInfo.querySelectorAll('.valorAlertaBalao')[2].textContent = dadosDia.total;
}

function ocultarBalaoInfo() {
    const balaoInfo = document.getElementById('balaoInfoAlertas');
    balaoInfo.style.display = 'none';
}

// Variável global para o gráfico de componentes
let grafico_alertas;

// Função para renderizar gráfico de componentes
function renderizarGraficoComponentes(dadosDB) {
    if (dadosComponentes.length === 0) return;
    
    const categorias = dadosComponentes.map(item => item.componente);
    const alertasAtencao = dadosComponentes.map(item => parseInt(item.alertas_atencao) || 0);
    const alertasCriticos = dadosComponentes.map(item => parseInt(item.alertas_criticos) || 0);
    
    const opcoes_grafico = {
        chart: {
            type: 'bar',
            background: 'transparent',
            height: "100%",
            width: "100%"
        },
        legend: {
            position: 'bottom',
            offsetY: 0,
            labels: {
                colors: '#2b2b2b'
            }
        },
        colors: ['#ffe066', '#ff7373'],
        title: {
            text: ["Proporção dos componentes nos", "alertas dos últimos 30 dias"],
            align: 'center',
            style: {
                color: '#2b2b2b',
                fontSize: '16px'
            }
        },
        series: [
            { name: 'Alertas em Atenção', data: alertasAtencao },
            { name: 'Alertas Críticos', data: alertasCriticos }
        ],
        xaxis: {
            categories: categorias,
            labels: {
                style: { colors: '#2b2b2b' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#2b2b2b' }
            }
        },
        grid: {
            borderColor: '#e9edf5'
        },
        dataLabels: {
            style: {
                colors: ['#ffffff']
            }
        }
    };
    
    // Destruir gráfico anterior se existir
    if (grafico_alertas) {
        grafico_alertas.destroy();
    }
    
    grafico_alertas = new ApexCharts(document.querySelector("#grafico_alertas"), opcoes_grafico);
    grafico_alertas.render();
}

// Variável global para o gráfico de servidores
let grafico_servidores;

// Função para renderizar gráfico de servidores
function renderizarGraficoServidores(dadosDB) {
    if (dadosServidores.length === 0) return;
    
    const nomes = dadosServidores.map(item => item.nome_servidor);
    const alertasCriticos = dadosServidores.map(item => parseInt(item.qtd_alertas_atencao) || 0);
    
    const opcoes_servidores = {
        chart: {
            type: 'bar',
            background: 'transparent',
            height: "100%",
            width: "100%"
        },
        colors: ['#8fa2eb'],
        title: {
            text: ['5 Servidores com Mais Alertas', 'Críticos nos Últimos 30 Dias'],
            align: 'center',
            style: {
                color: '#2b2b2b',
                fontSize: '16px'
            }
        },
        series: [
            { name: 'Alertas Críticos', data: alertasCriticos }
        ],
        xaxis: {
            categories: nomes,
            labels: {
                style: { colors: '#2b2b2b' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#2b2b2b' }
            }
        },
        grid: {
            borderColor: '#e9edf5'
        },
        dataLabels: {
            style: {
                colors: ['#ffffff']
            }
        }
    };
    
    // Destruir gráfico anterior se existir
    if (grafico_servidores) {
        grafico_servidores.destroy();
    }
    
    grafico_servidores = new ApexCharts(document.getElementById("grafico_servidores"), opcoes_servidores);
    grafico_servidores.render();
}

function renderizarKPIsTotais(){
    if(dadosTotaisAlertas == 0) return;
    kpi_alertas_atencao = document.getElementById('kpi_alerta_atencao')
    kpi_alertas_criticos = document.getElementById('kpi_alerta_critico')
    kpi_alerta_atencao.innerHTML = dadosTotaisAlertas[0].alertas_atencao
    kpi_alerta_critico.innerHTML = dadosTotaisAlertas[0].alertas_criticos
}

function renderizarDadosStatusServidor(dadosDB){
     td_status_critico.innerHTML = dadosDB[0].critico
     td_status_atencao.innerHTML = dadosDB[0].atencao
     td_status_estavel.innerHTML = dadosDB[0].estavel
}

async function atualizarKpiCorrelacao() {
    var idDataCenter = sessionStorage.getItem('DataCenter')
    try {
        const crawlerRes = await fetch('https://mqibct72j7jei56f2nv6r7pyea0tvxne.lambda-url.us-east-1.on.aws/');
        if (!crawlerRes.ok) throw new Error('Erro ao acionar o crawler.');

        await new Promise(resolve => setTimeout(resolve, 0));

        const correlacaoRes = await fetch(`/alertas/getCorrelacao/${idDataCenter}`);
        if (!correlacaoRes.ok) throw new Error('Erro ao buscar correlação.');

        const dados = await correlacaoRes.json();

        if (dados && dados.variavel && dados.correlacao !== undefined) {
            document.getElementById('tituloCorrelacao').innerHTML = 
                `A maior correlação com números de negociações foi com os dados de ${dados.variavel}`;
            document.getElementById('kpi_valor_correlacao').innerHTML = dados.correlacao;
        }

    } catch (err) {
        console.error('Erro ao atualizar KPI de correlação:', err.message);
    }
}



function atualizarDashboard() {
    carregarDadosDashboard();
}
