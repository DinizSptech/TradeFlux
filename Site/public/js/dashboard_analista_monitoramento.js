let dadosServidores = [
  {
    'servidor': 'Servidor 1',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 47,
        'cpu': 38,
        'disco': 50,
        'criticidade': 0,
        'download': 1204.58,
        'upload': 342.17,
        'tempoAtivo': '03:12:45',
        'processos' : []
      }
    ]
  },
  {
    'servidor': 'Servidor 2',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 65,
        'cpu': 55,
        'disco': 81,
        'criticidade': 4,
        'download': 1820.31,
        'upload': 478.92,
        'tempoAtivo': '07:06:22'
      }
    ]
  },
  {
    'servidor': 'Servidor 3',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 90,
        'cpu': 85,
        'disco': 88,
        'criticidade': 9,
        'download': 2100.89,
        'upload': 602.33,
        'tempoAtivo': '09:21:09'
      }
    ]
  },
  {
    'servidor': 'Servidor 4',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 70,
        'cpu': 65,
        'disco': 45,
        'criticidade': 2,
        'download': 980.12,
        'upload': 315.78,
        'tempoAtivo': '01:15:57'
      }
    ]
  },
  {
    'servidor': 'Servidor 5',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 60,
        'cpu': 61,
        'disco': 62,
        'criticidade': 2,
        'download': 1435.66,
        'upload': 420.10,
        'tempoAtivo': '02:23:05'
      }
    ]
  },
  {
    'servidor': 'Servidor 6',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 83,
        'cpu': 79,
        'disco': 66,
        'criticidade': 5,
        'download': 1672.39,
        'upload': 498.44,
        'tempoAtivo': '05:08:11'
      }
    ]
  },
  {
    'servidor': 'Servidor 7',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 91,
        'cpu': 45,
        'disco': 39,
        'criticidade': 3,
        'download': 1544.22,
        'upload': 365.29,
        'tempoAtivo': '04:10:50'
      }
    ]
  },
  {
    'servidor': 'Servidor 8',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 88,
        'cpu': 88,
        'disco': 88,
        'criticidade': 9,
        'download': 2290.77,
        'upload': 612.81,
        'tempoAtivo': '10:03:32'
      }
    ]
  },
  {
    'servidor': 'Servidor 9',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 66,
        'cpu': 77,
        'disco': 59,
        'criticidade': 2,
        'download': 1301.11,
        'upload': 333.65,
        'tempoAtivo': '06:09:24'
      }
    ]
  },
  {
    'servidor': 'Servidor 10',
    'dados': [
      {
        'Momento': '2025-05-09 10:00:00',
        'ram': 35,
        'cpu': 82,
        'disco': 84,
        'criticidade': 6,
        'download': 1894.45,
        'upload': 547.02,
        'tempoAtivo': '08:17:13'
      }
    ]
  }
];


let cores = {
  'critico': '#ff1900',
  'alerta': '#ffa617',
  'estavel': '#09bb26',
  'critico old': '#0a4146',
  'alerta old': '#09373b',
  'estavel old': '#132A2D'
}

criticos = 0
moderados = 0

function compararData(d1, d2){
  let dias1 = Number(d1[0] + d1[1])
  let dias2 = Number(d2[0] + d2[1])
   if(dias1 > dias2){
    return 1
   } else if (dias1 < dias2){
    return -1
   } else {
  let horas1 = Number(d1[3] + d1[4])
  let horas2 = Number(d2[3] + d2[4])
   if(horas1 > horas2){
    return 1
   } else if (horas1 < horas2){
    return -1
   } else {
  let min1 = Number(d1[6] + d1[7])
  let min2 = Number(d2[6] + d2[7])
   if(min1 > min2){
    return 1
   } else if (min1 < min2){
    return -1
   }
   }
   }
}

dadosSelecionado = []

var jaGerado = false 
var selecionado


