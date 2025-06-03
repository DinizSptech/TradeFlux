// CÁLCULOS:

// CUSTO TOTAL = VALOR TOTAL * TEMPO_MEDIO(TEMPO) * TEMPO
// ex CUSTO TOTAL 30D = VALOR TOTAL(30D) * TEMPO_MEDIO(30D) * 30

// CUSTO MÉDIO POR MANUTENÇÃO = CUSTO TOTAL / QTD ALERTAS

let tempoSelecionado = 0;
let dataCenterSelecionado = null;

//

const array_transacao_dc1 = [];
const array_transacao_dc2 = [];
const array_transacao_dc3 = [];

//

let valor24_dc1 = 0;
let valorHora24_dc1 = 0;

let valor24_dc2 = 0;
let valorHora24_dc2 = 0;

let valor24_dc3 = 0;
let valorHora24_dc3 = 0;

//

let valor7_dc1 = 0;
let valorHora7_dc1 = 0;

let valor7_dc2 = 0;
let valorHora7_dc2 = 0;

let valor7_dc3 = 0;
let valorHora7_dc3 = 0;

//

let valor30_dc1 = 0;
let valorHora30_dc1 = 0;

let valor30_dc2 = 0;
let valorHora30_dc2 = 0;

let valor30_dc3 = 0;
let valorHora30_dc3 = 0;

//

let horas24_dc1 = 0;
let horas24_dc2 = 0;
let horas24_dc3 = 0;

let horas7_dc1 = 0;
let horas7_dc2 = 0;
let horas7_dc3 = 0;

let horas30_dc1 = 0;
let horas30_dc2 = 0;
let horas30_dc3 = 0;

//

let custoHora24_dc1 = 0;
let custoHora24_dc2 = 0;
let custoHora24_dc3 = 0;

let custoHora7_dc1 = 0;
let custoHora7_dc2 = 0;
let custoHora7_dc3 = 0;

let custoHora30_dc1 = 0;
let custoHora30_dc2 = 0;
let custoHora30_dc3 = 0;

//

let custoMedio24_dc1 = 0;
let custoMedio24_dc2 = 0;
let custoMedio24_dc3 = 0;

let custoMedio7_dc1 = 0;
let custoMedio7_dc2 = 0;
let custoMedio7_dc3 = 0;

let custoMedio30_dc1 = 0;
let custoMedio30_dc2 = 0;
let custoMedio30_dc3 = 0;

//

let custoTotal24_dc1 = 0;
let custoTotal24_dc2 = 0;
let custoTotal24_dc3 = 0;

let custoTotal7_dc1 = 0;
let custoTotal7_dc2 = 0;
let custoTotal7_dc3 = 0;

let custoTotal30_dc1 = 0;
let custoTotal30_dc2 = 0;
let custoTotal30_dc3 = 0;

