// CÁLCULOS:

// CUSTO TOTAL = VALOR TOTAL * TEMPO_MEDIO(TEMPO) * TEMPO
// ex CUSTO TOTAL 30D = VALOR TOTAL(30D) * TEMPO_MEDIO(30D) * 30

// CUSTO MÉDIO POR MANUTENÇÃO = CUSTO TOTAL / QTD ALERTAS

let corGrafico = "#28a745";

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

let minutos24_dc1 = 0;
let minutos24_dc2 = 0;
let minutos24_dc3 = 0;

let minutos7_dc1 = 0;
let minutos7_dc2 = 0;
let minutos7_dc3 = 0;

let minutos30_dc1 = 0;
let minutos30_dc2 = 0;
let minutos30_dc3 = 0;

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

//

let quocientemaiorCusto24 = 0;
let restomaiorCusto24 = 0;

let quocientemaiorCusto7 = 0;
let restomaiorCusto7 = 0;

let quocientemaiorCustoTotal7 = 0;
let restomaiorCustoTotal7 = 0;

let quocientemaiorCustoMedio7 = 0;
let restomaiorCustoMedio7 = 0;

let quocientemaiorCusto30 = 0;
let restomaiorCusto30 = 0;

let quocientemaiorCustoTotal30 = 0;
let restomaiorCustoTotal30 = 0;

let quocientemaiorCustoMedio30 = 0;
let restomaiorCustoMedio30 = 0;

//

let quocientemaiorCustoTotal24_dc1 = 0;
let restomaiorCustoTotal24_dc1 = 0;

let quocientemaiorCustoTotal24_dc2 = 0;
let restomaiorCustoTotal24_dc2 = 0;

let quocientemaiorCustoTotal24_dc3 = 0;
let restomaiorCustoTotal24_dc3 = 0;

//

let quocientemaiorCustoMedio24_dc1 = 0;
let restomaiorCustoMedio24_dc1 = 0;

let quocientemaiorCustoMedio24_dc2 = 0;
let restomaiorCustoMedio24_dc2 = 0;

let quocientemaiorCustoMedio24_dc3 = 0;
let restomaiorCustoMedio24_dc3 = 0;

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
      data: [],
    },
  ],
  xaxis: {
    categories: ["Data Center 1", "Data Center 2", "Data Center 3"],
  },
  colors: [corGrafico],
};

var chart = new ApexCharts(document.querySelector("#grafico"), options);
chart.render();

