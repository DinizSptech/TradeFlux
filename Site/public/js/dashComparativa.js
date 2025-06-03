function pegarData() {

  // Pega a data de hj pra não ficar o código em toda parte

  const agr = new Date();
  const ano = agr.getFullYear();
  const mes = String(agr.getMonth() + 1).padStart(2, '0');
  const dia = String(agr.getDate()).padStart(2, '0');
  const hora = String(agr.getHours()).padStart(2, '0');
  const minuto = String(agr.getMinutes()).padStart(2, '0');
  const segundos = String(agr.getSeconds()).padStart(2, '0');

  const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundos}`;
  console.log(dataFormatada);

    return dataFormatada

}

function gerarBotao() {
  // Cria o botão de baixar
  const BOTAO = document.getElementById("botaoBaixar");

  BOTAO.innerHTML = `Baixar CSV do Database ${sessionStorage.getItem(
    "DataCenter"
  )}`;
}


// chamandoLambda function
function chamandoLambda(qtdDias, dataInicial) {
  const datacenter = sessionStorage.getItem("DataCenter") || "1";
  const requestBody = {
    qtdDias: qtdDias,
    dtInicial: dataInicial,
    datacenter: datacenter,
  };

  return fetch('http://127.0.0.1:8080/dataCenter/pegarServidores', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      // Limpa dados antigos
      for (let i = 1; i <= 10; i++) {
        sessionStorage.removeItem(`servidor${i}`);
      }

      // Processa os dados dos servidores
      data.data.forEach(servidor => {
        const qualServidor = `servidor${servidor.servidor}`;
        const servidorFormatado = {
          media_CPU: servidor.media_CPU,
          media_RAM: servidor.media_RAM,
          media_Disco: servidor.media_Disco
        };
        sessionStorage.setItem(qualServidor, JSON.stringify(servidorFormatado));
      });

      // Salva a média total
      sessionStorage.setItem("mediaTotal", JSON.stringify(data.mediaTotal));

      return data;
    } else {
      throw new Error(data.erro || "Erro ao carregar dados");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    throw error;
  });
}

function inicializarDashboard() {
  const periodo = document.getElementById('sltPeriodo').value;
  let qtdDias;

  if (periodo === "optPeriodo7Dias") {
    qtdDias = 7;
  } else if (periodo === "optPeriodo30Dias") {
    qtdDias = 30;
  } else if (periodo === "optPeriodo3Meses") {
    qtdDias = 90;
  } else {
    qtdDias = 7; // Default to 7 days
  }

  const dataInicial = pegarData();

  chamandoLambda(qtdDias, dataInicial)
    .then(response => {
      if (response.success) {
        setTimeout(() => {
          const servidores = [];
          for (let i = 1; i <= 10; i++) {
            const qualServidor = `servidor${i}`;
            const servidorJSON = sessionStorage.getItem(qualServidor);
            if (servidorJSON) {
              const servidor = JSON.parse(servidorJSON);
              servidores.push({
                nome: qualServidor,
                numeroServidor: i,
                ...servidor
              });
            }
          }

          if (servidores.length > 0) {
            servidores.sort((a, b) => b.media_CPU - a.media_CPU);
            const primeiroServidor = servidores[0];
            geradorGraficos('Barra', primeiroServidor);
          } else {
            console.error("Nenhum dado de servidor encontrado.");
          }
        }, 1000);
      } else {
        console.error("Erro ao carregar dados iniciais:", response.erro);
      }
    })
    .catch(error => {
      console.error("Erro ao inicializar dashboard:", error);
    });
}

// function chamandoLambda(qtdDias, dataInicial) {
//   const datacenter = sessionStorage.getItem("DataCenter") || "1";
//   const dataFormatada = dataInicial;

//   return fetch('/dataCenter/pegarServidores', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       qtdDias: qtdDias,
//       dtInicial: dataFormatada,
//       datacenter: datacenter,
//     }),
//   })
//   .then(response => response.json())
//   .catch(error => {
//     console.error("Error:", error);
//     throw error;
//   });
// }

// function chamandoLambda(qtdDias, dataInicial) {
//   const datacenter = sessionStorage.getItem("DataCenter");
//   const dataFormatada = dataInicial;

//   fetch(`/dataCenter/pegarServidores`), {
//     method : 'POST',
//     headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         qtdDias: qtdDias,
//         dtInicial: dataFormatada,
//         datacenter: "1",
//       }),
//   }

  // fetch(
  //   "https://cmu7qp7lb5exg53gb5umhnhuwy0eikhq.lambda-url.us-east-1.on.aws/",
  //   // Alterar o Link para o da Amanda
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       qtdDias: qtdDias,
  //       dtInicial: dataFormatada,
  //       datacenter: "1",
  //     }),
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Limpa dados antigos
  //     for (let i = 1; i <= 10; i++) {
  //       sessionStorage.removeItem(`servidor${i}`);
  //     }

  //     // Processa a nova estrutura de dados (array de servidores)
  //     if (Array.isArray(data)) {
  //       data.forEach(servidor => {
  //         const qualServidor = `servidor${servidor.servidor}`;
          
  //         // Converte para o formato esperado pelo resto do código
  //         const servidorFormatado = {
  //           media_CPU: servidor.CPU,
  //           media_RAM: servidor.RAM,
  //           media_Disco: servidor.Disco
  //         };
          
  //         sessionStorage.setItem(qualServidor, JSON.stringify(servidorFormatado));
  //       });

  //       // Calcula média total para o gráfico
  //       const mediaTotal = {
  //         CPU: data.reduce((sum, s) => sum + s.CPU, 0) / data.length,
  //         RAM: data.reduce((sum, s) => sum + s.RAM, 0) / data.length,
  //         Disco: data.reduce((sum, s) => sum + s.Disco, 0) / data.length
  //       };
        
  //       sessionStorage.setItem("mediaTotal", JSON.stringify(mediaTotal));
  //     }

    //   console.log(data);
    // })
    // .catch(error => {
    //   console.error('Erro ao chamar Lambda:', error);
    // });
// }

function baixarCSV() {
  // Baixa CSV do Bucket
  const DATACENTER = sessionStorage.getItem("DataCenter");

  if (DATACENTER == 1) {
  } else if (DATACENTER == 2) {
  } else {
  }
}

function trocarVisibilidade(e) {
  // Muda a visibilidade da div que contém o Input de data
  const periodo = document.getElementById("sltPeriodo").value;

  if (periodo == "optPeriodoPersonalizado") {
    document
      .getElementById("divPersonalizadaData")
      .classList.remove("esconder");
    // Remove a classe esconder
  } else {
    document.getElementById("divPersonalizadaData").classList.add("esconder");
    // Adiciona a classe esconder
  }
}

function filtrar() {
  const PERIODO = document.getElementById('sltPeriodo').value

  if(PERIODO == "optPeriodo7Dias") {
    const qtdDias = 7;
    const data = pegarData()
    chamandoLambda(qtdDias, data)
  } else if(PERIODO == "optPeriodo30Dias") {
    const qtdDias = 30;
    const data = pegarData()
    chamandoLambda(qtdDias, data)
  } else if(PERIODO == "optPeriodo3Meses") {
    const qtdDias = 90;
    const data = pegarData()
    chamandoLambda(qtdDias, data)
  }

  // Aguarda um pouco para os dados serem processados
  setTimeout(() => {
  const SERVIDOR = mainSelect.value;
  const SERVIDORESPECIFICO = hiddenSelect.classList.contains("show")
    ? hiddenSelect.value
    : "";

  let servidores = [];

  for (let i = 1; i <= 10; i++) {
    const qualServidor = `servidor${i}`;
    const servidorJSON = sessionStorage.getItem(qualServidor);

    if (servidorJSON) {
      const servidor = JSON.parse(servidorJSON);
      servidores.push({
        nome: qualServidor,
        numeroServidor: i,
        ...servidor
      });
    }
  }

  if (SERVIDOR === 'CPU') {
    servidores.sort((a, b) => b.media_CPU - a.media_CPU);
    const primeiroServidor = servidores[0];
    geradorGraficos('Barra', primeiroServidor);
  } else if (SERVIDOR === 'RAM') {
    servidores.sort((a, b) => b.media_RAM - a.media_RAM);
    const primeiroServidor = servidores[0];
    geradorGraficos('Barra', primeiroServidor);
  } else if (SERVIDOR === 'Disco') {
    servidores.sort((a, b) => b.media_Disco - a.media_Disco); // Fixed typo: 'Disco' instead of 'media_Disco'
    const primeiroServidor = servidores[0];
    geradorGraficos('Barra', primeiroServidor);
  } else if (SERVIDOR === 'Personalizado') {
    servidores.sort((a, b) => a.numeroServidor - b.numeroServidor);
    const servidorSelecionado = parseInt(document.getElementById("hiddenSelect").value);
    const servidorDados = servidores.find(s => s.numeroServidor === servidorSelecionado);
    
    if (servidorDados) {
      geradorGraficos('Barra', servidorDados);
    }
  }

  console.log("Filtros aplicados:", {
    categoria: SERVIDOR,
    subcategoria: SERVIDORESPECIFICO,
  });
}, 10000);
}

function limparFiltro() {
  mainSelect.value = "";
  hiddenSelect.value = "";
  hiddenSelect.classList.remove("show");
  console.log("lalalalalalalal")
}

// function geradorGraficos(tipo, servidor, dadosHistoricos = null) {
//   if (tipo == "Barra") {
//     let media = [37.59, 40.1, 30.21];
//     let servidorSelecionado = servidor;

//     // Usa as propriedades corretas (media_CPU, media_RAM, media_Disco)
//     let dados = [
//       servidorSelecionado.media_CPU, 
//       servidorSelecionado.media_RAM, 
//       servidorSelecionado.Disco
//     ];

//     var options = {
//       title: {
//         text: "Comparação média com servidor escolhido",
//         align: "center",
//       },

//       chart: {
//         type: "bar",
//         height: 350,
//         background: "#ffffff",
//       },

//       plotOptions: {
//         bar: {
//           horizontal: true,
//           dataLabels: {
//             position: "top",
//           },
//           barHeight: "50%",
//         },
//       },

//       colors: [
//         "#7F7FFF", // Azul claro
//         "#FF7F7F", // Vermelho claro
//       ],

//       dataLabels: {
//         enabled: true,
//         offsetX: 20,
//         style: {
//           fontSize: "12px",
//           colors: ["#000"],
//         },
//       },

//       series: [
//         {
//           name: "Média",
//           data: media,
//         },
//         {
//           name: "Servidor Selecionado",
//           data: dados,
//         },
//       ],

//       xaxis: {
//         categories: ["CPU", "RAM", "Disco"],
//         max: 100,
//         labels: {
//           style: {
//             colors: "#000000",
//           },
//         },
//       },

//       yaxis: {
//         labels: {
//           style: {
//             colors: "#000000",
//           },
//         },
//       },

//       legend: {
//         position: "bottom",
//         labels: {
//           colors: "#000000",
//         },
//       },

//       grid: {
//         borderColor: "#555",
//       },

//       colors: [
//         "#5A8DEE", // Cor fixa para "Média" (Azul)
//         function ({ dataPointIndex }) {
//           let valorServidor = dados[dataPointIndex];
//           let valorMedia = media[dataPointIndex];

//           if (valorServidor > valorMedia) {
//             return "#E74C3C"; // Vermelho
//           }

//           let diferencaPercentual =
//             ((valorMedia - valorServidor) / valorMedia) * 100;

//           if (diferencaPercentual <= 10) {
//             return "#F39C12"; // Laranja
//           } else {
//             return "#27AE60"; // Verde
//           }
//         },
//       ],
//     };

//     // Limpa gráfico anterior se existir
//     const chartContainer = document.querySelector("#myBarChart");
//     if (chartContainer) {
//       chartContainer.innerHTML = '';
//     }

//     var chart = new ApexCharts(chartContainer, options);
//     chart.render();

function geradorGraficos(tipo, servidor, dadosHistoricos = null) {
  if (tipo === "Barra") {
    // Fallback values if servidor is undefined
    const servidorSelecionado = servidor || {
      media_CPU: 0,
      media_RAM: 0,
      Disco: 0
    };

    // Use static media values or fetch from sessionStorage
    let media = JSON.parse(sessionStorage.getItem("mediaTotal")) || {
      CPU: 37.59,
      RAM: 40.1,
      Disco: 30.21
    };

    let dados = [
      servidorSelecionado.media_CPU, 
      servidorSelecionado.media_RAM, 
      servidorSelecionado.Disco
    ];

    var options = {
      title: {
        text: "Comparação média com servidor escolhido",
        align: "center",
      },
      chart: {
        type: "bar",
        height: 350,
        background: "#ffffff",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
          barHeight: "50%",
        },
      },
      colors: [
        "#5A8DEE", // Azul claro
        "#FF7F7F", // Vermelho claro
      ],
      dataLabels: {
        enabled: true,
        offsetX: 20,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
      },
      series: [
        {
          name: "Média",
          data: [media.CPU, media.RAM, media.Disco],
        },
        {
          name: "Servidor Selecionado",
          data: dados,
        },
      ],
      xaxis: {
        categories: ["CPU", "RAM", "Disco"],
        max: 100,
        labels: {
          style: {
            colors: "#000000",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#000000",
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#000000",
        },
      },
      grid: {
        borderColor: "#555",
      },
      colors: [
        "#5A8DEE", // Cor fixa para "Média" (Azul)
        function ({ dataPointIndex }) {
          let valorServidor = dados[dataPointIndex];
          let valorMedia = [media.CPU, media.RAM, media.Disco][dataPointIndex];

          if (valorServidor > valorMedia) {
            return "#E74C3C"; // Vermelho
          }

          let diferencaPercentual =
            ((valorMedia - valorServidor) / valorMedia) * 100;

          if (diferencaPercentual <= 10) {
            return "#F39C12"; // Laranja
          } else {
            return "#27AE60"; // Verde
          }
        },
      ],
    };

    // Limpa gráfico anterior se existir
    const chartContainer = document.querySelector("#myBarChart");
    if (chartContainer) {
      chartContainer.innerHTML = '';
    }

    var chart = new ApexCharts(chartContainer, options);
    chart.render();

  } else if (tipo == "Linha") {
    
    // Pega dados históricos do sessionStorage ou usa dados padrão
    let dadosCPU, dadosRAM, dadosDisco, categorias;
    
    if (dadosHistoricos && dadosHistoricos.length > 0) {
      // Usa dados reais se disponíveis
      dadosCPU = dadosHistoricos.map(d => parseFloat(d.CPU || d.media_CPU || 0));
      dadosRAM = dadosHistoricos.map(d => parseFloat(d.RAM || d.media_RAM || 0));
      dadosDisco = dadosHistoricos.map(d => parseFloat(d.Disco || d.media_Disco || 0));
      
      // Gera categorias baseadas no período
      categorias = dadosHistoricos.map((_, index) => {
        const data = new Date();
        data.setDate(data.getDate() - (dadosHistoricos.length - 1 - index));
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      });
    } else {
      // Dados padrão caso não tenha histórico
      dadosCPU = [10, 41, 35, 51, 49, 62, 69];
      dadosRAM = [50, 80, 30, 58, 26, 54, 15];
      dadosDisco = [60, 58, 62, 65, 63, 60, 65];
      categorias = [
        "01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04"
      ];
    }

    // Determina o número do servidor para o título
    let numeroServidor = servidor?.numeroServidor || servidor?.servidor || 1;
    
    var options = {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false
        }
      },

      series: [
        {
          name: `CPU utilizada (Servidor ${numeroServidor})`,
          data: dadosCPU,
        },
        {
          name: `RAM utilizada (Servidor ${numeroServidor})`,
          data: dadosRAM,
        },
        {
          name: `Disco utilizado (Servidor ${numeroServidor})`,
          data: dadosDisco,
        },
      ],

      xaxis: {
        categories: categorias,
        labels: {
          style: {
            colors: "#000000",
          },
        },
      },

      yaxis: {
        max: 100,
        labels: {
          style: {
            colors: "#000000",
          },
        },
      },

      title: {
        text: `Média do gasto de recursos - Servidor ${numeroServidor}`,
        align: "center",
      },

      stroke: {
        curve: "straight",
        width: 2
      },

      markers: {
        size: 4,
      },

      colors: [
        "#E74C3C", // Vermelho para CPU
        "#3498DB", // Azul para RAM  
        "#27AE60", // Verde para Disco
      ],

      legend: {
        position: "bottom",
        labels: {
          colors: "#000000",
        },
      },

      grid: {
        borderColor: "#e0e0e0",
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(1) + "%";
          }
        }
      }
    };

    // Limpa gráficos anteriores se existirem
    const chartContainer1 = document.querySelector("#myLineChart");
    const chartContainer2 = document.querySelector("#myLineChart2");
    
    if (chartContainer1) {
      chartContainer1.innerHTML = '';
      var chart1 = new ApexCharts(chartContainer1, options);
      chart1.render();
    }
    
    if (chartContainer2) {
      chartContainer2.innerHTML = '';
      var chart2 = new ApexCharts(chartContainer2, options);
      chart2.render();
    }
  }
}

// // Talvez aumentar gráficos

// Dados dos processos
const processData = [
  { process: "Processo 1", cpu: 17, ram: 35 },
  { process: "Processo 2", cpu: 9, ram: 28 },
  { process: "Processo 3", cpu: 5, ram: 18 },
  { process: "Processo 4", cpu: 4, ram: 12 },
  { process: "Processo 5", cpu: 3, ram: 8 },
];

let currentSort = { column: null, direction: null };

// Função para gerar a tabela
function generateTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td class="process-name">${row.process}</td>
                <td class="cpu-usage">${row.cpu}%</td>
                <td class="ram-usage">${row.ram}%</td>

            `;
    tbody.appendChild(tr);
  });
}

