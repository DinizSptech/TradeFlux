function gerarBotao() {

    const BOTAO = document.getElementById('botaoBaixar')

    BOTAO.innerHTML = `Baixar CSV database ${sessionStorage.getItem('DataCenter')}`

}

function baixarCSV() {

    const DATACENTER = sessionStorage.getItem('DataCenter')

    if(DATACENTER == 1) {

    } else if(DATACENTER == 2) {
    
    } else {

    }

}

function trocarVisibilidade(e) {    
    
    const periodo = document.getElementById("sltPeriodo").value
    
    if(periodo == "optPeriodoPersonalizado") {
        document.getElementById("divPersonalizadaData").classList.remove("esconder")
        // Remove a classe esconder
    } else {
        document.getElementById("divPersonalizadaData").classList.add("esconder")
        // Adiciona a classe esconder
    }
    
} 

function chamandoLambda(qtdDias, dataInicial) {  

    const datacenter = sessionStorage.getItem('DataCenter')
    const dataFormatada = dataInicial + " 00:00:00"

    fetch('https://hf2m2zb4jalpa2qrwqvmwppbsy0tugey.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            qtdDias: qtdDias,
            dtInicial: dataFormatada,
            datacenter: datacenter
        })
    }).then(response => response.json()) .then(data => {
    
        // Salva todos os servidores no sessionStorage
        for (let i = 1; i <= 10; i++) {
            const qualServidor = `servidor${i}`;
            const servidor = data[qualServidor];

            // Só validando se veio algum dado
            if (servidor && servidor.media_CPU !== null) {
                sessionStorage.setItem(qualServidor, JSON.stringify(servidor));
            } else {
            // Limpa quando não tiver dados
            sessionStorage.removeItem(qualServidor);
            }
        }

         // Também salva a média total pro gráfico de barras
        sessionStorage.setItem('mediaTotal', JSON.stringify(data.mediaTotal));

    })

}

function selecionandoServidor(e) {

    const qtdDias = document.getElementById("sltPeriodo").value
    const dataHoje = pegarDataHoje()

    chamandoLambda(qtdDias, dataHoje)

    const servidor = e.currentTarget.id
    let ServidorEscolhido = document.getElementById("sltServidor").value;

    if(servidor == "iptRdServerEscolhido" && ServidorEscolhido == '#') {
        
        document.getElementById("sltServidor").disabled = false

    } else if(servidor == "iptRdServerEscolhido") {
        
        chamandoLambda(qtdDias, dataHoje)

    } else {

        document.getElementById("sltServidor").disabled = true

    }
    
    if(servidor == "iptRdServerCPU") {


    } else if(servidor == "iptRdServerRAM") {

    } else if(servidor == "iptRdServerDisco") {

    }

}

function geradorGraficos(tipo) {

    if(tipo == "Barra") {

        let media = [37.59, 40.1, 30.21]
        let servidorSelecionado = [30.88, 70.57, 28.20]

        var options = {

            title: {
                text: 'Comparação média com servidor escolhido',
                align: 'center'
            },

            chart: {
                type: 'bar',
                height: 350,
                background: '#ffffff'
            },

            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top'
                    },
                    barHeight: '50%'
                }
            },

            colors: 
                [
                    '#7F7FFF', // Azul claro 
                    '#FF7F7F' // Vermelho claro 
                ],  
        
            dataLabels: {
                enabled: true,
                offsetX: 20, 
                style: {
                    fontSize: '12px',
                    colors: ['#000']
                }
            },
        
            series: [
                {
                    name: 'Média',
                    data: media
                },
                {
                    name: 'Servidor Selecionado',
                    data: servidorSelecionado
                }
            ],

            xaxis: {
                categories: [
                    'CPU', 
                    'RAM', 
                    'Disco'
                ],
                max: 100,
                labels: {
                    style: {
                        colors: '#000000'
                    }
                }
            },

            yaxis: {
                labels: {
                    style: {
                        colors: '#000000'
                    }
                }
            },

            legend: {
                position: 'bottom',
                labels: {
                    colors: '#000000'
                }
            },
        
            grid: {
                borderColor: '#555'
            },

            colors:[

                '#5A8DEE',  // Cor fixa para "Média" (Azul)
                function({dataPointIndex}) {

                    let valorServidor = servidorSelecionado[dataPointIndex];
                    let valorMedia = media[dataPointIndex];

                    if (valorServidor > valorMedia) {
                        return '#E74C3C';  // Vermelho
                    }

                    let diferencaPercentual = ((valorMedia - valorServidor) / valorMedia) * 100;

                    if (diferencaPercentual <= 10) {
                        return '#F39C12';  // Laranja
                    } else {
                        return '#27AE60';  // Verde
                    }

                }
            
            ]

        };

        var chart = new ApexCharts(document.querySelector("#myBarChart"), options);
        chart.render();
    
    } else if(tipo == "Linha") {
        
        var options = {

            chart: {
                type: 'line',
                height: 350
            },
      
            series: [{
      
                // Servidor 1

                name: 'CPU utilizada (Servidor 1)',
                data: [10, 41, 35, 51, 49, 62, 69]
            },{
                name: 'RAM utilizada (Servidor 1)',
                data: [50, 80, 30, 58, 26, 54, 15]
            },{
                name: 'Disco utilizado (Servidor 1)',
                data: [60, 58, 62, 65, 63, 60, 65]
            },
      
            ],
            
            xaxis: {
                categories: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04', '07/04']
            },
        
            yaxis : {
                max: 100
            },
        
            title: {
                text: 'Média do gasto de recursos',
                align: 'center'
            },
        
            stroke: {
                curve: 'straight'
            },
        
            markers: {
                size: 4
            },
        
            colors: [
                '#92DC00', 
                '#00FF00', 
                '#0000FF', 
                '#169916', 
                '#FF00FF', 
                '#00FFFF'
            ]

        };

        var chart = new ApexCharts(document.querySelector("#myLineChart"), options);
        chart.render();
        var chart = new ApexCharts(document.querySelector("#myLineChart2"), options);
        chart.render();

    }

}

