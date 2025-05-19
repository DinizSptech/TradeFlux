var dadosServidores = [
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
        'tempoAtivo': '03:12:45'
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


var cores = {
  'critico': '#e917005e',
  'alerta': '#ffa6177d',
  'estavel': '#01692c96',
  'critico old': '#0d545a',
  'alerta old': '#09373b',
  'estavel old': '#132A2D'
}



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

var jaGerado = false 
var selecionado
function carregarServidoresTabela(copiaDados){
  const tabela = document.getElementById('spawnpointTabela')
if(jaGerado){
  const sel = tabela.querySelector('.selected')
if (sel) {
  selecionado = sel.innerText
}
}

  tabela.innerHTML = ''
  var addHTML = ''
  for (let i = 0; i < copiaDados.length; i++) {
    const servidorAtual = copiaDados[i];
    var ultimo = (servidorAtual.dados.length - 1)
    var classe = ''
if(selecionado == undefined){
} else if ( selecionado.includes(`${servidorAtual.servidor}`)) {
  classe = 'selected'
} else {
}
    addHTML += `
    <tr class="row ${classe}">
    <td >${servidorAtual.servidor}</td>
    <td style='background-color: ${servidorAtual.dados[ultimo].criticidade >= 3 ? cores['critico old'] : servidorAtual.dados[ultimo].criticidade >= 1 ? cores['alerta old'] : cores['estavel old']} '>${servidorAtual.dados[ultimo].criticidade}</td>
    <td style='background-color: ${compararData(servidorAtual.dados[ultimo].tempoAtivo, '07:00:00') >= 1 ? cores['critico old'] : (compararData(servidorAtual.dados[ultimo].tempoAtivo, '05:00:00')) >= 1 ? cores['alerta old'] : cores['estavel old'] }'>${servidorAtual.dados[ultimo].tempoAtivo}</td>
            <td style='background-color: ${servidorAtual.dados[ultimo].cpu >= 80 ? cores['critico old'] : servidorAtual.dados[ultimo].cpu >=60 ? cores['alerta old'] : cores['estavel old']} '>${servidorAtual.dados[ultimo].cpu}</td>
            <td style='background-color: ${servidorAtual.dados[ultimo].ram >= 80 ? cores['critico old'] : servidorAtual.dados[ultimo].ram >=60 ? cores['alerta old'] : cores['estavel old']} '>${servidorAtual.dados[ultimo].ram}</td>
            <td style='background-color: ${servidorAtual.dados[ultimo].disco >= 80 ? cores['critico old'] : servidorAtual.dados[ultimo].disco >=60 ? cores['alerta old'] : cores['estavel old']} '>${servidorAtual.dados[ultimo].disco}</td>
            <td style='background-color: ${servidorAtual.dados[ultimo].download <= 1200 ? cores['critico old'] : servidorAtual.dados[ultimo].download <= 1500 ? cores['alerta old'] : cores['estavel old']} '>${servidorAtual.dados[ultimo].download}</td>
            <td style='background-color: ${servidorAtual.dados[ultimo].upload <= 400 ? cores['critico old'] : servidorAtual.dados[ultimo].upload <= 500 ? cores['alerta old'] : cores['estavel old']} '>${servidorAtual.dados[ultimo].upload}</td>
          </tr>
    `
  }
  tabela.innerHTML = addHTML
  document.querySelectorAll('tr').forEach((linha)=> {
  })

    const linhas = tabela.querySelectorAll('tr');
    linhas.forEach((linha) => {
    linha.addEventListener('click', () => {
      linhas.forEach(l => l.classList.remove('selected'));
      linha.classList.add('selected');
    });
  });

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
        fill="#F0F0F0" />
        </svg>`
      }
      })
  })
  }

function expandirServidor(){

}
