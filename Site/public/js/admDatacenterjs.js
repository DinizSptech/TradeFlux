document.addEventListener("DOMContentLoaded", function () {
  var options = {
    chart: {
      type: 'bar',
      height: 200,
      width: 650   
    },
      responsive: [{
    breakpoint: 768,
    options: {
      chart: {
        height: 400
      }
    }
  }], 
    series: [
      {
        name: 'Alertas Atrasados',
        data: [8, 8, 8]
      },
      {
        name: 'Alertas Totais',
        data: [6, 4, 2]
      }
    ],
    xaxis: {
      categories: ['Data Center 1', 'Data Center 3', 'Data Center 2']
    },
    plotOptions: {  
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: {
      position: 'top'
    }
  };

  var chart = new ApexCharts(document.querySelector("#grafico"), options);
  chart.render();
});
