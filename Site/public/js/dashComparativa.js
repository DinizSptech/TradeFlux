function trocarVisibilidade(e) {    
    
    const periodo = document.getElementById("sltPeriodo").value
    
    if(periodo == "optPeriodoPersonalizado") {
        document.getElementById("divPersonalizada").classList.remove("esconder")
        // Remove a classe esconder
    } else {
        document.getElementById("divPersonalizada").classList.add("esconder")
        // Adiciona a classe esconder
    }
    
} 

function selecionandoServidor(e) {

    const servidor = e.currentTarget.id
    let ServidorEscolhido = document.getElementById("iptServidorPersonalizado").value;

    if(servidor == "iptRdServerEscolhido" && !ServidorEscolhido) {
        
        document.getElementById("iptServidorPersonalizado").disabled = false

    } else if(servidor == "iptRdServerEscolhido") {
        
        // Fetch dps aqui puxando os dados quando for personalizado

    } else {

        document.getElementById("iptServidorPersonalizado").disabled = true

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

    }

}

// Talvez aumentar gráficos

document.getElementById("sltPeriodo").addEventListener("change", trocarVisibilidade)
// Pega o elemento, ao pegar ele, verifica se houve mudança, por isso ele está em change e se tiver mudança, ele roda a função dps da virgula (Não precisa de parenteses dps do nome da função)

document.getElementsByName("server").forEach(function(item){
    item.addEventListener("change",selecionandoServidor)
})