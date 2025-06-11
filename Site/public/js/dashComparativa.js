const DATACENTER = sessionStorage.getItem("DataCenter") || "1";

let periodoAtual = "7dias";
let organizacaoDoSortAtual = { column: null, direction: null };
let dadosProcessos = []
let posicaoServidorAtual = 0;

async function inicializarDashboard() {
    
    try {
    // Isso é feito para esperar as lambdas rodarem antes de rodar o gráfico
      await Promise.all([
        // Promisse é basicamente uma promessa, então ele espera que funcione, ela representa o resultado de uma operação que ainda não terminou.
        chamandoLambdaServidores(),
        chamandoLambdaProcessos()
        // No final do código tem uma pequena explicação dos estados da promisse 

      ]);
    
      filtrar();
      carregarMenuLateral();
      gerarBotao();
    
      console.log("Dashboard inicializada");
    
    } catch (error) {
      console.error("Erro ao inicializar dashboard:", error);
    }

}

function gerarBotao() {
  // Cria o botão de baixar
  const BOTAO = document.getElementById("botaoBaixar");

  BOTAO.innerHTML = `Baixar CSV do Datacenter ${DATACENTER}`;
}

function alterarPeriodo(novoPeriodo) {
  periodoAtual = novoPeriodo;
  filtrar()
}

async function chamandoLambdaServidores() {
  const requestBody = {
    datacenter: DATACENTER,
  };

  // Monta o corpo da requisição para ser chamado no /dataCenter posteriormente

  try {
    console.log("Montando o corpo da requisição:", requestBody);
    const response = await fetch("/dataCenter/pegarServidores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log("Erro na response de chamandoLambdaServidores");
    }

    const { dados } = await response.json();

    console.log("Response: ", dados);

    Object.entries(dados).forEach(([periodo, lista]) => {
      sessionStorage.setItem(`${periodo}`, JSON.stringify(lista));
    });

  } catch (error) {
    console.error("Erro ao montar o corpo da requisição:", error);
    return;
  }
}

async function chamandoLambdaProcessos() {
  
  const requestBody = {
    datacenter: DATACENTER,
  };

  // Monta o corpo da requisição para ser chamado no /dataCenter posteriormente

  try {
    console.log("Montando o corpo da requisição:", requestBody);
    const response = await fetch("/dataCenter/pegarProcessos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log("Erro na response de chamandoLambdaServidores");
    }

    const { dados } = await response.json();

    console.log("Response: ", dados);

    Object.entries(dados).forEach(([periodo, lista]) => {
      sessionStorage.setItem(`${periodo}Processos`, JSON.stringify(lista));
    });

  } catch (error) {
    console.error("Erro ao montar o corpo da requisição:", error);
    return;
  }
  
}

function obterDadosPeriodo(periodo) {

  // Sempre vai ser 7dias || 30dias || 90dias (serve para acessar as chaves do Session Storage)
  const dados = sessionStorage.getItem(periodo);
  return dados ? JSON.parse(dados) : null;

}

function obterDadosPeriodoProcessos(periodo) {

  // Sempre vai ser 7dias || 30dias || 90dias (serve para acessar as chaves do Session Storage)
  const dados = sessionStorage.getItem(`${periodo}Processos`);
  return dados ? JSON.parse(dados) : null;

}