// Função para ordenar a tabela
function sortTable(column) {
  // Limpar classes de ordenação anteriores
  document.querySelectorAll("th").forEach((th) => {
    th.classList.remove("sorted-asc", "sorted-desc");
  });

  // Determinar direção da ordenação
  let direction = "desc"; // Sempre do maior ao menor
  if (currentSort.column === column && currentSort.direction === "desc") {
    direction = "asc"; // Se já está ordenado desc, muda para asc
  }

  // Ordenar os dados
  const sortedData = [...processData].sort((a, b) => {
    let valueA, valueB;

    switch (column) {
      case "process":
        valueA = a.process;
        valueB = b.process;
        // Para processos, ordenar alfabeticamente
        if (direction === "desc") {
          return valueB.localeCompare(valueA);
        } else {
          return valueA.localeCompare(valueB);
        }
      case "cpu":
        valueA = a.cpu;
        valueB = b.cpu;
        break;
      case "ram":
        valueA = a.ram;
        valueB = b.ram;
        break;
    }

    // Para valores numéricos
    if (column !== "process") {
      if (direction === "desc") {
        return valueB - valueA; // Maior ao menor
      } else {
        return valueA - valueB; // Menor ao maior
      }
    }
  });

  // Atualizar estado atual da ordenação
  currentSort = { column, direction };

  // Adicionar classe visual ao cabeçalho
  const header = document.getElementById(column + "Header");
  header.classList.add(direction === "desc" ? "sorted-desc" : "sorted-asc");

  // Regenerar tabela com dados ordenados
  generateTable(sortedData);
}

