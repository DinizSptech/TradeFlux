// CÁLCULOS:

// CUSTO TOTAL = VALOR TOTAL
// CUSTO MÉDIO POR MANUTENÇÃO = CUSTO TOTAL / QTD ALERTAS

let tempoSelecionado = 24;
let dataCenterSelecionado = null;

function exibir(valor) {
  if (valor <= 3) {
    dataCenterSelecionado = valor;
  } else {
    tempoSelecionado = valor;
  }

  if (dataCenterSelecionado == 1) {
    data_center_custo.innerHTML = 1;
    data_center_tempo.innerHTML = 1;
    data_center_total.innerHTML = 1;
  } else if (dataCenterSelecionado == 2) {
    data_center_custo.innerHTML = 2;
    data_center_tempo.innerHTML = 2;
    data_center_total.innerHTML = 2;
  } else if (dataCenterSelecionado == 3) {
    data_center_custo.innerHTML = 3;
    data_center_tempo.innerHTML = 3;
    data_center_total.innerHTML = 3;
  }

  fetch("http://localhost:3000/pix/pegarPix").then((res) => {
    res.json().then((resjson) => {
      console.log(resjson);
    });
  });

  if (tempoSelecionado == 24) {
    fetch("/adm/datacenter/media-resolucao/24h").then((res) => {
      res.json().then((resjson) => {
        console.log(resjson[0].data_center);
        console.log(resjson[0].tempo_medio);

        for (let i = 0; i < resjson.length; i++) {
          const dataCenter_atual = resjson[i].data_center;
          const tempo_atual = resjson[i].tempo_medio;

          if (dataCenterSelecionado == 1) {
            if (dataCenter_atual == "Data Center 1") {
            }
          } else if (dataCenterSelecionado == 2) {
            if (dataCenter_atual == "Data Center 2") {
            }
          } else {
            if (dataCenter_atual == "Data Center 3") {
            }
          }
        }
      });
    });
  } else if (tempoSelecionado == 7) {
    fetch("/adm/datacenter/media-resolucao/7d").then((res) => {
      res.json().then((resjson) => {
        for (let i = 0; i < resjson.length; i++) {
          const dataCenter_atual = resjson[i].data_center;
          const tempo_atual = resjson[i].tempo_medio;

          if (dataCenterSelecionado == 1) {
            if (dataCenter_atual == "Data Center 1") {
            }
          } else if (dataCenterSelecionado == 2) {
            if (dataCenter_atual == "Data Center 2") {
            }
          } else {
            if (dataCenter_atual == "Data Center 3") {
            }
          }
        }
      });
    });
  } else if (tempoSelecionado == 30) {
    fetch("/adm/datacenter/media-resolucao/30d").then((res) => {
      res.json().then((resjson) => {
        for (let i = 0; i < resjson.length; i++) {
          const dataCenter_atual = resjson[i].data_center;
          const tempo_atual = resjson[i].tempo_medio;

          if (dataCenterSelecionado == 1) {
            if (dataCenter_atual == "Data Center 1") {
            }
          } else if (dataCenterSelecionado == 2) {
            if (dataCenter_atual == "Data Center 2") {
            }
          } else {
            if (dataCenter_atual == "Data Center 3") {
            }
          }
        }
      });
    });
  }
  console.log("Data Center:", dataCenterSelecionado);
  console.log("Tempo:", tempoSelecionado);

  // Coletar JSON do bucket client:
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

function selecionar(selecionado) {
  const filtros = document.querySelectorAll(".filtro");

  filtros.forEach((f) => f.classList.remove("selecionado"));
  selecionado.classList.add("selecionado");
}