function carregar() {
  tempoSelecionado = 24;

  if (tempoSelecionado == 24) {
    // Coletar os dados de transação:

    fetch("http://localhost:3000/pix/pegarPix").then((res) => {
      res.json().then((resjson) => {
        for (let i = 0; i < resjson.length; i++) {
          const valor_atual = resjson[i].valor;
          const dataCenter_atual = resjson[i].dataCenter;

          if (dataCenter_atual == 1) {
            array_transacao_dc1.push(valor_atual);
          } else if (dataCenter_atual == 2) {
            array_transacao_dc2.push(valor_atual);
          } else {
            array_transacao_dc3.push(valor_atual);
          }
        }

        valor24_dc1 = array_transacao_dc1[0];
        valorHora24_dc1 = Math.ceil(valor24_dc1 / 24);

        valor24_dc2 = array_transacao_dc2[0];
        valorHora24_dc2 = Math.floor(valor24_dc2 / 24);

        valor24_dc3 = array_transacao_dc3[0];
        valorHora24_dc3 = Math.floor(valor24_dc3 / 24);

        console.log("Valor Hora 24h DC1: " + valorHora24_dc1);
        console.log("Valor Hora 24h DC2: " + valorHora24_dc2);
        console.log("Valor Hora 24h DC3: " + valorHora24_dc3);

        for (let i = 0; i < array_transacao_dc1.length; i++) {
          if (i < 7) {
            valor7_dc1 += array_transacao_dc1[i];
            valor7_dc2 += array_transacao_dc2[i];
            valor7_dc3 += array_transacao_dc3[i];
          }
          if (i < 30) {
            valor30_dc1 += array_transacao_dc1[i];
            valor30_dc2 += array_transacao_dc2[i];
            valor30_dc3 += array_transacao_dc3[i];
          }
        }

        console.log("Valor Hora 7d DC1: " + valorHora7_dc1);
        console.log("Valor Hora 7d DC2: " + valorHora7_dc2);
        console.log("Valor Hora 7d DC3: " + valorHora7_dc3);

        console.log("Valor Hora 30d DC1: " + valorHora30_dc1);
        console.log("Valor Hora 30d DC2: " + valorHora30_dc2);
        console.log("Valor Hora 30d DC3: " + valorHora30_dc3);

        fetch("/adm/datacenter/media-resolucao/victao/24h").then((res) => {
          res.json().then((resjson) => {
            for (let i = 0; i < resjson.length; i++) {
              const dataCenter_atual = resjson[i].data_center;
              const hora_atual = Number(resjson[i].tempo_medio_horas);

              if (dataCenter_atual == "Data Center 1") {
                horas24_dc1 = hora_atual;
              } else if (dataCenter_atual == "Data Center 2") {
                horas24_dc2 = hora_atual;
              } else {
                horas24_dc3 = hora_atual;
              }
            }

            console.log("Horas 24h DC1: " + horas24_dc1);
            console.log("Horas 24h DC2: " + horas24_dc2);
            console.log("Horas 24h DC3: " + horas24_dc3);

            valorHora24_dc1 = Math.floor(valor24_dc1 / 24);
            valorHora24_dc2 = Math.floor(valor24_dc2 / 24);
            valorHora24_dc3 = Math.floor(valor24_dc3 / 24);

            console.log("Valor Hora 24h DC1: " + valorHora24_dc1);
            console.log("Valor Hora 24h DC2: " + valorHora24_dc2);
            console.log("Valor Hora 24h DC3: " + valorHora24_dc3);

            custoHora24_dc1 = valorHora24_dc1 * horas24_dc1;
            custoHora24_dc2 = valorHora24_dc2 * horas24_dc2;
            custoHora24_dc3 = valorHora24_dc3 * horas24_dc3;

            let menorCusto24 = Math.ceil(
              Math.min(custoHora24_dc1, custoHora24_dc2, custoHora24_dc3)
            );
            let menorCusto24_dc = 1;

            if (menorCusto24 === custoHora24_dc2) {
              menorCusto24_dc = 2;
            } else if (menorCusto24 === custoHora24_dc3) {
              menorCusto24_dc = 3;
            }

            data_center_custo.innerHTML = menorCusto24_dc;
            data_center_investir.innerHTML = menorCusto24_dc;
            custo_hora.innerHTML = menorCusto24;

            // calcular o Custo Total
            // CUSTO TOTAL = VALOR TOTAL * TEMPO_MEDIO(TEMPO) * TEMPO
            // ex CUSTO TOTAL 30D = VALOR TOTAL(30D) * TEMPO_MEDIO(30D) * 30

            custoTotal24_dc1 = Math.ceil(valor24_dc1 * horas24_dc1);
            custoTotal24_dc2 = Math.ceil(valor24_dc2 * horas24_dc2);
            custoTotal24_dc3 = Math.ceil(valor24_dc3 * horas24_dc3);

            console.log("Custo Total 24 DC1: " + custoTotal24_dc1);
            console.log("Custo Total 24 DC2: " + custoTotal24_dc2);
            console.log("Custo Total 24 DC3: " + custoTotal24_dc3);

            // para se alinhar com a KPI de Custo por hora de manutencao
            data_center_total.innerHTML = menorCusto24_dc;

            if (menorCusto24_dc == 1) {
              custo_total.innerHTML = custoTotal24_dc1;
            } else if (menorCusto24_dc == 2) {
              custo_total.innerHTML = custoTotal24_dc2;
            } else if (menorCusto24_dc == 3) {
              custo_total.innerHTML = custoHora24_dc3;
            }

            // Calcular o Custo Médio
            // CUSTO MÉDIO POR MANUTENÇÃO = CUSTO TOTAL / QTD ALERTAS

            fetch("/adm/alertas/24h").then((res) => {
              res.json().then((resjson) => {
                let total_alertas_24 = resjson[0].total_alertas;

                custoMedio24_dc1 = Math.ceil(
                  custoTotal24_dc1 / total_alertas_24
                );
                custoMedio24_dc2 = Math.ceil(
                  custoTotal24_dc2 / total_alertas_24
                );
                custoMedio24_dc3 = Math.ceil(
                  custoTotal24_dc3 / total_alertas_24
                );

                console.log("Custo medio 24h dc1: " + custoMedio24_dc1);
                console.log("Custo medio 24h dc2: " + custoMedio24_dc2);
                console.log("Custo medio 24h dc3: " + custoMedio24_dc3);

                data_center_medio.innerHTML = menorCusto24_dc;

                if (menorCusto24_dc == 1) {
                  custo_medio.innerHTML = custoMedio24_dc1;
                } else if (menorCusto24_dc == 2) {
                  custo_medio.innerHTML = custoMedio24_dc2;
                } else if (menorCusto24_dc == 3) {
                  custo_medio.innerHTML = custoMedio24_dc3;
                }

                let corGrafico = "rgb(0,178,118)";

                var options = {
                  chart: {
                    type: "bar",
                    height: 350,
                  },
                  title: {
                    text: "Top 3 Data Centers Custo Total",
                    align: "center",
                  },
                  series: [
                    {
                      name: "Custo Total R$",
                      data: [
                        custoTotal24_dc1,
                        custoTotal24_dc2,
                        custoTotal24_dc3,
                      ],
                    },
                  ],
                  xaxis: {
                    categories: [
                      "Data Center 1",
                      "Data Center 2",
                      "Data Center 3",
                    ],
                  },
                  colors: [corGrafico],
                };

                var chart = new ApexCharts(
                  document.querySelector("#grafico"),
                  options
                );
                chart.render();
              });
            });
          });
        });
      });
    });
  }
}

