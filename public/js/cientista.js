var servidor1 = { cpu: 23, ram: 87, disco: 60 };
var servidor2 = { cpu: 67, ram: 44, disco: 56 };
var servidor3 = { cpu: 85, ram: 36, disco: 44 };

var corServidor1 = 'rgb(73, 139, 73)'
var corServidor2 = 'rgb(216, 89, 4)'
var corServidor3 = 'rgb(45, 99, 158)' 

var alertas = [
  { valor: 85, unidade: '%', componente: 'RAM', nivel: 'Atenção', servidor: 'Servidor 1', data: '11-04-2025 10:12' },
  { valor: 91, unidade: '%', componente: 'CPU', nivel: 'crítico', servidor: 'Servidor 3', data: '11-04-2025 09:47' },
  { valor: 88, unidade: '%', componente: 'DISCO', nivel: 'Atenção', servidor: 'Servidor 1', data: '10-04-2025 18:32' },
  { valor: 93, unidade: '%', componente: 'CPU', nivel: 'crítico', servidor: 'Servidor 2', data: '10-04-2025 15:14' },
  { valor: 82, unidade: '%', componente: 'RAM', nivel: 'Atenção', servidor: 'Servidor 3', data: '09-04-2025 12:05' },
  { valor: 95, unidade: '%', componente: 'DISCO', nivel: 'crítico', servidor: 'Servidor 2', data: '08-04-2025 14:23' },
  { valor: 88, unidade: '%', componente: 'CPU', nivel: 'Atenção', servidor: 'Servidor 1', data: '07-04-2025 11:45' },
  { valor: 91, unidade: '%', componente: 'DISCO', nivel: 'crítico', servidor: 'Servidor 3', data: '06-04-2025 13:09' },
  { valor: 84, unidade: '%', componente: 'RAM', nivel: 'Atenção', servidor: 'Servidor 2', data: '06-04-2025 10:55' },
  { valor: 92, unidade: '%', componente: 'RAM', nivel: 'crítico', servidor: 'Servidor 1', data: '05-04-2025 08:30' },
  { valor: 85, unidade: '%', componente: 'CPU', nivel: 'Atenção', servidor: 'Servidor 2', data: '04-04-2025 16:40' },
  { valor: 83, unidade: '%', componente: 'RAM', nivel: 'Atenção', servidor: 'Servidor 3', data: '03-04-2025 19:02' },
  { valor: 94, unidade: '%', componente: 'CPU', nivel: 'crítico', servidor: 'Servidor 3', data: '02-04-2025 17:21' },
  { valor: 92, unidade: '%', componente: 'DISCO', nivel: 'crítico', servidor: 'Servidor 2', data: '01-04-2025 13:36' },
  { valor: 89, unidade: '%', componente: 'DISCO', nivel: 'Atenção', servidor: 'Servidor 1', data: '31-03-2025 15:10' }
];



function mudarAtributoRanking() {
  var atributoAtual = document.getElementById("slt_ranking").value;
  var html = '';

  if (atributoAtual == "cpu") {
    html = `
      Servidor 1 - <b style="color: ${servidor1.cpu >= 90 ? 'red' : servidor1.cpu >= 80 ? 'yellow' : 'white'};">${servidor1.cpu}%</b><br>
      Servidor 2 - <b style="color: ${servidor2.cpu >= 90 ? 'red' : servidor2.cpu >= 80 ? 'yellow' : 'white'};">${servidor2.cpu}%</b><br>
      Servidor 3 - <b style="color: ${servidor3.cpu >= 90 ? 'red' : servidor3.cpu >= 80 ? 'yellow' : 'white'};">${servidor3.cpu}%</b><br>
    `;
  } else if (atributoAtual == "ram") {
    html = `
      Servidor 1 - <b style="color: ${servidor1.ram >= 90 ? 'red' : servidor1.ram >= 80 ? 'yellow' : 'white'};">${servidor1.ram}%</b><br>
      Servidor 2 - <b style="color: ${servidor2.ram >= 90 ? 'red' : servidor2.ram >= 80 ? 'yellow' : 'white'};">${servidor2.ram}%</b><br>
      Servidor 3 - <b style="color: ${servidor3.ram >= 90 ? 'red' : servidor3.ram >= 80 ? 'yellow' : 'white'};">${servidor3.ram}%</b><br>
    `;
  } else if (atributoAtual == "disco") {
    html = `
      Servidor 1 - <b style="color: ${servidor1.disco >= 90 ? 'red' : servidor1.disco >= 80 ? 'yellow' : 'white'};">${servidor1.disco}%</b><br>
      Servidor 2 - <b style="color: ${servidor2.disco >= 90 ? 'red' : servidor2.disco >= 80 ? 'yellow' : 'white'};">${servidor2.disco}%</b><br>
      Servidor 3 - <b style="color: ${servidor3.disco >= 90 ? 'red' : servidor3.disco >= 80 ? 'yellow' : 'white'};">${servidor3.disco}%</b><br>
    `;
  }

  document.getElementById("ranking").innerHTML = html;
}

