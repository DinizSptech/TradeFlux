// // Função para gerar dados dinâmicos de alertas para os últimos 30 dias
// function gerarAlertasDinamicos() {
//     const alertas = [];
//     const hoje = new Date();
//     const tiposMedida = ['CPU', 'Memória', 'Disco', 'Rede'];
//     let id = 1;
    
//     // Gerar alertas para os últimos 30 dias (incluindo hoje)
//     for (let diasAtras = 29; diasAtras >= 0; diasAtras--) {
//         const dataAlerta = new Date(hoje);
//         dataAlerta.setDate(hoje.getDate() - diasAtras);
//         const dataFormatada = formatarDataSQL(dataAlerta);
        
//         // Gerar quantidade aleatória de alertas por dia (0 a 8 alertas)
//         const quantidadeAlertas = Math.floor(Math.random() * 9);
        
//         for (let i = 0; i < quantidadeAlertas; i++) {
//             // Selecionar tipo de medida aleatório
//             const medida = tiposMedida[Math.floor(Math.random() * tiposMedida.length)];
            
//             // Gerar valor baseado no tipo de medida
//             let valor;
//             let criticidade;
            
//             switch (medida) {
//                 case 'CPU':
//                     valor = Math.round((Math.random() * 40 + 60) * 10) / 10; // 60-100%
//                     criticidade = valor > 90 ? 1 : 0;
//                     break;
//                 case 'Memória':
//                     valor = Math.round((Math.random() * 30 + 70) * 10) / 10; // 70-100%
//                     criticidade = valor > 95 ? 1 : 0;
//                     break;
//                 case 'Disco':
//                     valor = Math.round((Math.random() * 25 + 75) * 10) / 10; // 75-100%
//                     criticidade = valor > 95 ? 1 : 0;
//                     break;
//                 case 'Rede':
//                     valor = Math.round((Math.random() * 35 + 65) * 10) / 10; // 65-100%
//                     criticidade = valor > 92 ? 1 : 0;
//                     break;
//             }
            
//             // Adicionar alguma aleatoriedade extra à criticidade
//             if (criticidade === 0 && Math.random() < 0.1) {
//                 criticidade = 1; // 10% de chance de ser crítico mesmo com valor menor
//             }
            
//             alertas.push({
//                 id: id++,
//                 data: dataFormatada,
//                 valor: valor,
//                 medida: medida,
//                 criticidade: criticidade
//             });
//         }
//     }
    
//     return alertas;
// }

// // Função auxiliar para formatar data (reutilizada do código original)
// function formatarDataSQL(data) {
//     return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
// }

// // Substituir os dados mocados por dados dinâmicos
// const alertasDoDatabase = gerarAlertasDinamicos();

// // Resto do código permanece o mesmo...
// // Função para processar os dados do banco
// function processarDadosDoBanco(dadosDB) {
//     const hoje = new Date();
//     const diasAtras30 = new Date();
//     diasAtras30.setDate(hoje.getDate() - 29); // 29 dias atrás + hoje = 30 dias
    
//     // Obter intervalo de 30 dias para o calendário
//     const datas = [];
//     const dataAtual = new Date(diasAtras30);
    
//     while (dataAtual <= hoje) {
//         datas.push({
//             data: formatarDataSQL(dataAtual),
//             displayData: formatarDataExibicao(dataAtual),
//             diaDaSemana: dataAtual.getDay(),
//             alertasAtencao: 0,
//             alertasCriticos: 0,
//             total: 0
//         });
//         dataAtual.setDate(dataAtual.getDate() + 1);
//     }
    
//     // Preencher contagem de alertas para cada dia
//     dadosDB.forEach(alerta => {
//         const dataIndex = datas.findIndex(d => d.data === alerta.data);
//         if (dataIndex >= 0) {
//             if (alerta.criticidade === 0) {
//                 datas[dataIndex].alertasAtencao++;
//             } else {
//                 datas[dataIndex].alertasCriticos++;
//             }
//             datas[dataIndex].total++;
//         }
//     });
    
//     return datas;
// }

// function formatarDataExibicao(data) {
//     return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
// }

// function obterCorAlertaAtencao(valor) {
//     if (valor === 0) return '#91cc75';
//     if (valor <= 2) return '#ffe066';
//     if (valor <= 5) return '#ffc145';
//     return '#ffa10a';
// }

// function obterCorAlertaCritico(valor) {
//     if (valor === 0) return '#91cc75';
//     if (valor <= 2) return '#ff9e80';
//     if (valor <= 5) return '#ff6e40';
//     return '#ff3d00';
// }

// let tipoAlertaAtual = 'atencao';