async function baixarCSV(qualArquivo) {

  let arquivo;
  let caminho;

  if(qualArquivo == "processos") {

    arquivo = `client_processos${DATACENTER}.csv`;
    caminho = "dadosRobertClient";

  } else if(qualArquivo == "servidores") {
    
    arquivo = `client_datacenter${DATACENTER}.csv`;
    caminho = "dadosRobertClient";

  }

  try {
    const resposta = await fetch(
      `http://44.197.125.73:3000/CSVs/csvTodosServidores/${arquivo}/${caminho}`
    );

    if (!resposta.ok) {
      throw new Error(
        `Erro ao buscar arquivo: ${resposta.status} - ${resposta.statusText}`
      );
    }

    const blob = await resposta.blob();
    // Blob (Binary Large Object) é o que gera o arquivo, ou seja, ele armazena tudo como um sistema binário e dps envia para outro lugar, aqui estamos recebendo o blob do arquivo que tá lá no S3, para ele transformar no arquivo do usuário
    console.log("Blob recebido:", blob);

    // Aqui ele cria o link do download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = arquivo;

    document.body.appendChild(a);
    a.click();

    // Limpa recursos urilizados para não ficar gastando memória atoa
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    console.log("Download iniciado com sucesso!");
  } catch (error) {
    // Aqui é só a validação de erro que eu tava fazendo
    console.error("Erro no download:", error);
    // alert('Erro ao baixar arquivo: ' + error.message);
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
  
  dadosProcessos = [];

  let dadosServidor = obterDadosPeriodo(periodoAtual)
  // console.log(dadosServidor)

  let dadosMedia = dadosServidor.pop()
  // console.log(dadosMedia)
  // Aqui separa o último valor, nesse caso, a média

  const dadosServidorProcessos = obterDadosPeriodoProcessos(periodoAtual)
  // Aqui pega os dados dos processos

  const SERVIDOR = mainSelect.value;
  const ServidorEspecifico = hiddenSelect.value;
  // mainSelect é o nome do select que pega qual é para plotar no gráfico e o Hidden é o que fica escondido para ser selecionado dps 
  // console.log(SERVIDOR)
  // console.log(ServidorEspecifico)

  if (SERVIDOR === "CPU") {
    
    dadosServidor.sort((a, b) => b.CPU - a.CPU);
    const primeiroServidor = dadosServidor[0];
    const indiceServidorProcessos = (dadosServidor[0].servidor) - 1
    posicaoServidorAtual = (dadosServidor[0].servidor) - 1

    const processosFiltrados = dadosServidorProcessos[indiceServidorProcessos].processos;
    // console.log(processosFiltrados)

    for (let i = 0; i < processosFiltrados.length; i++) {

      const nome = processosFiltrados[i].name;
      const cpu = processosFiltrados[i].cpuPercent;
      const ram = processosFiltrados[i].ramPercent;
      
      const novoArray = {process : nome, cpu : cpu, ram : ram}

      dadosProcessos.push(novoArray);

    }

    // Dá pra otimizar dps só mudando o nome dentro de processos para o padrão que já é esperado aqui para não precisar fazer esse for a mais

    geradorGraficos("Barra", primeiroServidor, dadosMedia);
    gerarTable(dadosProcessos)
    // gerarTable(sortedData.slice(0, 4))

  } else if (SERVIDOR === "RAM") {
    dadosServidor.sort((a, b) => b.RAM - a.RAM);
    const primeiroServidor = dadosServidor[0];
    const indiceServidorProcessos = (dadosServidor[0].servidor) - 1
    posicaoServidorAtual = (dadosServidor[0].servidor) - 1

    const processosFiltrados = dadosServidorProcessos[indiceServidorProcessos].processos;

    for (let i = 0; i < processosFiltrados.length; i++) {

      const nome = processosFiltrados[i].name;
      const cpu = processosFiltrados[i].cpuPercent;
      const ram = processosFiltrados[i].ramPercent;
      
      const novoArray = {process : nome, cpu : cpu, ram : ram}

      dadosProcessos.push(novoArray);

    }

    geradorGraficos("Barra", primeiroServidor, dadosMedia);
    gerarTable(dadosProcessos)

  } else if (SERVIDOR === "Disco") {
    dadosServidor.sort((a, b) => b.Disco - a.Disco);
    const primeiroServidor = dadosServidor[0];
    const indiceServidorProcessos = (dadosServidor[0].servidor) - 1
    posicaoServidorAtual = (dadosServidor[0].servidor) - 1

    const processosFiltrados = dadosServidorProcessos[indiceServidorProcessos].processos;

    for (let i = 0; i < processosFiltrados.length; i++) {

      const nome = processosFiltrados[i].name;
      const cpu = processosFiltrados[i].cpuPercent;
      const ram = processosFiltrados[i].ramPercent;
      
      const novoArray = {process : nome, cpu : cpu, ram : ram}

      dadosProcessos.push(novoArray);

    }

    geradorGraficos("Barra", primeiroServidor, dadosMedia);
    gerarTable(dadosProcessos)
  
  } else if(SERVIDOR === "Personalizado" && ServidorEspecifico != "#") {
    // console.log("Entrou no personalizado")

    posicaoServidorAtual = ServidorEspecifico
    const servidorDesejado = dadosServidor[ServidorEspecifico]

    const processosFiltrados = dadosServidorProcessos[ServidorEspecifico].processos;

    for (let i = 0; i < processosFiltrados.length; i++) {

      const nome = processosFiltrados[i].name;
      const cpu = processosFiltrados[i].cpuPercent;
      const ram = processosFiltrados[i].ramPercent;
      
      const novoArray = {process : nome, cpu : cpu, ram : ram}

      dadosProcessos.push(novoArray);

    }

    geradorGraficos("Barra", servidorDesejado, dadosMedia);
    gerarTable(dadosProcessos)
  }

}

function comparacaoServidores() {
  // console.log("Entrou na comparação")

  let dadosServidor = obterDadosPeriodo(periodoAtual)
  // console.log(dadosServidor)

  const servidorEscolhido1 = dadosServidor[posicaoServidorAtual];
  // console.log(servidorEscolhido1)

  let selecionado = document.getElementById('sltServidor2').value
  // console.log("Selecionado:", selecionado)

  if(selecionado == '#') {
    // console.log('Caiu no if')
    const servidorEscolhido2 = dadosServidor[1]
    geradorGraficos('Barra', servidorEscolhido1, servidorEscolhido2)

  } else {
    const servidorEscolhido2 = dadosServidor[selecionado]
    geradorGraficos('Barra', servidorEscolhido1, servidorEscolhido2)

  }

}

function geradorGraficos(tipo, servidor, segundoValor) {
  if (tipo === "Barra") {

    let dados = [
      servidor.CPU,
      servidor.RAM,
      servidor.Disco,
    ];

    let media = false;

    if(segundoValor.servidor == "mediaTotal") {
      media = true
      // console.log("Entrou na médiaTotal")
    }

    // console.log(segundoValor)

    let dados2 = [
      segundoValor.CPU,
      segundoValor.RAM,
      segundoValor.Disco,
    ]

    var options = {
      title: {
        style: {
          fontSize: "20px",
          colors: "#000000",
        },
        text: media ? `Comparação média do servidor escolhido (${servidor.servidor}) com Datacenter ${DATACENTER}` : `Comparação média do servidor ${servidor.servidor} com servidor ${segundoValor.servidor}`,
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
      dataLabels: {
        enabled: true,
        offsetX: 20,
        style: {
          fontSize: "14px",
          colors: ["#000"],
        },
      },
      series: [
        {
          name : media ? "Média" : `Servidor ${servidor.servidor}`,
          data: dados2,
        },
        {
          name: media ? `Servidor ${servidor.servidor}` : `Servidor ${segundoValor.servidor}`,
          data: dados,
        },
      ],
      xaxis: {
        categories: ["CPU", "RAM", "Disco"],
        max: 100,
        labels: {
          style: {
            fontSize: "16px",
            colors: "#000000",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "16px",
            colors: "#000000",
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#000000",
        },
        fontSize: "16px",
      },
      grid: {
        borderColor: "#555",
      },
      colors: media ? [
        "#5A8DEE", // Cor fixa para "Média" (Azul)
          function ({ dataPointIndex }) {
            let valorServidor = dados[dataPointIndex];
            let valorMedia = [segundoValor.CPU, segundoValor.RAM, segundoValor.Disco][dataPointIndex];

            if (valorServidor > valorMedia) {
              return "#E74C3C"; // Vermelho
            }

            let diferencaPercentual = ((valorMedia - valorServidor) / valorMedia) * 100;

            if (diferencaPercentual <= 10) {
              return "#F39C12"; // Laranja
            } else {
              return "#27AE60"; // Verde
            }
          },
      ] : [
      "#5A8DEE", // Azul para os primeiros dados
      "#E91E63", // Rosa para os segundos dados
      ],
    };

    // Limpa gráfico anterior se existir
    const chartContainer = media ? document.querySelector("#myBarChart") : document.querySelector("#myBarChartComparativa");
    if (chartContainer) {
      chartContainer.innerHTML = "";
    }

    var chart = new ApexCharts(chartContainer, options);
    chart.render();

  } else if (tipo == "Linha") {
    // Pega dados históricos do sessionStorage ou usa dados padrão
    let dadosCPU, dadosRAM, dadosDisco, categorias;

    if (dadosHistoricos && dadosHistoricos.length > 0) {
      // Usa dados reais se disponíveis
      dadosCPU = dadosHistoricos.map((d) =>
        parseFloat(d.CPU || d.media_CPU || 0)
      );
      dadosRAM = dadosHistoricos.map((d) =>
        parseFloat(d.RAM || d.media_RAM || 0)
      );
      dadosDisco = dadosHistoricos.map((d) =>
        parseFloat(d.Disco || d.media_Disco || 0)
      );

      // Gera categorias baseadas no período
      categorias = dadosHistoricos.map((_, index) => {
        const data = new Date();
        data.setDate(data.getDate() - (dadosHistoricos.length - 1 - index));
        return data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });
      });
    } else {
      // Dados padrão caso não tenha histórico
      dadosCPU = [10, 41, 35, 51, 49, 62, 69];
      dadosRAM = [50, 80, 30, 58, 26, 54, 15];
      dadosDisco = [60, 58, 62, 65, 63, 60, 65];
      categorias = [
        "01/04",
        "02/04",
        "03/04",
        "04/04",
        "05/04",
        "06/04",
        "07/04",
      ];
    }

    // Determina o número do servidor para o título
    let numeroServidor = servidor?.numeroServidor || servidor?.servidor || 1;

    var options = {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
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
        width: 2,
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
          },
        },
      },
    };

    // Limpa gráficos anteriores se existirem
    const chartContainer1 = document.querySelector("#myLineChart");
    const chartContainer2 = document.querySelector("#myLineChart2");

    if (chartContainer1) {
      chartContainer1.innerHTML = "";
      var chart1 = new ApexCharts(chartContainer1, options);
      chart1.render();
    }

    if (chartContainer2) {
      chartContainer2.innerHTML = "";
      var chart2 = new ApexCharts(chartContainer2, options);
      chart2.render();
    }
  }
}

