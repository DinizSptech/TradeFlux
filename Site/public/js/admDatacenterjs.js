document.addEventListener("DOMContentLoaded", function () {
    var options = {
        chart: {
            type: 'bar',
            height: '100%',
            width: '100%',
            toolbar: {
                show: false
            },
            foreColor: '#ffff',
            fontSize: '30px',
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    height: '100%'
                },
                legend: {
                    position: 'bottom',
                    fontSize: '8px'
                },
                dataLabels: {
                    style: {
                        fontSize: '6px'
                    }
                },
                xaxis: {
                    labels: {
                        style: {
                            fontSize: '8px'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '8px'
                        }
                    }
                }
            }
        }],
        series: [
            {
                name: 'Alertas Atrasados',
                data: [6, 4, 2]
            },
            {
                name: 'Alertas Totais',
                data: [8, 8, 8]
            }
        ],
        xaxis: {
            categories: ['Data Center 1', 'Data Center 3', 'Data Center 2'],
            labels: {
                style: {
                    fontSize: '15px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '15px'
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '13px'
            }
        },
        legend: {
            position: 'top',
            fontSize: '15px'
        },
        colors: ['#cc0000', '#00cc00']
    };

    var chart = new ApexCharts(document.querySelector("#grafico"), options);
    chart.render();
});