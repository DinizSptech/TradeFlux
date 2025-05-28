// --- Constantes Globais ---
const API_URL = "http://127.0.0.1:8080/api/csv";

// IDs dos elementos HTML
const ID_CORPO_TABELA_ALERTAS = "corpo-tabela-alertas";
const ID_CORPO_TABELA_DATACENTERS = "corpo-tabela-datacenters";
const ID_GRAFICO_DATACENTERS = "grafico"; // ID do div onde o gráfico será renderizado

// IDs dos elementos KPI
const ID_VALOR_ALERTAS_FORA_IDEAL = "valor-alertas";
const ID_VALOR_MEDIO_RESOLUCAO_TOTAL = "valor-medio-resolucao";

// Limite de tempo de resolução para alertas fora do ideal (5 minutos em segundos)
const LIMITE_CINCO_MINUTOS_EM_SEGUNDOS = 300; // 00:05:00


// --- Funções Auxiliares de Tempo ---

/**
 * Converte uma string de tempo (HH:MM:SS) em segundos.
 * @param {string} tempoString - O tempo no formato "HH:MM:SS".
 * @returns {number} O tempo total em segundos.
 */
function converterTempoParaSegundos(tempoString) {
    // Garante que tempoString é uma string e não está vazia/nula
    if (typeof tempoString !== 'string' || !tempoString) {
        return 0;
    }

    const partes = tempoString.split(":").map(Number);

    // Garante que haja pelo menos 3 partes (horas, minutos, segundos)
    // Isso cobre casos como "00:01" que não são HH:MM:SS completos
    if (partes.length < 3) {
        console.warn(`Formato de tempo inesperado: "${tempoString}". Esperado HH:MM:SS. Retornando 0 segundos.`);
        return 0;
    }

    // CORREÇÃO AQUI: Usar 'partes' (com 'e') para acessar os elementos do array
    return (partes[0] * 3600) + (partes[1] * 60) + partes[2];
}

/**
 * Converte um número de segundos em uma string de tempo (HH:MM:SS).
 * @param {number} totalSegundos - O tempo total em segundos.
 * @returns {string} O tempo formatado como "HH:MM:SS".
 */