// Inicializar tabela quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  generateTable(processData);
});

const modal = document.getElementById("modal");
const modalContent = modal.querySelector(".modal-content");

function openModal() {
  modal.classList.add("show");
  modalContent.classList.remove("closing");
  document.body.style.overflow = "hidden"; // Previne scroll do body
  setTimeout(() => {
    geradorGraficos("Linha");
    // geradorGraficos('Barra');
  }, 200); // Espera o modal abrir
}

function closeModal() {
  modalContent.classList.add("closing");
  setTimeout(() => {
    modal.classList.remove("show");
    modalContent.classList.remove("closing");
    document.body.style.overflow = "auto"; // Restaura scroll do body
  }, 300);
}

function closeModalOnBackdrop(event) {
  if (event.target === modal) {
    closeModal();
  }
}

function handleAction() {
  alert("Ação confirmada! 🎊");
  closeModal();
}

// Fechar modal com a tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

const mainSelect = document.getElementById("mainSelect");
const hiddenSelect = document.getElementById("hiddenSelect");

mainSelect.addEventListener("change", function () {
  if (this.value === "especial") {
    // Mostra a combobox oculta com animação
    setTimeout(() => {
      hiddenSelect.classList.add("show");
    }, 50);
  } else {
    // Esconde a combobox oculta
    hiddenSelect.classList.remove("show");
  }
});