// Função para gerar a tabela
function gerarTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  console.log(data)

  data.slice(0, 5).forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="process-name">${row.process}</td>
        <td class="cpu-usage">${row.cpu}%</td>
        <td class="ram-usage">${row.ram}%</td>
    `;
    tbody.appendChild(tr);
    // dadosProcessos = [];
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
  if (organizacaoDoSortAtual.column === column && organizacaoDoSortAtual.direction === "desc") {
    direction = "asc"; // Se já está ordenado desc, muda para asc
  }

  // Ordenar os dados
  const sortedData = [...dadosProcessos].sort((a, b) => {
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
  organizacaoDoSortAtual = { column, direction };

  // Adicionar classe visual ao cabeçalho
  const header = document.getElementById(column + "Header");
  header.classList.add(direction === "desc" ? "sorted-desc" : "sorted-asc");

  gerarTable(sortedData)
}

const modal = document.getElementById("modal");
const modalContent = modal.querySelector(".modal-content");

// Abrir e fechar modal:

function openModal() {
  modal.classList.add("show");
  modalContent.classList.remove("closing");
  document.body.style.overflow = "hidden"; // Previne scroll do body
  setTimeout(() => {
    // geradorGraficos("Linha");
    comparacaoServidores();
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

// Fecha o modal quando clicado fora dele
function closeModalOnBackdrop(event) {
  if (event.target === modal) {
    closeModal();
  }
}

// Fecha o modal com a tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

// Event Listeners:

document.getElementsByName("server").forEach(function (item) {
  item.addEventListener("change", selecionandoServidor);
});

if (mainSelect && hiddenSelect) {
// Pega o elemento, ao pegar ele, verifica se houve mudança, por isso ele está em change e se tiver mudança, ele roda a função dps da virgula (Não precisa de parenteses dps do nome da função)
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
    filtrar()
  });

  hiddenSelect.addEventListener("change", function() {
    filtrar()
  })

}

const serverInputs = document.getElementsByName("server");
if (serverInputs.length > 0) {
  serverInputs.forEach(function (item) {
    item.addEventListener("change", selecionandoServidor);
  });

  
}

document.getElementsByName("serverSlt").forEach(function (item) {
  item.addEventListener("change", comparacaoServidores);
  console.log("Evento change disparado!");
});

// Muda a cor dos botões
[...document.getElementsByClassName("botao-filtro")].forEach(
  (item, index, self) => {
    // getElementsByClassName mão retorna um array, então o colchetes + os 3 pontinhos ele pega cada elemento do getElements e vai botando como um objeto do array
    item.addEventListener("click", function (event) {
      self.forEach((item) => (item.style.background = "#bfcbf4"));
      event.currentTarget.style.background = "#7286d5";
    });
  }
);

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

// Estados do promisse:

// Pending (Pendente): A operação ainda está rodando
// Fulfilled (Resolvida): A operação terminou com sucesso
// Rejected (Rejeitada): A operação falhou