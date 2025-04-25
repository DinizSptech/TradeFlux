var dadosTotais

var dadosServidores = [
  {
    'servidor': 'Servidor 1',
    'dados': [
      {
        'Momento': '2023-10-01 09:00:00',
        'ram': 90,
        'cpu': 95,
        'disco': 85
      },
      {
        'Momento': '2023-10-01 10:00:00',
        'ram': 60,
        'cpu': 70,
        'disco': 50
      },
      {
        'Momento': '2023-10-01 11:00:00',
        'ram': 55,
        'cpu': 65,
        'disco': 60
      },
      {
        'Momento': '2023-10-01 12:00:00',
        'ram': 70,
        'cpu': 80,
        'disco': 75
      },
      {
        'Momento': '2023-10-01 13:00:00',
        'ram': 95,
        'cpu': 90,
        'disco': 80
      },
      {
        'Momento': '2023-10-01 14:00:00',
        'ram': 50,
        'cpu': 55,
        'disco': 65
      },
      {
        'Momento': '2023-10-01 15:00:00',
        'ram': 45,
        'cpu': 50,
        'disco': 55
      },
      {
        'Momento': '2023-10-01 16:00:00',
        'ram': 40,
        'cpu': 45,
        'disco': 50
      },
      {
        'Momento': '2023-10-01 17:00:00',
        'ram': 35,
        'cpu': 40,
        'disco': 45
      },
      {
        'Momento': '2023-10-01 18:00:00',
        'ram': 30,
        'cpu': 35,
        'disco': 40
      }
    ]
  },
  {
    'servidor': 'Servidor 2',
    'dados': [
      {
        'Momento': '2023-10-01 09:00:00',
        'ram': 85,
        'cpu': 90,
        'disco': 95
      },
      {
        'Momento': '2023-10-01 10:00:00',
        'ram': 55,
        'cpu': 65,
        'disco': 60
      },
      {
        'Momento': '2023-10-01 11:00:00',
        'ram': 50,
        'cpu': 60,
        'disco': 70
      },
      {
        'Momento': '2023-10-01 12:00:00',
        'ram': 75,
        'cpu': 80,
        'disco': 85
      },
      {
        'Momento': '2023-10-01 13:00:00',
        'ram': 90,
        'cpu': 95,
        'disco': 90
      },
      {
        'Momento': '2023-10-01 14:00:00',
        'ram': 45,
        'cpu': 50,
        'disco': 55
      },
      {
        'Momento': '2023-10-01 15:00:00',
        'ram': 40,
        'cpu': 45,
        'disco': 50
      },
      {
        'Momento': '2023-10-01 16:00:00',
        'ram': 35,
        'cpu': 40,
        'disco': 45
      },
      {
        'Momento': '2023-10-01 17:00:00',
        'ram': 30,
        'cpu': 35,
        'disco': 40
      },
      {
        'Momento': '2023-10-01 18:00:00',
        'ram': 25,
        'cpu': 30,
        'disco': 35
      }
    ]
  },
  {
    'servidor': 'Servidor 3',
    'dados': [{
      'Momento': '2023-10-01 09:00:00',
      'ram': 80,
      'cpu': 85,
      'disco': 75
    },
    {
      'Momento': '2023-10-01 10:00:00',
      'ram': 65,
      'cpu': 70,
      'disco': 60
    },
    {
      'Momento': '2023-10-01 11:00:00',
      'ram': 60,
      'cpu': 65,
      'disco': 55
    },
    {
      'Momento': '2023-10-01 12:00:00',
      'ram': 70,
      'cpu': 75,
      'disco': 80
    },
    {
      'Momento': '2023-10-01 13:00:00',
      'ram': 95,
      'cpu': 90,
      'disco': 85
    },
    {
      'Momento': '2023-10-01 14:00:00',
      'ram': 50,
      'cpu': 55,
      'disco': 65
    },
    {
      'Momento': '2023-10-01 15:00:00',
      'ram': 45,
      'cpu': 50,
      'disco': 55
    },
    {
      'Momento': '2023-10-01 16:00:00',
      'ram': 40,
      'cpu': 45,
      'disco': 50
    },
    {
      'Momento': '2023-10-01 17:00:00',
      'ram': 35,
      'cpu': 40,
      'disco': 45
    },
    {
      'Momento': '2023-10-01 18:00:00',
      'ram': 30,
      'cpu': 35,
      'disco': 40
    }
  ]
}
];

dadosServidores[0].servidor
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

function carregarServers(){
  var servidores = []
  var opcoes = ``
  for(var i = 0; i < dadosServidores.length; i++){
   if(!servidores.includes(dadosServidores[i].servidor)){
    servidores.push(dadosServidores[i].servidor)
    opcoes += `<option value = '${dadosServidores[i].servidor}'>${dadosServidores[i].servidor}</option>`
  }
}
  document.getElementById('slt_server').innerHTML += opcoes
}

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
  var servidorAtual = document.getElementById("slt_server").value

  var dadosComponente = []
  for (let i = 0; i < dadosServidores.length; i++) {
    if(dadosServidores[i].servidor == servidorAtual){
      for(let j = 0; j < dadosServidores[i].dados.length; j++){
        dadosComponente.push(dadosServidores[i].dados[j][atributoAtual])
      }
      break
    }
  }

  if (atributoAtual == 'cpu') {
    grafico_desempenho.data.datasets[0].label = 'Uso médio de CPU (%)';
  } else if (atributoAtual == 'ram') {
    grafico_desempenho.data.datasets[0].label = 'Uso médio de RAM (%)';
  } else if (atributoAtual == 'disco') {
    grafico_desempenho.data.datasets[0].label = 'Uso médio de Disco (%)';
  }
  
  grafico_desempenho.data.datasets[0].data = dadosComponente
  grafico_desempenho.update();
}

function mostrarRankingServidores() {
  const rankingContainer = document.getElementById("ranking_servidores");
  const tipoRanking = document.getElementById("slt_ranking").value;
  
  const servidores = [
    { nome: "Server_1", cpu: 23, ram: 67, disco: 85 },
    { nome: "Server_2", cpu: 87, ram: 44, disco: 36 },
    { nome: "Server_3", cpu: 60, ram: 56, disco: 44 }
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
  alertas_criticos.style.color = '#e74c3c';
}

function contarAlertasAtencao(){
  let contagem = 0;
  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i].nivel === 'Atenção') {
      contagem++;
    }
  }
  alertas_atencao.innerHTML = contagem;
  alertas_atencao.style.color = '#eb9100';
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

console.log(alertascomponente)

  var indiceMaior = 0;
  for (let i = 0; i < alertascomponente.length; i++) {
    if (alertascomponente[i].valor > alertascomponente[indiceMaior].valor) {
      indiceMaior = i
    }
  }
  var maiorValor = alertascomponente[indiceMaior].valor
  var maiorValorServer = alertascomponente[indiceMaior].servidor
  holderPico.style.display = 'flex'
  serverPico.innerHTML = `${maiorValorServer}`
  valorPico.innerHTML = ` 
  <span style="color: ${maiorValor >= 80 ? '#e74c3c' : maiorValor >= 60 ? '#eb9100' : 'green'};">${maiorValor}% </span>
    
  `;
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
          color: 'rgba(255,255,255,0.1)'
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
          color: 'rgba(255,255,255,0.1)'
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
            color: 'rgba(255,255,255,0.1)'
          }
        }
      }
    }
  });
  grafico_desempenho = grafico_desempenhos;
}