document
  .getElementById("sltPeriodo")
  .addEventListener("change", trocarVisibilidade);
// Pega o elemento, ao pegar ele, verifica se houve mudança, por isso ele está em change e se tiver mudança, ele roda a função dps da virgula (Não precisa de parenteses dps do nome da função)

document.getElementsByName("server").forEach(function (item) {
  item.addEventListener("change", selecionandoServidor);
});

// Tipos de gráficos que vão ser usados:

// line
// https://apexcharts.com/docs/chart-types/line-chart/

// bar
// https://apexcharts.com/docs/chart-types/bar-chart/

// Exemplos de como o sort funciona:

// Menor RAM primeiro (ordem crescente)
// servidores.sort((a, b) => a.media_RAM - b.media_RAM);
// É basicamente um for que tá percorrendo e reordenando, que nem o Bubble sort e outros sorts do JAVA

// Maior CPU primeiro
// servidores.sort((a, b) => b.media_CPU - a.media_CPU);

// Menor CPU primeiro  
// servidores.sort((a, b) => a.media_CPU - b.media_CPU);

// Por nome (alfabética)
// servidores.sort((a, b) => a.nome.localeCompare(b.nome));

// DAQUI PRA BAIXO 

// function chamandoLambda(qtdDias, dataInicial) {
//   const datacenter = sessionStorage.getItem("DataCenter");

