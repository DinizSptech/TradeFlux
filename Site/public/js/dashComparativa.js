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
  // Funcionando
  const BOTAO = document.getElementById("botaoBaixar");

  BOTAO.innerHTML = `Baixar CSV do Datacenter ${sessionStorage.getItem(
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

  return fetch('/dataCenter/pegarServidores', {
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
    qtdDias = 7;
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

function baixarCSV() {
  // Baixa CSV do Bucket
  const DATACENTER = 1;
  const url = 'https://bucket-client-tradeflux-123.s3.us-east-1.amazonaws.com/Datacenter1Robert/servidor1.csv?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLWVhc3QtMSJGMEQCIAQutTNcD%2BUgJo6bQmXQtcAb2TKkLigwYvnLwxMryjTBAiBnAmKJJboSNs8hLoxEnlHengUdBDo8GhU0i25%2FtloMeyrhAwgbEAEaDDE4NTI1NzMyNzUyOSIMMelUbYJG4g56UrnZKr4DSJ9szw2bDkY486GPaAfOMmXYQLEJBvCURu7dyOYn8XJ1rOUwPdgIsOJeubDc%2BWUPKsmPoTem2MJuWN%2FLU65Uv1e%2Ff49Tsz255e6YIWAACoU4nk4ORy29fpS7HjyT3YICqxfuMJ22eDSPmlQH%2FYI9p2d%2FXvV9J1a%2F%2B1at6mkMy5P%2BdDmW1X7U1qrdc8AN%2BmpkN1OuWsf2ZrA6FuuXQZQYRk4Ft4VWkZuTi8pfWYGXDHiA3ZRLoMACYcjfhqTGDDnDU%2FYnA0TyRIhTPCEvg2OLYDOQDIe%2FLtYiZ8ILlQN%2FvQTIio%2B6EjvQMydv6iIM7HntMecj8uiXoIqYOGTr07UCHZTiZEPaFmfVjftl9itmCJpK8bSE3fq189nUeCADcUjoviTu2IFkOMON5JKCK0ysPMapnxwgKMmf8qXUQL%2FUYoycyuQoPd419aNuCDNekEr5YVJ2S9oV7M8KxD3oaW1IwPBohcn0ThYgTneefPiUxlVjOD23LdvkJw96MjFpPiKOCYlZlj89T83eCCqkBTORylJgfL1eAiB3tKEFEB7byjT8IrjePt6HmNnxZ%2F3lzmKygucoODBv5oscx4lwK58wmK78wQY6uAIRQtl3IjOJzSum7Oml%2FRSb%2Beanmxgw76wdp0kj%2FSBuMQ5YO%2F56IB%2B9i65Z%2FlRmh4o1ND8f2WhXmLj6lWpcoTRO6eEKni%2Fcs6CD3znt9fmhPOrOQy%2BzWm74xCbqd8iFfbwp6H5uyCfLPpkzV%2B7JAsa89uc9YEwvniyQcsyactHmcAjKZG92qxUWYrUhH4A1ha63NCq45bs8M6ZNECKv0EUCH5%2BmEmKMDNlQX%2F%2FmKRxtGV9CxDgXuLZVCNCRgpHfoU4sxf3fEi08nylRxLJimHW0JI8DnCz2RuupZ8Eo0kt11dxWC2n9vi3A82cLnaccTse7SphdxFSlFTOgcZswjtGpKKnl1hBMPulrXFkKFkP%2FpXfva2WxuxApw50%2BLndL8H1xaC9ASl9hSJrpx2oL2lRH0idT7osVikM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASWIRSPOUTUTKO3K7%2F20250603%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250603T173514Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=45ede0a178cc32788cf55dfe00083c369da8177561eed650aa0b29ec22d6e268'
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  if (DATACENTER == 1) {
    fetch(proxyUrl + url)
  .then(response => {
    console.log('Status da resposta:', response.status);
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    return response.blob();
  })
  .then(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'servidor1.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  })
  .catch(err => {
    console.error('Erro ao baixar arquivo:', err);
  });
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
    servidores.sort((a, b) => b.media_Disco - a.media_Disco);
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

function obterMediaTotal() {
  const mediaTotalJSON = sessionStorage.getItem("mediaTotal");
  if (mediaTotalJSON) {
    const mediaTotal = JSON.parse(mediaTotalJSON);
    console.log("Média Total:", mediaTotal);
    return mediaTotal;
  } else {
    console.error("Nenhuma média total encontrada no sessionStorage.");
    return null;
  }
}

function geradorGraficos(tipo, servidor, dadosHistoricos = null) {
  if (tipo === "Barra") {
    const servidorSelecionado = servidor || {
      media_CPU: 0,
      media_RAM: 0,
      Disco: 0
    };

    const MEDIA = obterMediaTotal()
    let media = {
      CPU: 37.59,
      RAM: 40.1,
      Disco: 30.21
    };

    let dados = [
      servidorSelecionado.media_CPU, 
      servidorSelecionado.media_RAM, 
      servidorSelecionado.media_Disco
    ];

    var options = {
      title: {
        text: "Comparação média com servidor escolhido",
        align: "center",
      },
      chart: {
        type: "bar",
        height: 310,
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