function calcularValorHora(valor, dias) {
  return Math.floor(valor / dias / 24);
}

function filtrar(tempo) {
  let custoTotalSelecionado_dc1;
  let custoTotalSelecionado_dc2;
  let custoTotalSelecionado_dc3;

  if (tempo == 24) {
    return menorCusto24;
  } else if (tempo == 7) {
    fetch("/adm/datacenter/media-resolucao/victao/7d").then((res) => {
      res.json().then((resjson) => {
        for (let i = 0; i < resjson.length; i++) {
          const dataCenter_atual = resjson[i].data_center;
          const hora_atual = Number(resjson[i].tempo_medio_horas);

          if (dataCenter_atual == "Data Center 1") {
            horas7_dc1 = hora_atual;
          } else if (dataCenter_atual == "Data Center 2") {
            horas7_dc2 = hora_atual;
          } else {
            horas7_dc3 = hora_atual;
          }
        }

        console.log("Horas 7d DC1: " + horas7_dc1);
        console.log("Horas 7d DC2: " + horas7_dc2);
        console.log("Horas 7d DC3: " + horas7_dc3);

        valorHora7_dc1 = Math.floor(valor7_dc1 / 7 / 24);
        valorHora7_dc2 = Math.floor(valor7_dc2 / 7 / 24);
        valorHora7_dc3 = Math.floor(valor7_dc3 / 7 / 24);

        console.log("Valor Hora 7d DC1: " + valorHora7_dc1);
        console.log("Valor Hora 7d DC2: " + valorHora7_dc2);
        console.log("Valor Hora 7d DC3: " + valorHora7_dc3);

        custoHora7_dc1 = Math.ceil(valorHora7_dc1 * horas7_dc1);
        custoHora7_dc2 = Math.ceil(valorHora7_dc2 * horas7_dc2);
        custoHora7_dc3 = Math.ceil(valorHora7_dc3 * horas7_dc3);

        let menorCusto7 = Math.ceil(
          Math.min(custoHora7_dc1, custoHora7_dc2, custoHora7_dc3)
        );

        // deixo o valor default
        let menorCusto7_dc = 1;

        if (menorCusto7 === custoHora7_dc2) {
          menorCusto7_dc = 2;
        } else if (menorCusto7 === custoHora7_dc3) {
          menorCusto7_dc = 3;
        }

        data_center_custo.innerHTML = menorCusto7_dc;
        data_center_investir.innerHTML = menorCusto7_dc;
        custo_hora.innerHTML = menorCusto7;

        // calcular o Custo Total
        custoTotal7_dc1 = Math.ceil(valor7_dc1 * horas7_dc1);
        custoTotal7_dc2 = Math.ceil(valor7_dc2 * horas7_dc2);
        custoTotal7_dc3 = Math.ceil(valor7_dc3 * horas7_dc3);

        console.log("Custo Total 7 DC1: " + custoTotal7_dc1);
        console.log("Custo Total 7 DC2: " + custoTotal7_dc2);
        console.log("Custo Total 7 DC3: " + custoTotal7_dc3);

        let menorCustoTotal7 = Math.ceil(
          Math.min(custoTotal7_dc1, custoTotal7_dc2, custoTotal7_dc3)
        );

        // deixo o valor default
        let menorCustoTotal7_dc = 1;

        if (menorCustoTotal7 === custoTotal7_dc2) {
          menorCustoTotal7_dc = 2;
        } else if (menorCustoTotal7 === custoTotal7_dc3) {
          menorCustoTotal7_dc = 3;
        }

        data_center_total.innerHTML = menorCustoTotal7_dc;
        data_center_investir.innerHTML = menorCustoTotal7_dc;
        custo_total.innerHTML = menorCusto7;

        // Calcular o Custo Médio 7 dias

        fetch("http://localhost:3333/adm/alertas/7d").then((res) => {
          res.json().then((resjson) => {
            let total_alertas_7 = resjson[0].total_alertas;

            custoMedio7_dc1 = custoTotal7_dc1 / total_alertas_7;
            custoMedio7_dc2 = custoTotal7_dc2 / total_alertas_7;
            custoMedio7_dc3 = custoTotal7_dc3 / total_alertas_7;

            let menorCustoMedio7 = Math.ceil(
              Math.min(custoMedio7_dc1, custoMedio7_dc2, custoMedio7_dc3)
            );

            // deixo o valor default
            let menorCustoMedio7_dc = 1;

            console.warn("Custo Medio 7 DC1: " + custoMedio7_dc1);
            console.warn("Custo Medio 7 DC2: " + custoMedio7_dc2);
            console.warn("Custo Medio 7 DC3: " + custoMedio7_dc3);

            if (menorCustoMedio7 === custoMedio7_dc2) {
              menorCustoMedio7_dc = 2;
            } else if (menorCustoMedio7 === custoMedio7_dc3) {
              menorCustoMedio7_dc = 3;
            }

            data_center_medio.innerHTML = menorCustoMedio7_dc;
            data_center_investir.innerHTML = menorCustoMedio7_dc;
            custo_medio.innerHTML = menorCustoMedio7;
          });
        });
      });
    });
  } else {
    fetch("/adm/datacenter/media-resolucao/victao/30d").then((res) => {
      res.json().then((resjson) => {
        for (let i = 0; i < resjson.length; i++) {
          const dataCenter_atual = resjson[i].data_center;
          const hora_atual = Number(resjson[i].tempo_medio_horas);

          if (dataCenter_atual == "Data Center 1") {
            horas30_dc1 = hora_atual;
          } else if (dataCenter_atual == "Data Center 2") {
            horas30_dc2 = hora_atual;
          } else {
            horas30_dc3 = hora_atual;
          }
        }

        console.log("Horas 30d DC1: " + horas30_dc1);
        console.log("Horas 30d DC2: " + horas30_dc2);
        console.log("Horas 30d DC3: " + horas30_dc3);

        valorHora30_dc1 = Math.floor(valor30_dc1 / 30 / 24);
        valorHora30_dc2 = Math.floor(valor30_dc2 / 30 / 24);
        valorHora30_dc3 = Math.floor(valor30_dc3 / 30 / 24);

        console.log("Valor Hora 30d DC1: " + valorHora30_dc1);
        console.log("Valor Hora 30d DC2: " + valorHora30_dc2);
        console.log("Valor Hora 30d DC3: " + valorHora30_dc3);

        custoHora30_dc1 = Math.ceil(valorHora30_dc1 * horas30_dc1);
        custoHora30_dc2 = Math.ceil(valorHora30_dc2 * horas30_dc2);
        custoHora30_dc3 = Math.ceil(valorHora30_dc3 * horas30_dc3);

        let menorCusto30 = Math.ceil(
          Math.min(custoHora30_dc1, custoHora30_dc2, custoHora30_dc3)
        );

        // deixo o valor default
        let menorCusto30_dc = 1;

        if (menorCusto30 === custoHora30_dc2) {
          menorCusto30_dc = 2;
        } else if (menorCusto30 === custoHora30_dc3) {
          menorCusto30_dc = 3;
        }

        data_center_custo.innerHTML = menorCusto30_dc;
        data_center_investir.innerHTML = menorCusto30_dc;
        custo_hora.innerHTML = menorCusto30;

        // Calcular o Custo Total 30 dias
        custoTotal30_dc1 = Math.ceil(valor30_dc1 * horas30_dc1);
        custoTotal30_dc2 = Math.ceil(valor30_dc2 * horas30_dc2);
        custoTotal30_dc3 = Math.ceil(valor30_dc3 * horas30_dc3);

        let menorCustoTotal30 = Math.ceil(
          Math.min(custoTotal30_dc1, custoTotal30_dc2, custoTotal30_dc3)
        );

        // deixo o valor default
        let menorCustoTotal30_dc = 1;

        if (menorCustoTotal30 === custoTotal30_dc2) {
          menorCustoTotal30_dc = 2;
        } else if (menorCustoTotal30 === custoTotal30_dc3) {
          menorCustoTotal30_dc = 3;
        }

        data_center_total.innerHTML = menorCustoTotal30_dc;
        data_center_investir.innerHTML = menorCustoTotal30_dc;
        custo_total.innerHTML = menorCusto30;

        // Calcular o Custo Médio 30 dias

        fetch("http://localhost:3333/adm/alertas/30d").then((res) => {
          res.json().then((resjson) => {
            let total_alertas_30 = resjson[0].total_alertas;

            custoMedio30_dc1 = Math.ceil(custoTotal30_dc1 / total_alertas_30);
            custoMedio30_dc2 = Math.ceil(custoTotal30_dc2 / total_alertas_30);
            custoMedio30_dc3 = Math.ceil(custoTotal30_dc3 / total_alertas_30);

            let menorCustoMedio30 = Math.ceil(
              Math.min(custoMedio30_dc1, custoMedio30_dc2, custoMedio30_dc3)
            );

            // deixo o valor default
            let menorCustoMedio30_dc = 1;

            if (menorCustoMedio30 === custoMedio30_dc2) {
              menorCustoMedio30_dc = 2;
            } else if (menorCustoMedio30 === custoMedio30_dc3) {
              menorCustoMedio30_dc = 3;
            }

            data_center_medio.innerHTML = menorCustoMedio30_dc;
            data_center_investir.innerHTML = menorCustoMedio30_dc;
            custo_medio.innerHTML = menorCustoMedio30;
          });
        });
      });
    });
  }
}

function selecionar(selecionado) {
  const filtros = document.querySelectorAll(".filtro");

  filtros.forEach((f) => f.classList.remove("selecionado"));
  selecionado.classList.add("selecionado");
}