//   fetch(
//     "https://cmu7qp7lb5exg53gb5umhnhuwy0eikhq.lambda-url.us-east-1.on.aws/",
//     // Alterar o Link para o da Amanda
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         qtdDias: qtdDias,
//         dtInicial: dataInicial,
//         datacenter: 1,
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // Limpa dados antigos
//       for (let i = 1; i <= 10; i++) {
//         sessionStorage.removeItem(`servidor${i}`);
//       }

//       // Processa a nova estrutura de dados (array de servidores)
//       if (Array.isArray(data)) {
//         data.forEach(servidor => {
//           const qualServidor = `servidor${servidor.servidor}`;
          
//           // Converte para o formato esperado pelo resto do código
//           const servidorFormatado = {
//             media_CPU: servidor.CPU,
//             media_RAM: servidor.RAM,
//             media_Disco: servidor.Disco
//           };
          
//           sessionStorage.setItem(qualServidor, JSON.stringify(servidorFormatado));
//         });

//         // Calcula média total para o gráfico
//         const mediaTotal = {
//           CPU: data.reduce((sum, s) => sum + s.CPU, 0) / data.length,
//           RAM: data.reduce((sum, s) => sum + s.RAM, 0) / data.length,
//           Disco: data.reduce((sum, s) => sum + s.Disco, 0) / data.length
//         };
        
//         sessionStorage.setItem("mediaTotal", JSON.stringify(mediaTotal));
//       }

//       console.log("Dados processados:", data);
//     })
//     .catch(error => {
//       console.error('Erro ao chamar Lambda:', error);
//     });
// }

// function filtrar() {
//   const PERIODO = document.getElementById('sltPeriodo').value;
//   let qtdDias, dataInicial;

//   if(PERIODO == "optPeriodo7Dias") {
//     qtdDias = 7;
//     dataInicial = pegarData(); // CORREÇÃO: Captura o retorno
//     chamandoLambda(qtdDias, dataInicial);
//   } else if(PERIODO == "optPeriodo30Dias") {
//     qtdDias = 30;
//     dataInicial = pegarData(); // CORREÇÃO: Captura o retorno
//     chamandoLambda(qtdDias, dataInicial);
//   } else if(PERIODO == "optPeriodo3Meses") {
//     qtdDias = 90;
//     dataInicial = pegarData(); // CORREÇÃO: Captura o retorno
//     chamandoLambda(qtdDias, dataInicial);
//   } else {
//     console.log("Período não reconhecido:", PERIODO);
//     return;
//   }