function mudarAtributoDesempenho() {
  var atributoAtual = document.getElementById("slt_desempenho").value;

  if (atributoAtual == 'cpu') {
    grafico_desempenho.data.datasets[0].label = 'Uso médio de CPU (%)';
    grafico_desempenho.data.datasets[0].data = [8, 45, 31, 31, 11, 19, 20, 22, 8];
  } else if (atributoAtual == 'ram') {
    grafico_desempenho.data.datasets[0].label = 'Uso médio de RAM (%)';
    grafico_desempenho.data.datasets[0].data = [20, 85, 72, 67, 45, 53, 66, 70, 20];
  } else if (atributoAtual == 'disco') {
    grafico_desempenho.data.datasets[0].label = 'Uso médio de Disco (%)';
    grafico_desempenho.data.datasets[0].data = [20, 21, 21, 21, 21, 21, 21, 22, 22];
  }

  grafico_desempenho.update();
}

function mostrarRankingServidores() {
  const rankingContainer = document.getElementById("ranking_servidores");
  const tipoRanking = document.getElementById("slt_ranking").value;
  
  const servidores = [
    { nome: "Server_1", cpu: 87, ram: 76, disco: 58 },
    { nome: "Server_2", cpu: 44, ram: 42, disco: 57 },
    { nome: "Server_3", cpu: 36, ram: 35, disco: 43 }
  ];
  
  servidores.sort((a, b) => b[tipoRanking] - a[tipoRanking]);
  
  rankingContainer.innerHTML = '';
  
  let table = `
    <table class="ranking-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Servidor</th>
          <th>(%)</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  servidores.forEach((servidor, index) => {
    table += `
      <tr>
        <td>${index + 1}º</td>
        <td>${servidor.nome}</td>
        <td>${servidor[tipoRanking]}%</td>
      </tr>
    `;
  });
  
  table += `
      </tbody>
    </table>
  `;
  
  rankingContainer.innerHTML = table;
}

function mudarAtributoRanking() {
  mostrarRankingServidores();
}

function contarAlertasCriticos(){
  let contagem = 0;
  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i].nivel === 'crítico') {
      contagem++;
    }
  }
  alertas_criticos.innerHTML = contagem;
  alertas_criticos.style.color = 'red';
}

function contarAlertasAtencao(){
  let contagem = 0;
  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i].nivel === 'Atenção') {
      contagem++;
    }
  }
  alertas_atencao.innerHTML = contagem;
  alertas_atencao.style.color = 'yellow';
}

function abrirModalAlertas() {
  const modal = document.getElementById("modalAlertas");
  const container = document.getElementById("alertasModalContent");
  container.innerHTML = '';

  for (let i = 0; i < alertas.length; i++) {
    let cor = alertas[i].nivel === 'crítico' ? 'red' : 'yellow';

    container.innerHTML += `
      <p style="color: ${cor}; font-weight: bold;">
        ⚠️ ${alertas[i].nivel.toUpperCase()} - Alerta de <b>${alertas[i].componente}</b> no <b>${alertas[i].servidor}</b>: 
        ${alertas[i].valor}% em ${alertas[i].data}
      </p>
      <hr style="border-color: #fefca4;">
    `;
  }

  modal.style.display = "block";
}

function fecharModalAlertas() {
  document.getElementById("modalAlertas").style.display = "none";
}

function mudarAtributoPico() {
  var slt_pico = document.getElementById("slt_pico").value;

  var alertascomponente = alertas.filter(a => a.componente.toLowerCase() === slt_pico.toLowerCase());

  var maiorValor = 0;
  for (let i = 0; i < alertascomponente.length; i++) {
    if (alertascomponente[i].valor > maiorValor) {
      maiorValor = alertascomponente[i].valor;
    }
  }

  var alertaPico = alertascomponente.find(a => a.valor === maiorValor);
  valor_pico.innerHTML = `<span>
    ${maiorValor}%</span><br>
    
  `;
  valor_pico.style.color = maiorValor >= 90 ? 'red' : maiorValor >= 80 ? 'yellow' : 'white';
}

var graph_comparacao = null;
function gerarGraficoComparacao(){

  var grafico_comparacoes =new Chart(document.getElementById('grafico_comparacao'), {
    type: 'bar',
    data: {
    labels: ['CPU (%)', 'RAM (%)', 'Disco (%)'],
    datasets: [
      { label: 'Servidor 1', data: [23, 87, 60], backgroundColor: corServidor1 },
      { label: 'Servidor 2', data: [67, 44, 56], backgroundColor: corServidor2 },
      { label: 'Servidor 3', data: [85, 36, 44], backgroundColor: corServidor3 }
    ]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            family: 'Segoe UI',
            size: 14,
            weight: '600'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            family: 'Segoe UI',
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: 'white'
        }
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            family: 'Segoe UI',
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: 'white'
        }
      }
    }
  }
});
graph_comparacao = grafico_comparacoes;
}

console.log(graph_comparacao)

function mudarAtributoProporcao() {
  var slt_proporcao = document.getElementById("slt_proporcao").value;
  var dados = [];

  if (slt_proporcao == 'cpu') {
    dados = [servidor1.cpu, servidor2.cpu, servidor3.cpu];
  } else if (slt_proporcao == 'ram') {
    dados = [servidor1.ram, servidor2.ram, servidor3.ram];
  } else if (slt_proporcao == 'disco') {
    dados = [servidor1.disco, servidor2.disco, servidor3.disco];
  }

  grafico_proporcao.data.datasets[0].data = dados;
  grafico_proporcao.update();
}

var grafico_proporcao = null
function gerarGraficoProporcao(){
  var grafico_proporcao_js = new Chart(document.getElementById('grafico_proporcao'), {
    type: 'pie',
    data: {
      labels: ['Servidor 1', 'Servidor 2', 'Servidor 3'],
      datasets: [{
        label: 'Uso de recursos',
        data: [45, 87, 60],
        backgroundColor: [
          corServidor1,
          corServidor2,
          corServidor3
        ],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: {
              family: 'Segoe UI',
              size: 14,
              weight: '600'
            }
          }
        }
      },
          },
        },
      );

      grafico_proporcao = grafico_proporcao_js;
}

var grafico_desempenho = null
function gerarGraficoDesempenho(){
  var grafico_desempenhos = new Chart(document.getElementById('grafico_desempenho'), {
    type: 'line',
    data: {
      labels: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [{
        label: 'Uso médio de (%)',
        data: [20, 85, 72, 67, 45, 53, 66, 70, 20],
        borderColor: '#17a2b8',
        backgroundColor: 'rgba(23,162,184,0.2)',
        fill: true
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#fefca4',
            font: {
              family: 'Segoe UI',
              size: 14,
              weight: '600'
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
            font: {
              family: 'Segoe UI',
              size: 14,
              weight: '600'
            }
          },
          grid: {
            color: '#1e3a5f'
          }
        },
        y: {
          ticks: {
            color: 'white',
            font: {
              family: 'Segoe UI',
              size: 14,
              weight: '600'
            }
          },
          grid: {
            color: 'white'
          }
        }
      }
    }
  });
  grafico_desempenho = grafico_desempenhos;
}