function formatarSegundosParaTempo(totalSegundos) {
    // Garante que o valor não seja negativo
    if (totalSegundos < 0) totalSegundos = 0;

    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = Math.floor(totalSegundos % 60);

    // Adiciona zero à esquerda se o número for menor que 10
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

/**
 * Calcula a média de tempo de resolução a partir de uma lista de tempos.
 * @param {string[]} tempos - Um array de strings de tempo no formato "HH:MM:SS".
 * @returns {string} A média de tempo formatada como "HH:MM:SS".
 */
function calcularMediaTempo(tempos) {
    if (!tempos || tempos.length === 0) {
        return "00:00:00"; // Retorna tempo zero se não houver dados
    }

    const totalSegundos = tempos.reduce((total, tempo) => {
        return total + converterTempoParaSegundos(tempo);
    }, 0);

    // Evita divisão por zero
    const mediaSegundos = tempos.length > 0 ? totalSegundos / tempos.length : 0;
    return formatarSegundosParaTempo(mediaSegundos);
}

/**
 * Verifica se o tempo de resolução de um alerta ultrapassou um limite em segundos.
 * @param {string} tempoResolucao - O tempo de resolução do alerta no formato "HH:MM:SS".
 * @param {number} limiteSegundos - O limite de tempo em segundos.
 * @returns {boolean} True se o tempo de resolução ultrapassou o limite, False caso contrário.
 */
function ultrapassouLimiteTempo(tempoResolucao, limiteSegundos) {
    return converterTempoParaSegundos(tempoResolucao) > limiteSegundos;
}


// --- Funções de Manipulação do DOM ---

/**
 * Preenche uma tabela HTML com os dados fornecidos.
 * @param {string} idTabela - O ID do elemento `<tbody>` da tabela.
 * @param {Object[]} dados - Um array de objetos, onde cada objeto representa uma linha da tabela.
 * @param {string[]} chavesParaExibir - Um array de chaves dos objetos que devem ser exibidas na tabela.
 */
function preencherTabela(idTabela, dados, chavesParaExibir) {
    const corpoTabela = document.getElementById(idTabela);
    if (!corpoTabela) {
        console.error(`Erro: Elemento com ID '${idTabela}' não encontrado para preencher a tabela.`);
        return;
    }
    corpoTabela.innerHTML = ""; // Limpa a tabela antes de popular

    if (dados.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="${chavesParaExibir.length}" style="text-align: center;">Nenhum dado encontrado para esta tabela.</td></tr>`;
        return;
    }

    dados.forEach(item => {
        const linha = document.createElement("tr");
        chavesParaExibir.forEach(chave => {
            const celula = document.createElement("td");
            celula.textContent = item[chave];
            linha.appendChild(celula);
        });
        corpoTabela.appendChild(linha);
    });
}

/**
 * Atualiza um elemento HTML com o valor fornecido.
 * @param {string} elementId - O ID do elemento HTML a ser atualizado.
 * @param {string | number} value - O valor a ser exibido.
 */
function atualizarKPI(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    } else {
        console.warn(`Aviso: Elemento KPI com ID '${elementId}' não encontrado.`);
    }
}

/**
 * Gera um gráfico de barras agrupadas (lado a lado) no ApexCharts.
 * @param {string} elementId - O ID do elemento HTML onde o gráfico será renderizado.
 * @param {string[]} categories - As categorias (rótulos do eixo X).
 * @param {Array<Object>} seriesData - Os dados da série do gráfico. Ex: [{ name: 'Série 1', data: [10, 20] }, { name: 'Série 2', data: [5, 15] }]
 */
function gerarGraficoBarrasAgrupadas(elementId, categories, seriesData) {
    const chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error(`Erro: Elemento com ID '${elementId}' para o gráfico não encontrado.`);
        return;
    }

    // Destroi o gráfico existente se houver, para evitar duplicações
    if (chartElement.apexcharts) {
        chartElement.apexcharts.destroy();
    }

    const options = {
        series: seriesData,
        chart: {
            type: 'bar',
            height: 350, // Altura padrão do gráfico
            stacked: false, // Define que as barras serão lado a lado (agrupadas)
            toolbar: {
                show: false // Oculta a barra de ferramentas padrão do gráfico (zoom, download, etc.)
            },
            events: {
                rendered: function(chartContext, config) {
                    console.log("Gráfico de barras renderizado.");
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false, // Barras verticais
                columnWidth: '55%', // Largura das colunas (barras)
                endingShape: 'rounded' // Adiciona um leve arredondamento nas extremidades das barras
            },
        },
        dataLabels: {
            enabled: false // Desabilita os rótulos de dados sobre as barras
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'] // Borda transparente entre as barras para um visual mais limpo
        },
        xaxis: {
            categories: categories, // Rótulos para o eixo X (nomes dos Data Centers)
            title: {
                text: 'Data Centers' // Título do eixo X
            },
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Número de Alertas' // Título do eixo Y
            },
            labels: {
                formatter: function (val) {
                    return Math.floor(val); // Garante que o valor seja um número inteiro
                }
            }
        },
        fill: {
            opacity: 1 // Garante que as barras estejam totalmente preenchidas
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " alertas"; // Formata o valor no tooltip
                }
            }
        },
        colors: ['#28a745', '#dc3545'], // Cores para as séries: Verde (Total), Vermelho (Acima do Limite)
        legend: {
            position: 'top', // Posição da legenda
            horizontalAlign: 'right', // Alinhamento horizontal da legenda
            offsetX: -10 // Offset horizontal da legenda
        },
        responsive: [{
            breakpoint: 768, // Para telas menores que 768px
            options: {
                chart: {
                    height: 300 // Altura menor para o gráfico em dispositivos móveis
                },
                xaxis: {
                    labels: {
                        style: {
                            fontSize: '10px'
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center'
                }
            }
        }]
    };

    const chart = new ApexCharts(chartElement, options);
    chart.render();
}


// --- Função Principal de Carregamento de Dados e Atualização do Dashboard ---

/**
 * Busca dados do endpoint, calcula os KPIs, popula as tabelas e gera o gráfico.
 * Esta é a função principal que é chamada ao carregar a página.
 */
async function popularTabelasEGraficoEKPIs() {
    // 1. Define os valores iniciais dos KPIs para "Carregando..."
    atualizarKPI(ID_VALOR_ALERTAS_FORA_IDEAL, "Carregando...");
    atualizarKPI(ID_VALOR_MEDIO_RESOLUCAO_TOTAL, "Carregando...");

    try {
        // 2. Busca os dados do endpoint
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}. Verifique o servidor da API.`);
        }
        const dados = await response.json();

        // --- 3. Cálculos para KPIs e Dados do Gráfico ---
        let totalAlertasAcimaLimiteGeral = 0;
        const todosTemposDeResolucaoGeral = [];
        const dadosDataCentersParaProcessamento = {}; // Estrutura para agrupar dados por DC

        dados.forEach(alerta => {
            // Coleta dados para o KPI de média geral
            todosTemposDeResolucaoGeral.push(alerta.tempo_resolucao);

            // Coleta dados para o KPI de alertas fora do tempo ideal
            if (ultrapassouLimiteTempo(alerta.tempo_resolucao, LIMITE_CINCO_MINUTOS_EM_SEGUNDOS)) {
                totalAlertasAcimaLimiteGeral++;
            }

            // Agrupa dados para tabela de DC e gráfico
            if (!dadosDataCentersParaProcessamento[alerta.data_center]) {
                dadosDataCentersParaProcessamento[alerta.data_center] = {
                    temposResolucao: [],
                    totalAlertas: 0,
                    alertasAcimaDoLimite: 0
                };
            }
            dadosDataCentersParaProcessamento[alerta.data_center].temposResolucao.push(alerta.tempo_resolucao);
            dadosDataCentersParaProcessamento[alerta.data_center].totalAlertas++;

            if (ultrapassouLimiteTempo(alerta.tempo_resolucao, LIMITE_CINCO_MINUTOS_EM_SEGUNDOS)) {
                dadosDataCentersParaProcessamento[alerta.data_center].alertasAcimaDoLimite++;
            }
        });

        // --- 4. Atualizar KPIs no DOM ---
        const mediaTempoResolucaoGeral = calcularMediaTempo(todosTemposDeResolucaoGeral);
        atualizarKPI(ID_VALOR_ALERTAS_FORA_IDEAL, totalAlertasAcimaLimiteGeral);
        atualizarKPI(ID_VALOR_MEDIO_RESOLUCAO_TOTAL, mediaTempoResolucaoGeral);


        // --- 5. Popular a tabela de Top 5 Alertas com maior atraso ---
        const alertasOrdenados = [...dados].sort((a, b) => {
            const tempoA = converterTempoParaSegundos(a.tempo_resolucao);
            const tempoB = converterTempoParaSegundos(b.tempo_resolucao);
            return tempoB - tempoA; // Ordena de forma decrescente
        }).slice(0, 5); // Pega os 5 alertas com maior tempo de resolução

        preencherTabela(
            ID_CORPO_TABELA_ALERTAS,
            alertasOrdenados,
            ["data_center", "data_hora", "tempo_resolucao"]
        );

        // --- 6. Calcular e popular a tabela de Top 3 Piores Data Centers ---
        const mediasDataCenters = Object.keys(dadosDataCentersParaProcessamento).map(dataCenter => {
            const info = dadosDataCentersParaProcessamento[dataCenter];
            const mediaTempo = calcularMediaTempo(info.temposResolucao);
            return {
                dataCenter,
                mediaTempo,
                totalAlertas: info.totalAlertas, // Incluído para o gráfico
                alertasAcimaDoLimite: info.alertasAcimaDoLimite // Incluído para o gráfico
            };
        });

        // Ordenar por tempo médio de resolução (maior primeiro) e pegar os 3 piores
        const pioresDataCenters = mediasDataCenters.sort((a, b) => {
            const tempoA = converterTempoParaSegundos(a.mediaTempo);
            const tempoB = converterTempoParaSegundos(b.mediaTempo);
            return tempoB - tempoA;
        }).slice(0, 3);

        preencherTabela(
            ID_CORPO_TABELA_DATACENTERS,
            pioresDataCenters,
            ["dataCenter", "mediaTempo"]
        );

        // --- 7. Gerar o Gráfico de Barras Duplas (Lado a Lado) ---
        const categoriasGrafico = pioresDataCenters.map(dc => dc.dataCenter);
        const serieTotalAlertas = pioresDataCenters.map(dc => dc.totalAlertas);
        const serieAlertasAcimaLimite = pioresDataCenters.map(dc => dc.alertasAcimaDoLimite);

        const seriesGrafico = [
            {
                name: 'Total de Alertas',
                data: serieTotalAlertas
            },
            {
                name: 'Alertas > 5min',
                data: serieAlertasAcimaLimite
            }
        ];

        gerarGraficoBarrasAgrupadas(ID_GRAFICO_DATACENTERS, categoriasGrafico, seriesGrafico);

    } catch (error) {
        // --- 8. Tratamento de Erros ---
        console.error("Erro fatal ao carregar o dashboard:", error);

        // Atualiza os KPIs com mensagens de erro
        atualizarKPI(ID_VALOR_ALERTAS_FORA_IDEAL, "Erro");
        atualizarKPI(ID_VALOR_MEDIO_RESOLUCAO_TOTAL, "Erro");

        // Limpa e mostra mensagem de erro nas tabelas
        // Usa preencherTabela com array vazio para mostrar "Nenhum dado encontrado" por padrão
        preencherTabela(ID_CORPO_TABELA_ALERTAS, [], [""]);
        // E adiciona uma mensagem de erro mais específica se necessário
        document.getElementById(ID_CORPO_TABELA_ALERTAS).innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Falha ao carregar alertas.</td></tr>';

        preencherTabela(ID_CORPO_TABELA_DATACENTERS, [], [""]);
        document.getElementById(ID_CORPO_TABELA_DATACENTERS).innerHTML = '<tr><td colspan="2" style="text-align: center; color: red;">Falha ao carregar Data Centers.</td></tr>';

        // Mostra mensagem de erro no div do gráfico
        const graficoDiv = document.getElementById(ID_GRAFICO_DATACENTERS);
        if (graficoDiv) {
            graficoDiv.innerHTML = '<p style="text-align: center; color: red; padding-top: 50px;">Não foi possível carregar o gráfico. Verifique a conexão com a API.</p>';
        }
    }
}