//   // Aguarda um pouco para os dados serem processados
//   setTimeout(() => {
//     const SERVIDOR = mainSelect.value;
//     const SERVIDORESPECIFICO = hiddenSelect.classList.contains("show")
//       ? hiddenSelect.value
//       : "";

//     let servidores = [];

//     // CORREÇÃO: Coleta todos os servidores do sessionStorage
//     for (let i = 1; i <= 10; i++) {
//       const qualServidor = `servidor${i}`;
//       const servidorJSON = sessionStorage.getItem(qualServidor);

//       if (servidorJSON) {
//         try {
//           const servidor = JSON.parse(servidorJSON);
//           servidores.push({
//             nome: qualServidor,
//             numeroServidor: i,
//             ...servidor
//           });
//         } catch (error) {
//           console.error(`Erro ao parsear dados do ${qualServidor}:`, error);
//         }
//       }
//     }

//     console.log("Servidores encontrados:", servidores);

//     // CORREÇÃO: Verificação de dados antes de processar
//     if (servidores.length === 0) {
//       console.warn("Nenhum servidor encontrado nos dados");
//       return;
//     }

//     if(SERVIDOR == 'CPU') {
//       servidores.sort((a, b) => (b.media_CPU || 0) - (a.media_CPU || 0));
//       const primeiroServidor = servidores[0];
//       if (primeiroServidor) {
//         geradorGraficos('Barra', primeiroServidor);
//       }
//     } else if(SERVIDOR == 'RAM') {
//       servidores.sort((a, b) => (b.media_RAM || 0) - (a.media_RAM || 0));
//       const primeiroServidor = servidores[0];
//       if (primeiroServidor) {
//         geradorGraficos('Barra', primeiroServidor);
//       }
//     } else if(SERVIDOR == 'Disco') {
//       servidores.sort((a, b) => (b.media_Disco || 0) - (a.media_Disco || 0));
//       const primeiroServidor = servidores[0];
//       if (primeiroServidor) {
//         geradorGraficos('Barra', primeiroServidor);
//       }
//     } else if(SERVIDOR == 'Personalizado') {
//       servidores.sort((a, b) => a.numeroServidor - b.numeroServidor);
//       const servidorSelecionado = parseInt(document.getElementById("hiddenSelect").value);
//       const servidorDados = servidores.find(s => s.numeroServidor === servidorSelecionado);
      
//       if (servidorDados) {
//         geradorGraficos('Barra', servidorDados);
//       } else {
//         console.warn("Servidor selecionado não encontrado:", servidorSelecionado);
//       }
//     }

//     console.log("Filtros aplicados:", {
//       categoria: SERVIDOR,
//       subcategoria: SERVIDORESPECIFICO,
//       servidoresEncontrados: servidores.length
//     });
//   }, 20000); // CORREÇÃO: Aumenta tempo de espera para 2 segundos
// }

// function geradorGraficos(tipo, servidor, dadosHistoricos = null) {
//   // CORREÇÃO: Verificação de segurança
//   if (!servidor) {
//     console.error("Servidor não definido para gerar gráfico");
//     return;
//   }

//   console.log("Gerando gráfico:", { tipo, servidor });

//   if (tipo == "Barra") {
//     let media = [37.59, 40.1, 30.21];

//     // CORREÇÃO: Verificação de propriedades com valores padrão
//     let dados = [
//       servidor.media_CPU || 0, 
//       servidor.media_RAM || 0, 
//       servidor.media_Disco || 0
//     ];

//     console.log("Dados para gráfico de barra:", dados);

//     var options = {
//       title: {
//         text: `Comparação média com Servidor ${servidor.numeroServidor || 'N/A'}`,
//         align: "center",
//       },

//       chart: {
//         type: "bar",
//         height: 350,
//         background: "#ffffff",
//       },

//       plotOptions: {
//         bar: {
//           horizontal: true,
//           dataLabels: {
//             position: "top",
//           },
//           barHeight: "50%",
//         },
//       },

//       dataLabels: {
//         enabled: true,
//         offsetX: 20,
//         style: {
//           fontSize: "12px",
//           colors: ["#000"],
//         },
//       },

//       series: [
//         {
//           name: "Média Geral",
//           data: media,
//         },
//         {
//           name: `Servidor ${servidor.numeroServidor || 'N/A'}`,
//           data: dados,
//         },
//       ],

//       xaxis: {
//         categories: ["CPU", "RAM", "Disco"],
//         max: 100,
//         labels: {
//           style: {
//             colors: "#000000",
//           },
//         },
//       },

//       yaxis: {
//         labels: {
//           style: {
//             colors: "#000000",
//           },
//         },
//       },

//       legend: {
//         position: "bottom",
//         labels: {
//           colors: "#000000",
//         },
//       },

//       grid: {
//         borderColor: "#555",
//       },

//       colors: [
//         "#5A8DEE", // Cor fixa para "Média" (Azul)
//         function ({ dataPointIndex }) {
//           let valorServidor = dados[dataPointIndex] || 0;
//           let valorMedia = media[dataPointIndex] || 0;

//           if (valorServidor > valorMedia) {
//             return "#E74C3C"; // Vermelho
//           }

