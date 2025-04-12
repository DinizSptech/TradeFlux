
var grafico_comparacao = new Chart(document.getElementById('grafico_comparacao'), {
    type: 'bar',
    data: {
      labels: ['CPU (%)', 'RAM (%)', 'Disco (%)'],
      datasets: [
        {
          label: 'Servidor 1',
          data: [23, 87, 60],
          backgroundColor: 'rgb(0, 123, 255)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'Servidor 2',
          data: [67, 44, 56],
          backgroundColor: 'rgb(255, 99, 133)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Servidor 3',
          data: [85, 36, 44],
          backgroundColor: 'rgb(99, 255, 99)',
          borderColor: 'rgb(112, 255, 99)',
          borderWidth: 1
        }
      ]
    }
  });
  
  var grafico_desempenho = new Chart(document.getElementById('grafico_desempenho'), {
    type: 'line',
    data: {
      labels: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [{
        label: 'Uso médio de  (%)',
        data: [20, 85, 72, 67, 45, 53, 66, 70, 20],
        borderColor: '#17a2b8',           
        backgroundColor: 'rgba(23,162,184,0.2)', 
        fill: true,                                           
      }]
    },
    options: {
      scales: {
        y: {
          
        }
      }
    }
  });



    var sevidor1 = {
        cpu: 23,
        ram: 87,
        disco: 60
    }

    var sevidor2 = {
        cpu: 67,
        ram: 44,
        disco: 56
    }

    var sevidor3 = {
        cpu: 85,
        ram: 36,
        disco: 44
    }


function sairParaLogin(){
    window.location.href = "./login.html";
}

function sairParaJira(){
  url = "https://www.atlassian.com/software/jira"
  window.open(url, '_blank');
}

function mudarAtributoRanking(){
  var atributoAtual = document.getElementById("slt_ranking").value;

  if(atributoAtual == "cpu"){
    document.getElementById("ranking").innerHTML = `
    Servidor 3 - <b>${sevidor3.cpu}%</b><br>
    Servidor 2 - <b>${sevidor2.cpu}%</b><br>
    Servidor 1 - <b>${sevidor1.cpu}%</b><br>
    `;
  }else if(atributoAtual == "ram"){
    document.getElementById("ranking").innerHTML = `
    Servidor 1 - <b>${sevidor1.ram}%</b><br>
    Servidor 2 - <b>${sevidor2.ram}%</b><br>
    Servidor 3 - <b>${sevidor3.ram}%</b><br>
    `;
  }else if(atributoAtual == "disco"){
    document.getElementById("ranking").innerHTML = `
    Servidor 1 - <b>${sevidor1.disco}%</b><br>
    Servidor 2 - <b>${sevidor2.disco}%</b><br>
    Servidor 3 - <b>${sevidor3.disco}%</b><br>
    `;  

  }
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
    
}