// --- Event Listener para Carregar o Dashboard ---
// Garante que o script será executado somente após o DOM estar completamente carregado.
document.addEventListener("DOMContentLoaded", popularTabelasEGraficoEKPIs);

// --- Funções de Filtro de Tempo (Placeholders - Lógica a ser implementada) ---
// Estas funções são chamadas pelos botões de filtro no seu HTML.
// Você precisará adicionar a lógica para filtrar os dados aqui,
// seja chamando uma API diferente ou filtrando os dados já obtidos.

async function obterMaioresAlertas24h() {
    // Adicione a lógica para filtrar os dados para as últimas 24 horas.
    // Ex: Você pode chamar uma nova API com um parâmetro de tempo,
    // ou filtrar a lista 'dados' (se todos os dados forem sempre carregados).
    console.log("Botão 'Últimas 24 horas' clicado.");
    // Exemplo: popularTabelasEGraficoEKPIs('24h');
    alert("Função 'obterMaioresAlertas24h' ainda precisa ser implementada com a lógica de filtro.");
    // Aqui você pode adicionar lógica para adicionar a classe 'ativo' no botão clicado
    document.querySelectorAll('.botoes-filtro .botao-filtro').forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');
}

async function obterMaioresAlertas7d() {
    console.log("Botão 'Últimos 7 dias' clicado.");
    alert("Função 'obterMaioresAlertas7d' ainda precisa ser implementada com a lógica de filtro.");
    document.querySelectorAll('.botoes-filtro .botao-filtro').forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');
}

async function obterMaioresAlertas30d() {
    console.log("Botão 'Últimos 30 dias' clicado.");
    alert("Função 'obterMaioresAlertas30d' ainda precisa ser implementada com a lógica de filtro.");
    document.querySelectorAll('.botoes-filtro .botao-filtro').forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');
}

// --- Funções da Barra Lateral e Modal (Manter suas implementações existentes) ---
// Caso essas funções (mudarIcone, abrirModal, carregarMenuLateral) estejam em
// '../js/barra_lateral.js', você não precisa incluí-las aqui.
// O "defer" nos scripts HTML garante que eles serão carregados na ordem correta.

/* Exemplo (se estivessem aqui):
function mudarIcone() {
    console.log("Ícone do menu clicado.");
    // Lógica da barra lateral
}

function abrirModal(modalId) {
    console.log(`Abrir modal: ${modalId}`);
    // Lógica do modal
}

// O onload no body está obsoleto, é melhor usar DOMContentLoaded como acima
// function carregarMenuLateral() {
//     console.log("Carregando menu lateral.");
//     // Lógica de carregamento do menu lateral
// }
*/