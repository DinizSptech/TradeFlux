var sevidor1 = { cpu: 23, ram: 87, disco: 60 };
var sevidor2 = { cpu: 67, ram: 44, disco: 56 };
var sevidor3 = { cpu: 85, ram: 36, disco: 44 };

var alertas = [
  { servidor: 'Servidor 1', tipo: 'RAM', valor: 85, data: '11-04-2025 10:12', nivel: 'atenção' },
  { servidor: 'Servidor 3', tipo: 'CPU', valor: 91, data: '11-04-2025 09:47', nivel: 'crítico' },
  { servidor: 'Servidor 1', tipo: 'DISCO', valor: 88, data: '10-04-2025 18:32', nivel: 'atenção' },
  { servidor: 'Servidor 2', tipo: 'CPU', valor: 93, data: '10-04-2025 15:14', nivel: 'crítico' },
  { servidor: 'Servidor 3', tipo: 'RAM', valor: 82, data: '09-04-2025 12:05', nivel: 'atenção' },
  { servidor: 'Servidor 2', tipo: 'DISCO', valor: 95, data: '08-04-2025 14:23', nivel: 'crítico' },
  { servidor: 'Servidor 1', tipo: 'CPU', valor: 88, data: '07-04-2025 11:45', nivel: 'atenção' },
  { servidor: 'Servidor 3', tipo: 'DISCO', valor: 91, data: '06-04-2025 13:09', nivel: 'crítico' },
  { servidor: 'Servidor 2', tipo: 'RAM', valor: 84, data: '06-04-2025 10:55', nivel: 'atenção' },
  { servidor: 'Servidor 1', tipo: 'RAM', valor: 92, data: '05-04-2025 08:30', nivel: 'crítico' },
  { servidor: 'Servidor 2', tipo: 'CPU', valor: 85, data: '04-04-2025 16:40', nivel: 'atenção' },
  { servidor: 'Servidor 3', tipo: 'RAM', valor: 83, data: '03-04-2025 19:02', nivel: 'atenção' },
  { servidor: 'Servidor 3', tipo: 'CPU', valor: 94, data: '02-04-2025 17:21', nivel: 'crítico' },
  { servidor: 'Servidor 2', tipo: 'DISCO', valor: 92, data: '01-04-2025 13:36', nivel: 'crítico' },
  { servidor: 'Servidor 1', tipo: 'DISCO', valor: 89, data: '31-03-2025 15:10', nivel: 'atenção' }
];

function sairParaLogin() {
  window.location.href = "./login.html";
}

function sairParaJira() {
  window.open("https://www.atlassian.com/software/jira", '_blank');
}

function mudarAtributoRanking() {
  var atributoAtual = document.getElementById("slt_ranking").value;
  var html = '';

  if (atributoAtual == "cpu") {
    html = `Servidor 3 - <b>${sevidor3.cpu}%</b><br>Servidor 2 - <b>${sevidor2.cpu}%</b><br>Servidor 1 - <b>${sevidor1.cpu}%</b><br>`;
  } else if (atributoAtual == "ram") {
    html = `Servidor 1 - <b>${sevidor1.ram}%</b><br>Servidor 2 - <b>${sevidor2.ram}%</b><br>Servidor 3 - <b>${sevidor3.ram}%</b><br>`;
  } else if (atributoAtual == "disco") {
    html = `Servidor 1 - <b>${sevidor1.disco}%</b><br>Servidor 2 - <b>${sevidor2.disco}%</b><br>Servidor 3 - <b>${sevidor3.disco}%</b><br>`;
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

function mostrarUltimosAlertas() {
  var ultimos = document.getElementById("ultimos_alertas");
  ultimos.innerHTML = '';
  for (var i = 0; i < 3 && i < alertas.length; i++) {
    let cor = alertas[i].nivel === 'crítico' ? 'red' : 'yellow';
    ultimos.innerHTML += `
      <span style="color: ${cor}; font-weight: bold;">${alertas[i].nivel.toUpperCase()}</span>
      - Alerta de ${alertas[i].tipo} no ${alertas[i].servidor}: <b>${alertas[i].valor}%</b> em ${alertas[i].data}<br>
    `;
  }
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
    if (alertas[i].nivel === 'atenção') {
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
        ⚠️ ${alertas[i].nivel.toUpperCase()} - Alerta de <b>${alertas[i].tipo}</b> no <b>${alertas[i].servidor}</b>: 
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

var grafico_comparacao = new Chart(document.getElementById('grafico_comparacao'), {
  type: 'bar',
  data: {
    labels: ['CPU (%)', 'RAM (%)', 'Disco (%)'],
    datasets: [
      { label: 'Servidor 1', data: [23, 87, 60], backgroundColor: 'rgb(0, 123, 255)' },
      { label: 'Servidor 2', data: [67, 44, 56], backgroundColor: 'rgb(255, 99, 133)' },
      { label: 'Servidor 3', data: [85, 36, 44], backgroundColor: 'rgb(99, 255, 99)' }
    ]
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
          color: '#1e3a5f'
        }
      }
    }
  }
});

var grafico_desempenho = new Chart(document.getElementById('grafico_desempenho'), {
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
          color: '#1e3a5f'
        }
      }
    }
  }
});
