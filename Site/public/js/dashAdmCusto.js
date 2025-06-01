function exibir() {
  // coletando dados do bd:

  fetch("/adm/tempo-medio/24h").then((res) => {
    res.json().then((resjson) => {
      console.log("tempo medio 24h:" + resjson);
    });
  });

  fetch("/adm/tempo-medio/7d").then((res) => {
    res.json().then((resjson) => {
      console.log("tempo medio 7d:" + resjson);
    });
  });

  fetch("/adm/tempo-medio/30d").then((res) => {
    res.json().then((resjson) => {
      console.log("tempo medio 30 dias:" + resjson);
    });
  });
}

function gerarGrafico() {
  let corGrafico = "rgb(0,178,118)";

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
    colors: [corGrafico],
  };

  var chart = new ApexCharts(document.querySelector("#grafico"), options);
  chart.render();
}
