document.addEventListener("DOMContentLoaded", function() {
    var options = {
        chart: {
            type: 'bar',
            height: '100%',
            parentHeightOffset: 0,
            toolbar: { show: false },
            animations: { enabled: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '45%',
            }
        },
        dataLabels: { enabled: true },
        series: [
            { name: 'Alertas Totais', data: [8, 8, 8] },
            { name: 'Alertas Atrasados', data: [6, 4, 2] }
        ],
        xaxis: {
            categories: ['Data Center 1', 'Data Center 3', 'Data Center 2'],
            labels: { style: { colors: '#fff' } }
        },
        yaxis: {
            labels: { style: { colors: '#fff' } },
            forceNiceScale: true
        },
        legend: {
            position: 'top',
            labels: { colors: '#fff' }
        },
        colors: ['#00cc00', '#cc0000'],
        grid: {
            padding: { top: 20, right: 20, bottom: 0, left: 20 },
            borderColor: 'rgba(255, 255, 255, 0.1)'
        }
    };

    var chart = new ApexCharts(document.querySelector("#grafico"), options);
    chart.render();
});