function carregar() {
  array_transacao_dc1.length = 0;
  array_transacao_dc2.length = 0;
  array_transacao_dc3.length = 0;

  valor24_dc1 = 0;
  valor24_dc2 = 0;
  valor24_dc3 = 0;

  valorHora24_dc1 = 0;
  valorHora24_dc2 = 0;
  valorHora24_dc3 = 0;

  horas24_dc1 = 0;
  horas24_dc2 = 0;
  horas24_dc3 = 0;

  minutos24_dc1 = 0;
  minutos24_dc2 = 0;
  minutos24_dc3 = 0;

  custoHora24_dc1 = 0;
  custoHora24_dc2 = 0;
  custoHora24_dc3 = 0;

  custoMedio24_dc1 = 0;
  custoMedio24_dc2 = 0;
  custoMedio24_dc3 = 0;

  custoTotal24_dc1 = 0;
  custoTotal24_dc2 = 0;
  custoTotal24_dc3 = 0;

  valor7_dc1 = 0;
  valor7_dc2 = 0;
  valor7_dc3 = 0;

  valor30_dc1 = 0;
  valor30_dc2 = 0;
  valor30_dc3 = 0;

  quocientemaiorCusto24 = 0;
  restomaiorCusto24 = 0;

  quocientemaiorCustoTotal24_dc1 = 0;
  restomaiorCustoTotal24_dc1 = 0;

  quocientemaiorCustoTotal24_dc2 = 0;
  restomaiorCustoTotal24_dc2 = 0;

  quocientemaiorCustoTotal24_dc3 = 0;
  restomaiorCustoTotal24_dc3 = 0;

  quocientemaiorCustoMedio24_dc1 = 0;
  restomaiorCustoMedio24_dc1 = 0;

  quocientemaiorCustoMedio24_dc2 = 0;
  restomaiorCustoMedio24_dc2 = 0;

  quocientemaiorCustoMedio24_dc3 = 0;
  restomaiorCustoMedio24_dc3 = 0;

  tempoSelecionado = 24;

  if (tempoSelecionado === 24) {
    // Coletar os dados de transação:

    fetch("http://3.230.80.85:3000/pix/pegarPix").then((res) => {
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

        for (let i = 0; i < array_transacao_dc1.length; i++) {
          if (i == 0) {
            valor24_dc1 += array_transacao_dc1[i];
            valor24_dc2 += array_transacao_dc2[i];
            valor24_dc3 += array_transacao_dc3[i];
          } else if (i < 7) {
            valor7_dc1 += array_transacao_dc1[i];
            valor7_dc2 += array_transacao_dc2[i];
            valor7_dc3 += array_transacao_dc3[i];
          } else if (i < 30) {
            valor30_dc1 += array_transacao_dc1[i];
            valor30_dc2 += array_transacao_dc2[i];
            valor30_dc3 += array_transacao_dc3[i];
          }
        }

        valorHora24_dc1 = Math.ceil(valor24_dc1 / 24);

        valorHora24_dc2 = Math.floor(valor24_dc2 / 24);

        valorHora24_dc3 = Math.floor(valor24_dc3 / 24);

        console.log("Valor Hora 24h DC1: " + valorHora24_dc1);
        console.log("Valor Hora 24h DC2: " + valorHora24_dc2);
        console.log("Valor Hora 24h DC3: " + valorHora24_dc3);

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
              const minuto_atual = Number(resjson[i].tempo_medio_minutos);

              if (dataCenter_atual == "Data Center 1") {
                minutos24_dc1 = minuto_atual;
              } else if (dataCenter_atual == "Data Center 2") {
                minutos24_dc2 = minuto_atual;
              } else {
                minutos24_dc3 = minuto_atual;
              }
            }

            console.log("Minutos 24h DC1: " + minutos24_dc1);
            console.log("Minutos 24h DC2:  " + minutos24_dc2);
            console.log("Minutos 24h DC3: " + minutos24_dc3);

            horas24_dc1 = Math.ceil(minutos24_dc1 / 60);
            horas24_dc2 = Math.ceil(minutos24_dc2 / 60);
            horas24_dc3 = Math.ceil(minutos24_dc3 / 60);

            console.log("Horas 24h DC1: " + horas24_dc1);
            console.log("Horas 24h DC2: " + horas24_dc2);
            console.log("Horas 24h DC3: " + horas24_dc3);

            valorHora24_dc1 = Math.ceil(valor24_dc1 / 24);
            valorHora24_dc2 = Math.ceil(valor24_dc2 / 24);
            valorHora24_dc3 = Math.ceil(valor24_dc3 / 24);

            console.log("Valor Hora 24h DC1: " + valorHora24_dc1);
            console.log("Valor Hora 24h DC2: " + valorHora24_dc2);
            console.log("Valor Hora 24h DC3: " + valorHora24_dc3);

            custoHora24_dc1 = Math.ceil(valorHora24_dc1 * horas24_dc1);
            custoHora24_dc2 = Math.ceil(valorHora24_dc2 * horas24_dc2);
            custoHora24_dc3 = Math.ceil(valorHora24_dc3 * horas24_dc3);

            console.log("Custo Hora 24h DC1: " + custoHora24_dc1);
            console.log("Custo Hora 24h DC2: " + custoHora24_dc2);
            console.log("Custo Hora 24h DC3: " + custoHora24_dc3);

            let maiorCusto24 = Math.ceil(
              Math.max(custoHora24_dc1, custoHora24_dc2, custoHora24_dc3)
            );

            // deixo o valor default
            let maiorCusto24_dc = 1;

            if (maiorCusto24 === custoHora24_dc2) {
              maiorCusto24_dc = 2;
            } else if (maiorCusto24 === custoHora24_dc3) {
              maiorCusto24_dc = 3;
            }

            quocientemaiorCusto24 = maiorCusto24 / 10;
            restomaiorCusto24 = maiorCusto24 % 10;

            data_center_custo.innerHTML = maiorCusto24_dc;
            data_center_investir.innerHTML = maiorCusto24_dc;
            custo_hora.innerHTML = maiorCusto24;

            // Calcular o Custo Total
            // CUSTO TOTAL = VALOR TOTAL * TEMPO_MEDIO(TEMPO) * TEMPO
            // ex CUSTO TOTAL 30D = VALOR TOTAL(30D) * TEMPO_MEDIO(30D) * 30

            custoTotal24_dc1 = Math.ceil(valor24_dc1 * horas24_dc1);
            custoTotal24_dc2 = Math.ceil(valor24_dc2 * horas24_dc2);
            custoTotal24_dc3 = Math.ceil(valor24_dc3 * horas24_dc3);

            console.log("Custo Total 24 DC1: " + custoTotal24_dc1);
            console.log("Custo Total 24 DC2: " + custoTotal24_dc2);
            console.log("Custo Total 24 DC3: " + custoTotal24_dc3);

            // atualziar gráfico com custo total
            chart.updateSeries([
              {
                data: [custoTotal24_dc1, custoTotal24_dc2, custoTotal24_dc3],
              },
            ]);

            // para se alinhar com a KPI de Custo por hora de manutencao
            data_center_total.innerHTML = maiorCusto24_dc;

            // quocientemaiorCustoTotal24_dc1 = custoTotal24_dc1 / 1000;
            // restomaiorCustoTotal24_dc1 = custoTotal24_dc1 % 1000;

            // quocientemaiorCustoTotal24_dc2 = custoTotal24_dc2 / 1000;
            // restomaiorCustoTotal24_dc2 = custoTotal24_dc2 % 1000;

            // quocientemaiorCustoTotal24_dc3 = custoTotal24_dc3 / 1000;
            // restomaiorCustoTotal24_dc3 = custoTotal24_dc3 % 1000;

            if (maiorCusto24_dc == 1) {
              custo_total.innerHTML = custoTotal24_dc1;
            } else if (maiorCusto24_dc == 2) {
              custo_total.innerHTML = custoTotal24_dc2;
            } else if (maiorCusto24_dc == 3) {
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

                data_center_medio.innerHTML = maiorCusto24_dc;

                // quocientemaiorCustoMedio24_dc1 = custoMedio24_dc1;
                // restomaiorCustoMedio24_dc1 = custoMedio24_dc1;

                // quocientemaiorCustoMedio24_dc2 = custoMedio24_dc2;
                // restomaiorCustoMedio24_dc2 = custoMedio24_dc2;

                // quocientemaiorCustoMedio24_dc3 = custoMedio24_dc3;
                // restomaiorCustoMedio24_dc3 = custoMedio24_dc3;

                if (maiorCusto24_dc == 1) {
                  custo_medio.innerHTML = custoMedio24_dc1;
                } else if (maiorCusto24_dc == 2) {
                  custo_medio.innerHTML = custoMedio24_dc2;
                } else if (maiorCusto24_dc == 3) {
                  custo_medio.innerHTML = custoMedio24_dc3;
                }
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
  tempoSelecionado = tempo;

  if (tempo === 24) {
    carregar();
    return;
  } else if (tempo == 7) {
    fetch("/adm/datacenter/media-resolucao/victao/7d").then((res) => {
      res.json().then((resjson) => {
        for (let i = 0; i < resjson.length; i++) {
          const dataCenter_atual = resjson[i].data_center;
          const hora_atual = Number(resjson[i].tempo_medio_horas);
          const minuto_atual = Number(resjson[i].tempo_medio_minutos);

          if (dataCenter_atual == "Data Center 1") {
            minutos7_dc1 = minuto_atual;
          } else if (dataCenter_atual == "Data Center 2") {
            minutos7_dc2 = minuto_atual;
          } else {
            minutos7_dc3 = minuto_atual;
          }
        }

        console.log("Minutos 7d DC1: " + minutos7_dc1);
        console.log("Minutos 7d DC2: " + minutos7_dc2);
        console.log("Minutos 7d DC3: " + minutos7_dc3);

        horas7_dc1 = Math.ceil(minutos7_dc1 / 60);
        horas7_dc2 = Math.ceil(minutos7_dc2 / 60);
        horas7_dc3 = Math.ceil(minutos7_dc3 / 60);

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

        console.log("Custo Hora 7d DC1: " + custoHora7_dc1);
        console.log("Custo Hora 7d DC2: " + custoHora7_dc2);
        console.log("Custo Hora 7d DC3: " + custoHora7_dc3);

        let maiorCusto7 = Math.ceil(
          Math.max(custoHora7_dc1, custoHora7_dc2, custoHora7_dc3)
        );

        console.warn("QuocientemaiorCustoHora7: " + quocientemaiorCusto7);
        console.warn("RestomaiorCustoHora7: " + restomaiorCusto7);

        quocientemaiorCusto7 = maiorCusto7 / 10;
        restomaiorCusto7 = maiorCusto7 % 10;

        // deixo o valor default
        let maiorCusto7_dc = 1;

        if (maiorCusto7 === custoHora7_dc2) {
          maiorCusto7_dc = 2;
        } else if (maiorCusto7 === custoHora7_dc3) {
          maiorCusto7_dc = 3;
        }

        data_center_custo.innerHTML = maiorCusto7_dc;
        data_center_investir.innerHTML = maiorCusto7_dc;
        custo_hora.innerHTML = maiorCusto7;

        // Calcular o Custo Total
        custoTotal7_dc1 = Math.ceil(valor7_dc1 * horas7_dc1);
        custoTotal7_dc2 = Math.ceil(valor7_dc2 * horas7_dc2);
        custoTotal7_dc3 = Math.ceil(valor7_dc3 * horas7_dc3);

        console.log("Custo Total 7 DC1: " + custoTotal7_dc1);
        console.log("Custo Total 7 DC2: " + custoTotal7_dc2);
        console.log("Custo Total 7 DC3: " + custoTotal7_dc3);

        let maiorCustoTotal7 = Math.ceil(
          Math.max(custoTotal7_dc1, custoTotal7_dc2, custoTotal7_dc3)
        );

        quocientemaiorCustoTotal7 = maiorCustoTotal7 / 1000;
        restomaiorCustoTotal7 = maiorCustoTotal7 % 1000;

        console.warn("QuocientemaiorCustoTotal7: " + quocientemaiorCustoTotal7);
        console.warn("RestomaiorCustoTotal7: " + restomaiorCustoTotal7);

        // atualziar gráfico com custo total
        chart.updateSeries([
          {
            data: [custoTotal7_dc1, custoTotal7_dc2, custoTotal7_dc3],
          },
        ]);

        // deixo o valor default
        let maiorCustoTotal7_dc = 1;

        if (maiorCustoTotal7 === custoTotal7_dc2) {
          maiorCustoTotal7_dc = 2;
        } else if (maiorCustoTotal7 === custoTotal7_dc3) {
          maiorCustoTotal7_dc = 3;
        }

        data_center_total.innerHTML = maiorCustoTotal7_dc;
        data_center_investir.innerHTML = maiorCustoTotal7_dc;
        custo_total.innerHTML = maiorCustoTotal7;

        // Calcular o Custo Médio 7 dias

        fetch("/adm/alertas/7d").then((res) => {
          res.json().then((resjson) => {
            let total_alertas_7 = resjson[0].total_alertas;

            custoMedio7_dc1 = custoTotal7_dc1 / total_alertas_7;
            custoMedio7_dc2 = custoTotal7_dc2 / total_alertas_7;
            custoMedio7_dc3 = custoTotal7_dc3 / total_alertas_7;

            let maiorCustoMedio7 = Math.ceil(
              Math.max(custoMedio7_dc1, custoMedio7_dc2, custoMedio7_dc3)
            );

            quocientemaiorCustoMedio7 = maiorCustoMedio7 / 10;
            restomaiorCustoMedio7 = maiorCustoMedio7 % 10;

            console.warn(
              "QuocientemaiorCustoMedio7: " + quocientemaiorCustoMedio7
            );
            console.warn("RestomaiorCustoMedio7: " + restomaiorCustoMedio7);

            // deixo o valor default
            let maiorCustoMedio7_dc = 1;

            console.warn("Custo Medio 7 DC1: " + custoMedio7_dc1);
            console.warn("Custo Medio 7 DC2: " + custoMedio7_dc2);
            console.warn("Custo Medio 7 DC3: " + custoMedio7_dc3);

            if (maiorCustoMedio7 === custoMedio7_dc2) {
              maiorCustoMedio7_dc = 2;
            } else if (maiorCustoMedio7 === custoMedio7_dc3) {
              maiorCustoMedio7_dc = 3;
            }

            data_center_medio.innerHTML = maiorCustoMedio7_dc;
            data_center_investir.innerHTML = maiorCustoMedio7_dc;
            custo_medio.innerHTML = maiorCustoMedio7;
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
          const minuto_atual = Number(resjson[i].tempo_medio_minutos);

          if (dataCenter_atual == "Data Center 1") {
            minutos30_dc1 = minuto_atual;
          } else if (dataCenter_atual == "Data Center 2") {
            minutos30_dc2 = minuto_atual;
          } else {
            minutos30_dc3 = minuto_atual;
          }

          console.log("Minutos 30d DC1 (filtrar): " + minutos30_dc1);
          console.log("Minutos 30d DC2 (filtrar): " + minutos30_dc2);
          console.log("Minutos 30d DC3 (filtrar): " + minutos30_dc3);

          horas30_dc1 = Math.ceil(minutos30_dc1 / 60);
          horas30_dc2 = Math.ceil(minutos30_dc2 / 60);
          horas30_dc3 = Math.ceil(minutos30_dc3 / 60);

          console.log("Horas 30d DC1 (filtrar): " + horas30_dc1);
          console.log("Horas 30d DC2 (filtrar): " + horas30_dc2);
          console.log("Horas 30d DC3 (filtrar): " + horas30_dc3);

          valorHora30_dc1 = Math.floor(valor30_dc1 / 30 / 24);
          valorHora30_dc2 = Math.floor(valor30_dc2 / 30 / 24);
          valorHora30_dc3 = Math.floor(valor30_dc3 / 30 / 24);

          console.log("Valor Hora 30d DC1 (filtrar): " + valorHora30_dc1);
          console.log("Valor Hora 30d DC2 (filtrar): " + valorHora30_dc2);
          console.log("Valor Hora 30d DC3 (filtrar): " + valorHora30_dc3);

          custoHora30_dc1 = Math.ceil(valorHora30_dc1 * horas30_dc1);
          custoHora30_dc2 = Math.ceil(valorHora30_dc2 * horas30_dc2);
          custoHora30_dc3 = Math.ceil(valorHora30_dc3 * horas30_dc3);

          console.log("Custo Hora 30d DC1 (filtrar): " + custoHora30_dc1);
          console.log("Custo Hora 30d DC2 (filtrar): " + custoHora30_dc2);
          console.log("Custo Hora 30d DC3 (filtrar): " + custoHora30_dc3);

          let maiorCusto30 = Math.ceil(
            Math.max(custoHora30_dc1, custoHora30_dc2, custoHora30_dc3)
          );

          quocientemaiorCusto30 = maiorCusto30 / 10;
          restomaiorCusto30 = maiorCusto30 % 10;

          console.warn("QuocientemaiorCustoHora30: " + quocientemaiorCusto30);
          console.warn("RestomaiorCustoHora30: " + restomaiorCusto30);

          // deixo o valor default
          let maiorCusto30_dc = 1;

          if (maiorCusto30 === custoHora30_dc2) {
            maiorCusto30_dc = 2;
          } else if (maiorCusto30 === custoHora30_dc3) {
            maiorCusto30_dc = 3;
          }

          data_center_custo.innerHTML = maiorCusto30_dc;
          data_center_investir.innerHTML = maiorCusto30_dc;
          custo_hora.innerHTML = maiorCusto30;

          // Calcular o Custo Total 30 dias
          custoTotal30_dc1 = Math.ceil(valor30_dc1 * horas30_dc1);
          custoTotal30_dc2 = Math.ceil(valor30_dc2 * horas30_dc2);
          custoTotal30_dc3 = Math.ceil(valor30_dc3 * horas30_dc3);

          console.log("Custo Total 30 DC1: " + custoTotal30_dc1);
          console.log("Custo Total 30 DC2: " + custoTotal30_dc2);
          console.log("Custo Total 30 DC3: " + custoTotal30_dc3);

          // atualziar gráfico com custo total
          chart.updateSeries([
            {
              data: [custoTotal30_dc1, custoTotal30_dc2, custoTotal30_dc3],
            },
          ]);

          let maiorCustoTotal30 = Math.floor(
            Math.max(custoTotal30_dc1, custoTotal30_dc2, custoTotal30_dc3)
          );

          quocientemaiorCustoTotal30 = maiorCustoTotal30 / 1000;
          restomaiorCustoTotal30 = maiorCustoTotal30 % 1000;

          console.warn(
            "QuocientemaiorCustoTotal30: " + quocientemaiorCustoTotal30
          );
          console.warn("RestomaiorCustoTotal30: " + restomaiorCustoTotal30);

          // deixo o valor default
          let maiorCustoTotal30_dc = 1;

          if (maiorCustoTotal30 === custoTotal30_dc2) {
            maiorCustoTotal30_dc = 2;
          } else if (maiorCustoTotal30 === custoTotal30_dc3) {
            maiorCustoTotal30_dc = 3;
          }

          data_center_total.innerHTML = maiorCustoTotal30_dc;
          data_center_investir.innerHTML = maiorCustoTotal30_dc;
          custo_total.innerHTML = maiorCustoTotal30;

          // Calcular o Custo Médio 30 dias
          fetch("/adm/alertas/30d").then((res) => {
            res.json().then((resjson) => {
              let total_alertas_30 = resjson[0].total_alertas;

              custoMedio30_dc1 = Math.ceil(custoTotal30_dc1 / total_alertas_30);
              custoMedio30_dc2 = Math.ceil(custoTotal30_dc2 / total_alertas_30);
              custoMedio30_dc3 = Math.ceil(custoTotal30_dc3 / total_alertas_30);

              let maiorCustoMedio30 = Math.ceil(
                Math.max(custoMedio30_dc1, custoMedio30_dc2, custoMedio30_dc3)
              );

              quocientemaiorCustoMedio30 = maiorCustoMedio30 / 10;
              restomaiorCustoMedio30 = maiorCustoMedio30 % 10;

              console.warn(
                "QuocientemaiorCustoMedio30: " + quocientemaiorCustoMedio30
              );
              console.warn("RestomaiorCustoMedio30: " + restomaiorCustoMedio30);

              // deixo o valor default
              let maiorCustoMedio30_dc = 1;

              console.log("Custo Medio 30d DC1: " + custoMedio30_dc1);
              console.log("Custo Medio 30d DC2: " + custoMedio30_dc2);
              console.log("Custo Medio 30d DC3: " + custoMedio30_dc3);

              if (maiorCustoMedio30 === custoMedio30_dc2) {
                maiorCustoMedio30_dc = 2;
              } else if (maiorCustoMedio30 === custoMedio30_dc3) {
                maiorCustoMedio30_dc = 3;
              }

              data_center_medio.innerHTML = maiorCustoMedio30_dc;
              data_center_investir.innerHTML = maiorCustoMedio30_dc;
              custo_medio.innerHTML = maiorCustoMedio30;
            });
          });
        }
      });
    });
  }
}

function selecionar(selecionado) {
  const filtros = document.querySelectorAll(".filtro");

  filtros.forEach((f) => f.classList.remove("selecionado"));
  selecionado.classList.add("selecionado");
}