function carregarServidoresTabela(copiaDados){
  const tabela = document.getElementById('spawnpointTabela')
if(jaGerado){
  const selected = tabela.querySelector('.selected')
if (selected) {
  selecionado = selected.querySelector('td').innerText
  console.log(selecionado)
}
}
  let limite = copiaDados.length
  if (limite > 10){
    limite = 10
  }
  tabela.innerHTML = ''
  var addHTML = ''
  for (let i = 0; i < limite; i++) {
    const servidorAtual = copiaDados[i];
    var ultimo = (servidorAtual.dados.length - 1)
    var classe = ''
if(selecionado == undefined){
} else if ( selecionado == (`${servidorAtual.servidor}`)) {
  classe = 'selected'
} else {
}
    addHTML += `
    <tr class="row ${classe}">
    <td class='col-server' style='border-left: 3px ${servidorAtual.dados[ultimo].criticidade >= 3 ? cores['critico'] : servidorAtual.dados[ultimo].criticidade >= 1 ? cores['alerta'] : cores['estavel']} solid';>${servidorAtual.servidor}</td>
    <td style='color: ${servidorAtual.dados[ultimo].criticidade >= 3 ? cores['critico'] : servidorAtual.dados[ultimo].criticidade >= 1 ? cores['alerta'] : cores['estavel']}'>${servidorAtual.dados[ultimo].criticidade}</td>
    <td style='color: ${compararData(servidorAtual.dados[ultimo].tempoAtivo, '07:00:00') >= 1 ? cores['critico'] : (compararData(servidorAtual.dados[ultimo].tempoAtivo, '05:00:00')) >= 1 ? cores['alerta'] : cores['estavel'] }'> ${servidorAtual.dados[ultimo].tempoAtivo}</td>
            <td style='color: ${servidorAtual.dados[ultimo].cpu >= 80 ? cores['critico'] : servidorAtual.dados[ultimo].cpu >=60 ? cores['alerta'] : cores['estavel']} '>${servidorAtual.dados[ultimo].cpu}</td>
            <td style='color: ${servidorAtual.dados[ultimo].ram >= 80 ? cores['critico'] : servidorAtual.dados[ultimo].ram >=60 ? cores['alerta'] : cores['estavel']} '>${servidorAtual.dados[ultimo].ram}</td>
            <td style='color: ${servidorAtual.dados[ultimo].disco >= 80 ? cores['critico'] : servidorAtual.dados[ultimo].disco >=60 ? cores['alerta'] : cores['estavel']}'>${servidorAtual.dados[ultimo].disco}</td>
            <td style='color: ${servidorAtual.dados[ultimo].download <= 1200 ? cores['critico'] : servidorAtual.dados[ultimo].download <= 1500 ? cores['alerta'] : cores['estavel']}'>${servidorAtual.dados[ultimo].download}</td>
            <td style='color: ${servidorAtual.dados[ultimo].upload <= 400 ? cores['critico'] : servidorAtual.dados[ultimo].upload <= 500 ? cores['alerta'] : cores['estavel']}'>${servidorAtual.dados[ultimo].upload}</td>
          </tr>
    `
  }
  tabela.innerHTML = addHTML
  document.querySelectorAll('tr').forEach((linha)=> {
    const linhas = tabela.querySelectorAll('tr');
    linhas.forEach((linha) => {
    linha.addEventListener('click', () => {
      linhas.forEach(l => l.classList.remove('selected'));
      linha.classList.add('selected');
      tabela.querySelector('.selected').querySelector('td').innerText.innerText
      });
    })})


  jaGerado = true

}

 var ordenado
 var escolhidoOld = 'nada'