// const dadosProcessados = processarDadosDoBanco(alertasDoDatabase);

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('abaAlertasAtencao').addEventListener('click', function() {
//         definirAbaAtiva(this);
//         document.getElementById('legendaAlertasAtencao').style.display = 'flex';
//         document.getElementById('legendaAlertasCriticos').style.display = 'none';
//         tipoAlertaAtual = 'atencao';
//         renderizarCalendario();
//     });
    
//     document.getElementById('abaAlertasCriticos').addEventListener('click', function() {
//         definirAbaAtiva(this);
//         document.getElementById('legendaAlertasAtencao').style.display = 'none';
//         document.getElementById('legendaAlertasCriticos').style.display = 'flex';
//         tipoAlertaAtual = 'critico';
//         renderizarCalendario();
//     });
    
//     renderizarCalendario();
// });

// function definirAbaAtiva(botaoAba) {
//     document.querySelectorAll('.botaoTipoAlerta').forEach(function(botao) {
//         botao.classList.remove('ativo');
//     });
//     botaoAba.classList.add('ativo');
// }

// function renderizarCalendario() {
//     const painelCalendario = document.getElementById('calendarioAlertas');
//     let htmlCalendario = '';
    
//     const semanas = [];
//     let semanaAtual = [];
    
//     for (let i = 0; i < dadosProcessados.length; i++) {
//         semanaAtual.push(dadosProcessados[i]);
        
//         if (dadosProcessados[i].diaDaSemana === 6 || i === dadosProcessados.length - 1) {
//             if (semanaAtual[0].diaDaSemana !== 0) {
//                 const diasVazios = semanaAtual[0].diaDaSemana;
//                 for (let e = 0; e < diasVazios; e++) {
//                     semanaAtual.unshift(null);
//                 }
//             }
            
//             if (semanaAtual[semanaAtual.length - 1] && semanaAtual[semanaAtual.length - 1].diaDaSemana !== 6) {
//                 const diasVazios = 6 - semanaAtual[semanaAtual.length - 1].diaDaSemana;
//                 for (e = 0; e < diasVazios; e++) {
//                     semanaAtual.push(null);
//                 }
//             }
            
//             semanas.push([...semanaAtual]);
//             semanaAtual = [];
//         }
//     }
    
//     // Renderizar semanas usando innerHTML
//     semanas.forEach(semana => {
//         htmlCalendario += '<div class="linhaCalendario">';
        
//         semana.forEach(dia => {
//             if (dia) {
//                 // Definir a cor e o valor da célula com base no modo atual
//                 const valorAlerta = tipoAlertaAtual === 'atencao' ? dia.alertasAtencao : dia.alertasCriticos;
//                 const corAlerta = tipoAlertaAtual === 'atencao' ? 
//                     obterCorAlertaAtencao(valorAlerta) : obterCorAlertaCritico(valorAlerta);
                
//                 // Criar a célula usando template string
//                 htmlCalendario += `
//                     <div class="celulaCalendario" 
//                         style="background-color: ${corAlerta};" 
//                         data-data="${dia.displayData}"
//                         data-atencao="${dia.alertasAtencao}"
//                         data-critico="${dia.alertasCriticos}"
//                         data-total="${dia.total}"
//                         onmouseover="mostrarBalaoInfo(event, this.dataset)"
//                         onmouseout="ocultarBalaoInfo()">
//                         <div class="numeroDiaCelula">${dia.displayData}</div>
//                         ${valorAlerta}
//                     </div>
//                 `;
//             } else {
//                 htmlCalendario += '<div class="celulaCalendario" style="background-color: #f4f6fa;"></div>';
//             }
//         });
        
//         htmlCalendario += '</div>';
//     });
    
//     // Atualizar o HTML do calendário
//     painelCalendario.innerHTML = htmlCalendario;
// }

// // Funções para controle do tooltip personalizado
// function mostrarBalaoInfo(evento, dadosDia) {
//     const balaoInfo = document.getElementById('balaoInfoAlertas');
//     balaoInfo.style.display = 'block';
    
//     // Posicionar o balão
//     balaoInfo.style.left = (evento.pageX + 1) + 'px';
//     balaoInfo.style.top = (evento.pageY + 1) + 'px';
    
//     // Preencher dados
//     balaoInfo.querySelector('.tituloBalaoInfo').textContent = `Data: ${dadosDia.data}`;
//     balaoInfo.querySelectorAll('.valorAlertaBalao')[0].textContent = dadosDia.atencao;
//     balaoInfo.querySelectorAll('.valorAlertaBalao')[1].textContent = dadosDia.critico;
//     balaoInfo.querySelectorAll('.valorAlertaBalao')[2].textContent = dadosDia.total;
// }

// function ocultarBalaoInfo() {
//     const balaoInfo = document.getElementById('balaoInfoAlertas');
//     balaoInfo.style.display = 'none';
// }

// var opcoes_grafico = {
//     chart: {
//         type: 'bar',
//         background: 'transparent',
//         height: "100%",
//         width: "100%"
//     },
//     legend:{
//         position: 'bottom',
//         offsetY: -16,
//         labels:{
//             colors: '#2b2b2b'
//         }
//     },
//     colors: ['#ffe066', '#ff7373'],
//     title: {
//         text: ["Proporção dos componentes nos","alertas dos últimos 30 dias"],
//         align: 'center',
//         style: {
//             color: '#2b2b2b',
//             fontSize: '16px'
//         }
//     },
//     series: [
//         { name: 'Alertas em Atenção', data: [5, 2, 1, 7, 9] },
//         { name: 'Alertas Críticos', data: [7, 5, 9, 2, 1] }
//     ],
//     xaxis: {
//         categories: ['CPU(%)', 'RAM(%)', 'DISCO(%)', 'Upload\nna rede', 'Download\nna rede'],
//         labels: {
//             style: { colors: '#2b2b2b' }
//         }
//     },
//     yaxis: {
//         labels: {
//             style: { colors: '#2b2b2b' }
//         }
//     },
//     grid: {
//         borderColor: '#e9edf5'
//     },
//     dataLabels: {
//         style: {
//             colors: ['#ffffff']
//         }
//     }
// };

// var grafico_alertas = new ApexCharts(document.querySelector("#grafico_alertas"), opcoes_grafico);
// grafico_alertas.render();

// var opcoes_servidores = {
//     chart: {
//         type: 'bar',
//         background: 'transparent',
//         height: "100%",
//         width: "100%"
//     },
//     colors: ['#8fa2eb'],
//     title: {
//         text: ['5 Servidores com Mais Alertas','Críticos nos Últimos 30 Dias'],
//         align: 'center',
//         style: {
//             color: '#2b2b2b',
//             fontSize: '16px'
//         }
//     },
//     series: [
//         { name: 'Alertas Críticos', data: [5, 2, 1, 7, 9] }
//     ],
//     xaxis: {
//         categories: ['Servidor A', 'Servidor B', 'Servidor C', 'Servidor D', 'Servidor E'],
//         labels: {
//             style: { colors: '#2b2b2b' }
//         }
//     },
//     yaxis: {
//         labels: {
//             style: { colors: '#2b2b2b' }
//         }
//     },
//     grid: {
//         borderColor: '#e9edf5'
//     },
//     dataLabels: {
//         style: {
//             colors: ['#ffffff']
//         }
//     }
// };

// var grafico_servidores = new ApexCharts(document.getElementById("grafico_servidores"), opcoes_servidores);
// grafico_servidores.render();

// Variáveis globais
let dadosCalendario = [];
let dadosComponentes = [];
let dadosServidores = [];
let tipoAlertaAtual = 'atencao';

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
        buscarDadosServidores()
    ])
    .then(() => {
        renderizarCalendario();
        renderizarGraficoComponentes();
        renderizarGraficoServidores();
    })
    .catch(erro => {
        console.error('Erro ao carregar dados da dashboard:', erro);
    });
}

// Fetch para dados do calendário
function buscarDadosCalendario() {
    return fetch('/dashboard/calendario-alertas', {
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

// Fetch para dados dos componentes
function buscarDadosComponentes() {
    return fetch('/dashboard/componentes-alertas', {
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
    })
    .catch((erro) => {
        console.error('Erro ao buscar dados dos componentes:', erro);
        throw erro;
    });
}

// Fetch para dados dos servidores
function buscarDadosServidores() {
    return fetch('/dashboard/servidores-criticos', {
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
function renderizarGraficoComponentes() {
    if (dadosComponentes.length === 0) return;
    
    const categorias = dadosComponentes.map(item => item.componente_nome);
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
            offsetY: -16,
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
function renderizarGraficoServidores() {
    if (dadosServidores.length === 0) return;
    
    const nomes = dadosServidores.map(item => item.servidor_nome);
    const alertasCriticos = dadosServidores.map(item => parseInt(item.alertas_criticos) || 0);
    
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

// Função para atualizar toda a dashboard (pode ser chamada periodicamente)
function atualizarDashboard() {
    carregarDadosDashboard();
}

// Opcional: Atualizar dashboard a cada 5 minutos
// setInterval(atualizarDashboard, 300000);