//           let diferencaPercentual = valorMedia > 0 
//             ? ((valorMedia - valorServidor) / valorMedia) * 100 
//             : 0;

//           if (diferencaPercentual <= 10) {
//             return "#F39C12"; // Laranja
//           } else {
//             return "#27AE60"; // Verde
//           }
//         },
//       ],
//     };

//     // Limpa gráfico anterior se existir
//     const chartContainer = document.querySelector("#myBarChart");
//     if (chartContainer) {
//       chartContainer.innerHTML = '';
//       var chart = new ApexCharts(chartContainer, options);
//       chart.render();
//     } else {
//       console.error("Container #myBarChart não encontrado");
//     }

//   } else if (tipo == "Linha") {
    
//     // Pega dados históricos do sessionStorage ou usa dados padrão
//     let dadosCPU, dadosRAM, dadosDisco, categorias;
    
//     if (dadosHistoricos && dadosHistoricos.length > 0) {
//       // Usa dados reais se disponíveis
//       dadosCPU = dadosHistoricos.map(d => parseFloat(d.CPU || d.media_CPU || 0));
//       dadosRAM = dadosHistoricos.map(d => parseFloat(d.RAM || d.media_RAM || 0));
//       dadosDisco = dadosHistoricos.map(d => parseFloat(d.Disco || d.media_Disco || 0));
      
//       // Gera categorias baseadas no período
//       categorias = dadosHistoricos.map((_, index) => {
//         const data = new Date();
//         data.setDate(data.getDate() - (dadosHistoricos.length - 1 - index));
//         return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
//       });
//     } else {
//       // Dados padrão caso não tenha histórico
//       dadosCPU = [10, 41, 35, 51, 49, 62, 69];
//       dadosRAM = [50, 80, 30, 58, 26, 54, 15];
//       dadosDisco = [60, 58, 62, 65, 63, 60, 65];
//       categorias = [
//         "01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04"
//       ];
//     }

//     // Determina o número do servidor para o título
//     let numeroServidor = servidor?.numeroServidor || servidor?.servidor || 1;
    
//     var options = {
//       chart: {
//         type: "line",
//         height: 350,
//         toolbar: {
//           show: false
//         }
//       },

//       series: [
//         {
//           name: `CPU utilizada (Servidor ${numeroServidor})`,
//           data: dadosCPU,
//         },
//         {
//           name: `RAM utilizada (Servidor ${numeroServidor})`,
//           data: dadosRAM,
//         },
//         {
//           name: `Disco utilizado (Servidor ${numeroServidor})`,
//           data: dadosDisco,
//         },
//       ],

//       xaxis: {
//         categories: categorias,
//         labels: {
//           style: {
//             colors: "#000000",
//           },
//         },
//       },

//       yaxis: {
//         max: 100,
//         labels: {
//           style: {
//             colors: "#000000",
//           },
//         },
//       },

//       title: {
//         text: `Média do gasto de recursos - Servidor ${numeroServidor}`,
//         align: "center",
//       },

//       stroke: {
//         curve: "straight",
//         width: 2
//       },

//       markers: {
//         size: 4,
//       },

//       colors: [
//         "#E74C3C", // Vermelho para CPU
//         "#3498DB", // Azul para RAM  
//         "#27AE60", // Verde para Disco
//       ],

//       legend: {
//         position: "bottom",
//         labels: {
//           colors: "#000000",
//         },
//       },

//       grid: {
//         borderColor: "#e0e0e0",
//       },

//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return val.toFixed(1) + "%";
//           }
//         }
//       }
//     };

//     // Limpa gráficos anteriores se existirem
//     const chartContainer1 = document.querySelector("#myLineChart");
//     const chartContainer2 = document.querySelector("#myLineChart2");
    
//     if (chartContainer1) {
//       chartContainer1.innerHTML = '';
//       var chart1 = new ApexCharts(chartContainer1, options);
//       chart1.render();
//     }
    
//     if (chartContainer2) {
//       chartContainer2.innerHTML = '';
//       var chart2 = new ApexCharts(chartContainer2, options);
//       chart2.render();
//     }
//   }
// }

// function pegarDataHoje() {
//   const hoje = new Date();

//   const ano = hoje.getFullYear();
//   const mes = String(hoje.getMonth() + 1).padStart(2, "0"); // meses começam do 0
//   const dia = String(hoje.getDate()).padStart(2, "0");

//   const dataFormatada = `${ano}-${mes}-${dia}`;
//   console.log("Data de hoje:", dataFormatada);

//   return dataFormatada;
// }

// // Dados dos processos
// const processData = [
//   { process: "Processo 1", cpu: 17, ram: 35 },
//   { process: "Processo 2", cpu: 9, ram: 28 },
//   { process: "Processo 3", cpu: 5, ram: 18 },
//   { process: "Processo 4", cpu: 4, ram: 12 },
//   { process: "Processo 5", cpu: 3, ram: 8 },
// ];

// let currentSort = { column: null, direction: null };