function ordenarTabela(escolhido){
  lista = [...dadosServidores]

  if(escolhidoOld != escolhido){
    ordenado = 1
    escolhidoOld = escolhido
  } 
    for(let i = 0; i < lista.length - 1; i ++){
      const ultimo = (lista[i].dados.length - 1)
      let aux 
      let maior = i 
      if (escolhido == 'criticidade'){
      for(let j = i + 1; j < lista.length; j++){
        if(lista[maior].dados[ultimo][escolhido] < lista[j].dados[ultimo][escolhido]){
          maior = j
        } else if(lista[maior].dados[ultimo][escolhido] == lista[j].dados[ultimo][escolhido]){
          if(compararData(lista[maior].dados[ultimo].tempoAtivo,lista[j].dados[ultimo].tempoAtivo) < 0){
            maior = j
          }
        }
      }
      aux = lista[i]
      lista[i] = lista[maior]
      lista[maior] = aux
    } else  {
      for(let j = i + 1; j < lista.length; j++){
        if(lista[maior].dados[ultimo][escolhido] < lista[j].dados[ultimo][escolhido]){
          maior = j
        }
      }
      aux = lista[i]
      lista[i] = lista[maior]
      lista[maior] = aux
    }    
  }
    if(ordenado == 1) {
    ordenado = 2
    } else {
      lista.reverse()
      ordenado = 1
    }
    carregarServidoresTabela(lista)
    
  }


  function loadEvents(){

  document.querySelectorAll('.titleTable').forEach((title) => {
    title.addEventListener('click', () => {

      const existingSvg = title.querySelector('svg');
  document.querySelectorAll('svg').forEach(svg => { if (svg == existingSvg){ return }else { svg.remove()}})
  
      if(existingSvg){
        if(existingSvg.style.transform == 'rotate(180deg)'){
          existingSvg.style.transform = 'rotate(0deg)'
        } else {
          existingSvg.style.transform = 'rotate(180deg)'
        }
      } else {
        title.innerHTML += `<svg width="12" style='margin-left: 4px; height: 8px; transform: rotate(180deg)' viewBox="0 0 22 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
        d="M9.78825 12.5399L0.3417 3.09327C-0.1139 2.63767 -0.1139 1.89903 0.3417 1.44348L1.44349 0.341688C1.89831 -0.113133 2.63545 -0.114009 3.09134 0.339744L10.6132 7.82634L18.135 0.339744C18.5909 -0.114009 19.328 -0.113133 19.7828 0.341688L20.8846 1.44348C21.3402 1.89908 21.3402 2.63772 20.8846 3.09327L11.4381 12.5399C10.9825 12.9954 10.2439 12.9954 9.78825 12.5399Z"
        fill="#272727" />
        </svg>`
      }
      })
  })
  }

function carregarModal(texto){
      
}

function expandirServidor(){
      const tabela = document.getElementById('spawnpointTabela')
      const sel = tabela.querySelector('.selected')
      if(sel){
        let selecionado = sel.innerText
       for(let i = 0; i < dadosServidores.length; i ++){
        if (dadosServidores[i].servidor == selecionado){
          console.log(dadosServidores[i])
        }
       }
      } else {
        carregarModal("É necessário selecionar um servidor antes expandir.")
      }

}

function getRandom() {
  return Math.ceil(Math.random() * 100) 
}


function generateMinuteWiseTimeSeries(baseval, count) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    series.push([x, getRandom()]);
    baseval += 300000;
    i++;
  }
  return series;
}


// variaveis estéticas
 var stroke =  {
    curve: "smooth",
    width: 5,
    lineCap: "butt"
  }

  var marcadores = {
    size: 0,
    hover: {
      size: 0
    }
  }

  var toolbar = {
      show: true,
      offsetX: 20,
      offsetY: 7
    }

    var altura = '300'
    var largura = '432'
    var velocidade = 200
// CONFIGURA O GRÁFICO DE LINHAS DE COMPONENTES
window.Apex = {
  chart: {
    foreColor: "#2b2b2b",
    toolbar: {
      show: false
    }
  },
  colors: ["#FCCF31", "#17ead9", "#f02fc2"],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D"
  },
  xaxis: {
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
    }
  },
  tooltip: {
    theme: "dark"
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};