function pegarDataHoje() {

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // meses começam do 0
    const dia = String(hoje.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;
    console.log(dataFormatada);

    return dataFormatada;

}

// Talvez aumentar gráficos

 // Dados dos processos
        const processData = [
            { process: 'Processo 1', cpu: 17, ram: 35 },
            { process: 'Processo 2', cpu: 9, ram: 28 },
            { process: 'Processo 3', cpu: 5, ram: 18 },
            { process: 'Processo 4', cpu: 4, ram: 12 },
            { process: 'Processo 5', cpu: 3, ram: 8 }
        ];

        let currentSort = { column: null, direction: null };

        // Função para gerar a tabela
        function generateTable(data) {
            const tbody = document.getElementById('tableBody');
            tbody.innerHTML = '';

            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="process-name">${row.process}</td>
                    <td class="cpu-usage">${row.cpu}%</td>
                    <td class="ram-usage">${row.ram}%</td>

                `;
                tbody.appendChild(tr);
            });
        }

        // Função para ordenar a tabela
        function sortTable(column) {
            // Limpar classes de ordenação anteriores
            document.querySelectorAll('th').forEach(th => {
                th.classList.remove('sorted-asc', 'sorted-desc');
            });

            // Determinar direção da ordenação
            let direction = 'desc'; // Sempre do maior ao menor
            if (currentSort.column === column && currentSort.direction === 'desc') {
                direction = 'asc'; // Se já está ordenado desc, muda para asc
            }

            // Ordenar os dados
            const sortedData = [...processData].sort((a, b) => {
                let valueA, valueB;

                switch(column) {
                    case 'process':
                        valueA = a.process;
                        valueB = b.process;
                        // Para processos, ordenar alfabeticamente
                        if (direction === 'desc') {
                            return valueB.localeCompare(valueA);
                        } else {
                            return valueA.localeCompare(valueB);
                        }
                    case 'cpu':
                        valueA = a.cpu;
                        valueB = b.cpu;
                        break;
                    case 'ram':
                        valueA = a.ram;
                        valueB = b.ram;
                        break;
                }

                // Para valores numéricos
                if (column !== 'process') {
                    if (direction === 'desc') {
                        return valueB - valueA; // Maior ao menor
                    } else {
                        return valueA - valueB; // Menor ao maior
                    }
                }
            });

            // Atualizar estado atual da ordenação
            currentSort = { column, direction };

            // Adicionar classe visual ao cabeçalho
            const header = document.getElementById(column + 'Header');
            header.classList.add(direction === 'desc' ? 'sorted-desc' : 'sorted-asc');

            // Regenerar tabela com dados ordenados
            generateTable(sortedData);
        }

        // Inicializar tabela quando a página carregar
        document.addEventListener('DOMContentLoaded', function() {
            generateTable(processData);
        });

        const modal = document.getElementById('modal');
        const modalContent = modal.querySelector('.modal-content');

        function openModal() {
            modal.classList.add('show');
            modalContent.classList.remove('closing');
            document.body.style.overflow = 'hidden'; // Previne scroll do body
            setTimeout(() => {
                geradorGraficos('Linha');
                // geradorGraficos('Barra');
            }, 200); // Espera o modal abrir
        }

        function closeModal() {
            modalContent.classList.add('closing');
            setTimeout(() => {
                modal.classList.remove('show');
                modalContent.classList.remove('closing');
                document.body.style.overflow = 'auto'; // Restaura scroll do body
            }, 300);
        }

        function closeModalOnBackdrop(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        function handleAction() {
            alert('Ação confirmada! 🎊');
            closeModal();
        }

        // Fechar modal com a tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

document.getElementById("sltPeriodo").addEventListener("change", trocarVisibilidade)
// Pega o elemento, ao pegar ele, verifica se houve mudança, por isso ele está em change e se tiver mudança, ele roda a função dps da virgula (Não precisa de parenteses dps do nome da função)

document.getElementsByName("server").forEach(function(item){
    item.addEventListener("change",selecionandoServidor)
})

// Tipos de gráficos que vão ser usados:

// line
// https://apexcharts.com/docs/chart-types/line-chart/

// bar
// https://apexcharts.com/docs/chart-types/bar-chart/