function gerarGrafico() {
  var options = {
    chart: {
      type: "bar",
      height: 350,
    },
    series: [
      {
        name: "Custo em R$",
        data: [90, 92, 91],
      },
    ],
    xaxis: {
      categories: ["Data Center 1", "Data Center 2", "Data Center 3"],
    },
    colors: ["#7B66FF", "#FF6B6B", "#50C9CE"],
  };

  var chart = new ApexCharts(document.querySelector("#grafico"), options);
  chart.render();
}

function filtrarPeriodo(dias) {
  alert("Filtro aplicado: ");
}