var optionsLineFisico = {
  chart: {
    height: altura,
    width: largura,
    type: "line",
    stacked: false,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: velocidade
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    events: {
      animationEnd: function (chartCtx) {

        // Cria os dados novos?
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        const newData2 = chartCtx.w.config.series[1].data.slice();
        newData2.shift();
        const newData3 = chartCtx.w.config.series[2].data.slice();
        newData3.shift();
        console.log(chartCtx)

      }
    },
    toolbar: toolbar,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: stroke,
  markers: marcadores,
  series: [
    {
      name: "CPU",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12
      )
    },
    {
      name: "RAM",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12
      )
    },
    {
      name: "Disco",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12
      )
    }
  ],
  xaxis: {
    type: "datetime",
    range: 2700000
  },
  title: {
    text: "Componentes",
    align: "left",
    offsetY: -8,
    style: {
      fontSize: "30px"
    }
  },
  subtitle: {
    text: "Percentual",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px"
    }
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "left",
    onItemClick: {
      toggleDataSeries: false
    },
    position: "top",
    offsetY: -35,
    offsetX: 0
  }
};

const chartLineFisico = new ApexCharts(
  document.querySelector("#linechart-fisico"),
  optionsLineFisico
);
chartLineFisico.render();

window.setInterval(function () {
  /* Importante */
  chartLineFisico.updateSeries([
    {
      data: [
        ...chartLineFisico.w.config.series[0].data,
        [chartLineFisico.w.globals.maxX + 300000, getRandom()]
      ]
    },
    {
      data: [
        ...chartLineFisico.w.config.series[1].data,
        [chartLineFisico.w.globals.maxX + 300000, getRandom()]
      ]
    },
    {
      data: [
        ...chartLineFisico.w.config.series[2].data,
        [chartLineFisico.w.globals.maxX + 300000, getRandom()]
      ]
    }
  ]);

}, 3000);


// CONFIGURA O GRÁFICO DE LINHAS DE REDE
window.Apex = {
  chart: {
    foreColor: "#2b2b2b",
    toolbar: {
      show: false
    }
  },
  colors: ["#2160D5", "#8233C2"],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D"
  },
  xaxis: {
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "#6078ea"]
    }
  },
  tooltip: {
    theme: "dark"
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};

var optionsLineRede = {
  chart: {
    height: altura,
    width: largura,
    type: "line",
    stacked: false,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: velocidade
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    events: {
      animationEnd: function (chartCtx) {

        // Cria os dados novos?
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        const newData2 = chartCtx.w.config.series[1].data.slice();
        newData2.shift();
        console.log(chartCtx)

      }
    },
    toolbar: toolbar,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: stroke,
  markers: marcadores,
  series: [
    {
      name: "Upload",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12
      )
    },
    {
      name: "Download",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12
      )
    }
  ],
  xaxis: {
    type: "datetime",
    range: 2700000
  },
  title: {
    text: "Velocidade de rede",
    align: "left",
    offsetY: -5,
    style: {
      fontSize: "28px",
      textWrap: true
    }
  },
  subtitle: {
    text: "Percentual",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px"
    }
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "left",
    onItemClick: {
      toggleDataSeries: false
    },
    position: "top",
    offsetY: -35,
    offsetX: 0
  }
};

const chartLineRede = new ApexCharts(
  document.querySelector("#linechart-rede"),
  optionsLineRede
);
chartLineRede.render();

window.setInterval(function () {

  /* Importante */
  chartLineRede.updateSeries([
    {
      data: [
        ...chartLineRede.w.config.series[0].data,
        [chartLineRede.w.globals.maxX + 300000, getRandom()]
      ]
    },
    {
      data: [
        ...chartLineRede.w.config.series[1].data,
        [chartLineRede.w.globals.maxX + 300000, getRandom()]
      ]
    }
  ]);

}, 3000);