// // Função para gerar a tabela
// function generateTable(data) {
//   const tbody = document.getElementById("tableBody");
//   if (!tbody) {
//     console.error("Elemento tableBody não encontrado");
//     return;
//   }
  
//   tbody.innerHTML = "";

//   data.forEach((row) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//                 <td class="process-name">${row.process}</td>
//                 <td class="cpu-usage">${row.cpu}%</td>
//                 <td class="ram-usage">${row.ram}%</td>
//             `;
//     tbody.appendChild(tr);
//   });
// }

// // Função para ordenar a tabela
// function sortTable(column) {
//   // Limpar classes de ordenação anteriores
//   document.querySelectorAll("th").forEach((th) => {
//     th.classList.remove("sorted-asc", "sorted-desc");
//   });

//   // Determinar direção da ordenação
//   let direction = "desc"; // Sempre do maior ao menor
//   if (currentSort.column === column && currentSort.direction === "desc") {
//     direction = "asc"; // Se já está ordenado desc, muda para asc
//   }

//   // Ordenar os dados
//   const sortedData = [...processData].sort((a, b) => {
//     let valueA, valueB;

//     switch (column) {
//       case "process":
//         valueA = a.process;
//         valueB = b.process;
//         // Para processos, ordenar alfabeticamente
//         if (direction === "desc") {
//           return valueB.localeCompare(valueA);
//         } else {
//           return valueA.localeCompare(valueB);
//         }
//       case "cpu":
//         valueA = a.cpu;
//         valueB = b.cpu;
//         break;
//       case "ram":
//         valueA = a.ram;
//         valueB = b.ram;
//         break;
//     }

//     // Para valores numéricos
//     if (column !== "process") {
//       if (direction === "desc") {
//         return valueB - valueA; // Maior ao menor
//       } else {
//         return valueA - valueB; // Menor ao maior
//       }
//     }
//   });

//   // Atualizar estado atual da ordenação
//   currentSort = { column, direction };

//   // Adicionar classe visual ao cabeçalho
//   const header = document.getElementById(column + "Header");
//   if (header) {
//     header.classList.add(direction === "desc" ? "sorted-desc" : "sorted-asc");
//   }

//   // Regenerar tabela com dados ordenados
//   generateTable(sortedData);
// }

// // Inicializar tabela quando a página carregar
// document.addEventListener("DOMContentLoaded", function () {
//   generateTable(processData);
// });

// const modal = document.getElementById("modal");

// function openModal() {
//   if (!modal) {
//     console.error("Modal não encontrado");
//     return;
//   }
  
//   const modalContent = modal.querySelector(".modal-content");
  
//   modal.classList.add("show");
//   if (modalContent) {
//     modalContent.classList.remove("closing");
//   }
//   document.body.style.overflow = "hidden"; // Previne scroll do body
  
//   setTimeout(() => {
//     geradorGraficos("Linha");
//   }, 200); // Espera o modal abrir
// }

// function closeModal() {
//   if (!modal) return;
  
//   const modalContent = modal.querySelector(".modal-content");
  
//   if (modalContent) {
//     modalContent.classList.add("closing");
//   }
  
//   setTimeout(() => {
//     modal.classList.remove("show");
//     if (modalContent) {
//       modalContent.classList.remove("closing");
//     }
//     document.body.style.overflow = "auto"; // Restaura scroll do body
//   }, 300);
// }

// function closeModalOnBackdrop(event) {
//   if (event.target === modal) {
//     closeModal();
//   }
// }

// function handleAction() {
//   alert("Ação confirmada! 🎊");
//   closeModal();
// }

// // Fechar modal com a tecla ESC
// document.addEventListener("keydown", function (event) {
//   if (event.key === "Escape" && modal && modal.classList.contains("show")) {
//     closeModal();
//   }
// });

// Inicialização dos selects
// const mainSelect = document.getElementById("mainSelect");
// const hiddenSelect = document.getElementById("hiddenSelect");

if (mainSelect && hiddenSelect) {
  mainSelect.addEventListener("change", function () {
    if (this.value === "Personalizado") {
      // Mostra a combobox oculta com animação
      setTimeout(() => {
        hiddenSelect.classList.add("show");
      }, 50);
    } else {
      // Esconde a combobox oculta
      hiddenSelect.classList.remove("show");
    }
  });
}

// Event listeners
const sltPeriodo = document.getElementById("sltPeriodo");
if (sltPeriodo) {
  sltPeriodo.addEventListener("change", trocarVisibilidade);
}

const serverInputs = document.getElementsByName("server");
if (serverInputs.length > 0) {
  serverInputs.forEach(function (item) {
    item.addEventListener("change", selecionandoServidor);
  });
}

// Função auxiliar para debug
function debugSessionStorage() {
  console.log("=== Debug SessionStorage ===");
  for (let i = 1; i <= 10; i++) {
    const key = `servidor${i}`;
    const data = sessionStorage.getItem(key);
    if (data) {
      console.log(`${key}:`, JSON.parse(data));
    }
  }
  console.log("===========================");
}