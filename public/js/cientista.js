

function plotarGraficos(){
new Chart(document.getElementById('grafico_comparacao'), {
    type: 'bar',
    data: {
      labels: ['CPU (%)', 'RAM (%)', 'Disco (%)'],
      datasets: [
        {
          label: 'Servidor 1',
          data: [23, 87, 60],
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'Servidor 2',
          data: [67, 44, 56],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Servidor 3',
          data: [85, 36, 44],
          backgroundColor: 'rgba(99, 255, 99, 0.2)',
          borderColor: 'rgb(99, 255, 138)',
          borderWidth: 1
        }
      ]
    }
  });
  
  new Chart(document.getElementById('grafico_proporcao'), {
    type: 'pie',
    data: {
      labels: ['Servidor 1', 'Servidor 2', 'Servidor 3'],
      datasets: [{
        label: 'Uso de CPU',
        data: [30, 40, 30],
        backgroundColor: ['#007bff', '#ffc107', '#28a745']
      }]
    }
  });
  
  new Chart(document.getElementById('grafico_desempenho'), {
    type: 'line',
    data: {
      labels: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [{
        label: 'RAM (%)',
        data: [20, 85, 72, 67, 45, 53, 66, 70, 20],
        borderColor: '#17a2b8',           
        backgroundColor: 'rgba(23,162,184,0.2)', 
        fill: true,                                           
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}  

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
