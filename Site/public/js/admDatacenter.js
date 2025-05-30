// Variável global para armazenar a instância do gráfico
let graficoInstance = null;

// Funções genéricas para reutilização
function atualizarCorAlerta(valor) {
    const elem = document.getElementById("valor-alertas");
    if (valor >= 3) {
        elem.style.color = "red";
    } else if (valor === 2) {
        elem.style.color = "orange";
    } else {
        elem.style.color = "";
    }
}

function fazerRequisicao(url, callback) {
    fetch(url, { method: "GET" })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Erro na requisição: " + response.status);
        })
        .then(json => callback(json))
        .catch(error => console.error("Erro no fetch:", error));
}

function obterDadosPeriodo(periodo) {
    // Atualiza KPIs
    fazerRequisicao(`/adm/alertas/${periodo}`, json => {
        document.getElementById("valor-alertas").innerHTML = json[0].total_alertas;
        atualizarCorAlerta(parseInt(json[0].qtd_alertas, 10));
    });

    fazerRequisicao(`/adm/tempo-medio/${periodo}`, json => {
        document.getElementById("valor-medio-resolucao").innerHTML = json[0][`tempo_medio`];
    });

    // Atualiza tabelas
    fazerRequisicao(`/adm/alertas-maior-atraso/${periodo}`, atualizarTabelaAlertas);
    fazerRequisicao(`/adm/datacenter/media-resolucao/${periodo}`, atualizarTabelaDatacenters);

    // Atualiza gráfico
    let dadosTotalAlertas = null;
    let dadosAlertasAtrasados = null;

    function verificarEAtualizarGrafico() {
        if (dadosTotalAlertas && dadosAlertasAtrasados) {
            atualizarGraficoBarrasDuplas(dadosTotalAlertas, dadosAlertasAtrasados);
        }
    }

    fazerRequisicao(`/adm/datacenter/total-alertas/${periodo}`, json => {
        dadosTotalAlertas = json;
        verificarEAtualizarGrafico();
    });

    fazerRequisicao(`/adm/datacenter/alertas-atrasados/${periodo}`, json => {
        dadosAlertasAtrasados = json;
        verificarEAtualizarGrafico();
    });
}

// Funções para os períodos específicos
function obterValores24h() { obterDadosPeriodo("24h"); }
function obterValores7d() { obterDadosPeriodo("7d"); }
function obterValores30d() { obterDadosPeriodo("30d"); }

// Funções auxiliares para atualizar tabelas
function atualizarTabelaAlertas(json) {
    const corpoTabela = document.getElementById("corpo-tabela-alertas");
    corpoTabela.innerHTML = "";
    
    json.forEach(item => {
        const linha = document.createElement("tr");
        
        ["data_center", "data_hora", "tempo_resolucao"].forEach(campo => {
            const celula = document.createElement("td");
            celula.textContent = item[campo];
            linha.appendChild(celula);
        });
        corpoTabela.appendChild(linha);
    });
}

function atualizarTabelaDatacenters(json) {
    const corpoTabela = document.getElementById("corpo-tabela-datacenters");
    corpoTabela.innerHTML = "";
    
    json.forEach(item => {
        const linha = document.createElement("tr");
        
        const celulaDC = document.createElement("td");
        celulaDC.textContent = item.data_center;
        linha.appendChild(celulaDC);
        
        const celulaTempo = document.createElement("td");
        celulaTempo.textContent = item.tempo_medio;
        linha.appendChild(celulaTempo);
        
        corpoTabela.appendChild(linha);
    });
}

// Função para criar/atualizar o gráfico
function atualizarGraficoBarrasDuplas(dadosTotais, dadosAtrasados) {
    const datacenters = dadosTotais.map(item => item.data_center);
    const totalAlertas = dadosTotais.map(item => item.total_alertas);
    const alertasAtrasados = datacenters.map(dc => {
        const encontrado = dadosAtrasados.find(item => item.data_center === dc);
        return encontrado ? encontrado.alertasatrasados : 0;
    });

    const options = {
        series: [
            { name: 'Total de Alertas', data: totalAlertas },
            { name: 'Alertas > 5min', data: alertasAtrasados }
        ],
        chart: {
            type: 'bar',
            height: 350,
            stacked: false,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: datacenters,
            title: { text: 'Data Centers' },
            labels: { style: { fontSize: '12px' } }
        },
        yaxis: {
            title: { text: 'Número de Alertas' },
            labels: { formatter: val => Math.floor(val) }
        },
        fill: { opacity: 1 },
        tooltip: {
            y: { formatter: val => val + " alertas" }
        },
        colors: ['#28a745', '#dc3545'],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetX: -10
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: { height: 300 },
                xaxis: { labels: { style: { fontSize: '10px' } } },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center'
                }
            }
        }]
    };

    const chartElement = document.getElementById("grafico");
    
    if (!chartElement) {
        console.error("Elemento do gráfico não encontrado.");
        return;
    }

    if (graficoInstance) {
        graficoInstance.updateOptions({
            xaxis: { categories: datacenters }
        });
        graficoInstance.updateSeries(options.series);
    } else {
        graficoInstance = new ApexCharts(chartElement, options);
        graficoInstance.render();
    }
}

// Função para limpar o gráfico
function limparGrafico() {
    if (graficoInstance) {
        graficoInstance.destroy();
        graficoInstance = null;
    }
}