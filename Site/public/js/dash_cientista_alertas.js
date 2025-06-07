var dadosCalendario = [];
var dadosComponentes = [];
var dadosServidores = [];
var dadosTotaisAlertas = [];
var dadosCalendario = [];
var dadosStatus = [];
var tipoAlertaAtual = "atencao";
var dadosServidoresAtencao = [];
var dadosServidoresCriticos = [];
var tipoGraficoServidores = "criticos";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("abaAlertasAtencao")
    .addEventListener("click", function () {
      definirAbaAtiva(this);
      document.getElementById("legendaAlertasAtencao").style.display = "flex";
      document.getElementById("legendaAlertasCriticos").style.display = "none";
      tipoAlertaAtual = "atencao";
      renderizarCalendario();
    });

  document
    .getElementById("abaAlertasCriticos")
    .addEventListener("click", function () {
      definirAbaAtiva(this);
      document.getElementById("legendaAlertasAtencao").style.display = "none";
      document.getElementById("legendaAlertasCriticos").style.display = "flex";
      tipoAlertaAtual = "critico";
      renderizarCalendario();
    });

  

  
  document.getElementById("btnServidoresCriticos").addEventListener("click", function () {
    tipoGraficoServidores = "criticos";
    definirAbaAtivaServidores(this);
    renderizarGraficoServidores();
  });

  document.getElementById("btnServidoresAtencao").addEventListener("click", function () {
    tipoGraficoServidores = "atencao";
    definirAbaAtivaServidores(this);
    renderizarGraficoServidores();
  });

  function definirAbaAtivaServidores(botaoAba) {
    document.querySelectorAll(".menuAbasTipo.servidores .botaoTipoAlerta").forEach(function (botao) {
      botao.classList.remove("ativo");
    });
    botaoAba.classList.add("ativo");
  }
carregarDadosDashboard();
});

function carregarDadosDashboard() {
  Promise.all([
    buscarDadosCalendario(),
    buscarDadosComponentes(),
    buscarDadosServidoresCriticos(),
    buscarDadosServidoresAtencao(), 
    buscarDadosTotaisAlerta(),
    buscarDadosStatusServidor(),
  ])
    .then(() => {
      renderizarCalendario();
      renderizarGraficoComponentes();
      renderizarGraficoServidores();
      renderizarKPIsTotais();
      atualizarKpiCorrelacao();
    })
    .catch((erro) => {
      console.error("Erro ao carregar dados da dashboard:", erro);
    });
}

function calcularStatusServidores(dadosServidores) {
  console.log("=== DEBUG 11092 DE STATUS SERVIDORES ===");
  console.log("Total de servidores retornados:", dadosServidores.length);
  
  const totalServidores = dadosServidores.length;
  let criticos = 0;
  let atencao = 0;
  let estaveis = 0;
  
  dadosServidores.forEach(servidor => {
    console.log(`Servidor ${servidor.idservidor}: Críticos=${servidor.alertas_criticos}, Atenção=${servidor.alertas_atencao}`);
    
    if (servidor.alertas_criticos > 0) {
      criticos++;
      console.log(`  → Status: CRÍTICO`);
    } else if (servidor.alertas_atencao > 0) {
      atencao++;
      console.log(`  → Status: ATENÇÃO`);
    } else {
      estaveis++;
      console.log(`  → Status: ESTÁVEL`);
    }
  });
  
  console.log(`Resumo: Críticos=${criticos}, Atenção=${atencao}, Estáveis=${estaveis}`);
  console.log("=== FIM DEBUG ===");
  
  return {
    critico: ((criticos / totalServidores) * 100).toFixed(2),
    atencao: ((atencao / totalServidores) * 100).toFixed(2),
    estavel: ((estaveis / totalServidores) * 100).toFixed(2)
  };
}

function buscarDadosStatusServidor() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  return fetch(`/alertas/getStatusServidores/${idDataCenter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar dados de status de servidor.");
      }
    })
    .then((registros) => {
      console.log("Dados brutos dos servidores:", registros);
      
      const statusCalculado = calcularStatusServidores(registros);
      
      console.log("Status calculado:", statusCalculado);
      dadosStatus = statusCalculado;
      
      renderizarDadosStatusServidor([statusCalculado]);
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados de status:", erro);
      throw erro;
    });
}

function renderizarDadosStatusServidor(dadosDB) {
  document.getElementById("td_status_critico").innerHTML = dadosDB[0].critico + "%";
  document.getElementById("td_status_atencao").innerHTML = dadosDB[0].atencao + "%";
  document.getElementById("td_status_estavel").innerHTML = dadosDB[0].estavel + "%";
}
function buscarDadosCalendario() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  return fetch(`/alertas/getAlertasCalendario/${idDataCenter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar dados do calendário.");
      }
    })
    .then((registros) => {
      console.log("Dados do calendário recebidos:", registros);
      dadosCalendario = processarDadosCalendario(registros);
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados do calendário:", erro);
      throw erro;
    });
}
function buscarDadosTotaisAlerta() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  return fetch(`/alertas/getTotalAlertas/${idDataCenter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar quantidade de alertas.");
      }
    })
    .then((registros) => {
      console.log("Dados de quantidade de alertas:", registros);
      dadosTotaisAlertas = registros;
      kpi_alerta_atencao.innerHTML = dadosTotaisAlertas[0].alertas_atencao;
      kpi_alerta_critico.innerHTML = dadosTotaisAlertas[0].alertas_criticos;
      console.log(dadosTotaisAlertas);
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados de quantidade de alertas:", erro);
      throw erro;
    });
}

function buscarDadosComponentes() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  return fetch(`/alertas/getQtdAlertasComponente/${idDataCenter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar dados dos componentes.");
      }
    })
    .then((registros) => {
      console.log("Dados dos componentes recebidos:", registros);
      dadosComponentes = registros;
      renderizarGraficoComponentes(dadosComponentes);
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados dos componentes:", erro);
      throw erro;
    });
}

function buscarDadosServidoresCriticos() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  return fetch(`/alertas/getTopServidoresAlertasCriticos/${idDataCenter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar dados dos servidores críticos.");
      }
    })
    .then((registros) => {
      console.log("Dados dos servidores críticos recebidos:", registros);
      dadosServidoresCriticos = registros;
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados dos servidores críticos:", erro);
      throw erro;
    });
}

function buscarDadosServidoresAtencao() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  return fetch(`/alertas/getTopServidoresAlertasAtencao/${idDataCenter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar dados dos servidores de atenção.");
      }
    })
    .then((registros) => {
      console.log("Dados dos servidores de atenção recebidos:", registros);
      dadosServidoresAtencao = registros;
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados dos servidores de atenção:", erro);
      throw erro;
    });
}

function processarDadosCalendario(dadosDB) {
  const hoje = new Date();
  const diasAtras30 = new Date();
  diasAtras30.setDate(hoje.getDate() - 29);

  const datas = [];
  const dataAtual = new Date(diasAtras30);

  while (dataAtual <= hoje) {
    datas.push({
      data: formatarDataSQL(dataAtual),
      displayData: formatarDataExibicao(dataAtual),
      diaDaSemana: dataAtual.getDay(),
      alertasAtencao: 0,
      alertasCriticos: 0,
      total: 0,
    });
    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  dadosDB.forEach((registro) => {
    const dataFormatada = registro.data_alerta.split('T')[0];
    
    const dataIndex = datas.findIndex((d) => d.data === dataFormatada);

    if (dataIndex >= 0) {
      datas[dataIndex].alertasAtencao = parseInt(registro.alertas_atencao) || 0;
      datas[dataIndex].alertasCriticos = parseInt(registro.alertas_criticos) || 0;
      datas[dataIndex].total = parseInt(registro.total_alertas) || 0;
    }
  });

  return datas;
}

function formatarDataSQL(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(data.getDate()).padStart(2, "0")}`;
}

function formatarDataExibicao(data) {
  return `${String(data.getDate()).padStart(2, "0")}/${String(
    data.getMonth() + 1
  ).padStart(2, "0")}`;
}

function obterCorAlertaAtencao(valor) {
  if (valor === 0) return "#91cc75";
  if (valor <= 2) return "#ffe066";
  if (valor <= 5) return "#ffc145";
  return "#ffa10a";
}

function obterCorAlertaCritico(valor) {
  if (valor === 0) return "#91cc75";
  if (valor <= 2) return "#ff9e80";
  if (valor <= 5) return "#ff6e40";
  return "#ff3d00";
}
function obterCorAlertaAtencaoTXT(valor) {
  if (valor === 0) return "#000";
  if (valor <= 2) return "#000";
  if (valor <= 5) return "#000";
  return "#000";
}

function obterCorAlertaCriticoTXT(valor) {
  if (valor === 0) return "#000";
  if (valor <= 2) return "#000";
  if (valor <= 5) return "#FFF";
  return "#FFF";
}

function definirAbaAtiva(botaoAba) {
  document.querySelectorAll(".botaoTipoAlerta").forEach(function (botao) {
    botao.classList.remove("ativo");
  });
  botaoAba.classList.add("ativo");
}

function renderizarCalendario() {
  if (dadosCalendario.length === 0) return;

  const painelCalendario = document.getElementById("calendarioAlertas");
  let htmlCalendario = "";

  const semanas = [];
  let semanaAtual = [];

  for (let i = 0; i < dadosCalendario.length; i++) {
    semanaAtual.push(dadosCalendario[i]);

    if (
      dadosCalendario[i].diaDaSemana === 6 ||
      i === dadosCalendario.length - 1
    ) {
      if (semanaAtual[0].diaDaSemana !== 0) {
        const diasVazios = semanaAtual[0].diaDaSemana;
        for (let e = 0; e < diasVazios; e++) {
          semanaAtual.unshift(null);
        }
      }

      if (
        semanaAtual[semanaAtual.length - 1] &&
        semanaAtual[semanaAtual.length - 1].diaDaSemana !== 6
      ) {
        const diasVazios = 6 - semanaAtual[semanaAtual.length - 1].diaDaSemana;
        for (let e = 0; e < diasVazios; e++) {
          semanaAtual.push(null);
        }
      }

      semanas.push([...semanaAtual]);
      semanaAtual = [];
    }
  }

  semanas.forEach((semana) => {
    htmlCalendario += '<div class="linhaCalendario">';

    semana.forEach((dia) => {
      if (dia) {
        const valorAlerta =
          tipoAlertaAtual === "atencao"
            ? dia.alertasAtencao
            : dia.alertasCriticos;
        const corAlerta =
          tipoAlertaAtual === "atencao"
            ? obterCorAlertaAtencao(valorAlerta)
            : obterCorAlertaCritico(valorAlerta);
        const corAlertaTXT =
          tipoAlertaAtual === "atencao"
            ? obterCorAlertaAtencaoTXT(valorAlerta)
            : obterCorAlertaCriticoTXT(valorAlerta);

        htmlCalendario += `
                    <div class="celulaCalendario" 
                        style="background-color: ${corAlerta}; color: ${corAlertaTXT}" 
                        data-data="${dia.displayData}"
                        data-atencao="${dia.alertasAtencao}"
                        data-critico="${dia.alertasCriticos}"
                        data-total="${dia.total}"
                        onmouseover="mostrarBalaoInfo(event, this.dataset)"
                        onmouseout="ocultarBalaoInfo()">
                        <div class="numeroDiaCelula" style="color: ${corAlertaTXT};">${dia.displayData}</div>
                        ${valorAlerta}
                    </div>
                `;
      } else {
        htmlCalendario +=
          '<div class="celulaCalendario" style="background-color: #f4f6fa;"></div>';
      }
    });

    htmlCalendario += "</div>";
  });

  painelCalendario.innerHTML = htmlCalendario;
}

function mostrarBalaoInfo(evento, dadosDia) {
  const balaoInfo = document.getElementById("balaoInfoAlertas");
  balaoInfo.style.display = "block";

  balaoInfo.style.left = evento.pageX + 1 + "px";
  balaoInfo.style.top = evento.pageY + 1 + "px";

  balaoInfo.querySelector(
    ".tituloBalaoInfo"
  ).textContent = `Data: ${dadosDia.data}`;
  balaoInfo.querySelectorAll(".valorAlertaBalao")[0].textContent =
    dadosDia.atencao;
  balaoInfo.querySelectorAll(".valorAlertaBalao")[1].textContent =
    dadosDia.critico;
  balaoInfo.querySelectorAll(".valorAlertaBalao")[2].textContent =
    dadosDia.total;
}

function ocultarBalaoInfo() {
  const balaoInfo = document.getElementById("balaoInfoAlertas");
  balaoInfo.style.display = "none";
}

let grafico_alertas;

function renderizarGraficoComponentes(dadosDB) {
  if (dadosComponentes.length === 0) return;

  const categorias = dadosComponentes.map((item) => item.componente);
  var categorias_refinadas = ["CPU (%)", "RAM (%)", "DISCO (%)"]
  const alertasAtencao = dadosComponentes.map(
    (item) => parseInt(item.alertas_atencao) || 0
  );
  const alertasCriticos = dadosComponentes.map(
    (item) => parseInt(item.alertas_criticos) || 0
  );

  const opcoes_grafico = {
    chart: {
      type: "bar",
      background: "transparent",
      height: "100%",
      width: "100%",
    },
    legend: {
      position: "bottom",
      offsetY: 0,
      labels: {
        colors: "#2b2b2b",
      },
    },
    colors: ["#ffe066", "#ff7373"],
    title: {
      text: ["Proporção dos componentes nos", "alertas dos últimos 30 dias"],
      align: "center",
      style: {
        color: "#2b2b2b",
        fontSize: "20px",
      },
    },
    series: [
      { name: "Alertas em Atenção", data: alertasAtencao },
      { name: "Alertas Críticos", data: alertasCriticos },
    ],
    xaxis: {
      categories: categorias_refinadas,
      labels: {
        style: { 
          colors: "#000000",
          fontWeight: "700", 
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      labels: {
        style: { 
          colors: "#000000",
          fontWeight: "700",
          fontSize: "16px", 
        },
      },
    },
    grid: {
      borderColor: "#e9edf5",
    },
    dataLabels: {
      style: {
        colors: ["#ffffff"],
      },
    },
  };

  // Destruir gráfico anterior se existir
  if (grafico_alertas) {
    grafico_alertas.destroy();
  }

  grafico_alertas = new ApexCharts(
    document.querySelector("#grafico_alertas"),
    opcoes_grafico
  );
  grafico_alertas.render();
}

let grafico_servidores;

function renderizarGraficoServidores() {
  let dadosParaUsar = [];
  let titulo = "";
  let cor = "";
  let nomeSerie = "";

  if (tipoGraficoServidores == "criticos") {
    dadosParaUsar = dadosServidoresCriticos;
    titulo = ["5 Servidores com Mais Alertas", "Críticos nos Últimos 30 Dias"];
    cor = "#ff7373";
    nomeSerie = "Alertas Críticos";
  } else {
    dadosParaUsar = dadosServidoresAtencao;
    titulo = [
      "5 Servidores com Mais Alertas",
      "de Atenção nos Últimos 30 Dias",
    ];
    cor = "#ffe066";
    nomeSerie = "Alertas de Atenção";
  }

  if (dadosParaUsar.length === 0) return;

  const nomes = dadosParaUsar.map((item) => item.nome_servidor);
  const quantidades = dadosParaUsar.map(
    (item) => parseInt(item.qtd_alertas) || 0
  );

  const opcoes_servidores = {
    chart: {
      type: "bar",
      background: "transparent",
      height: "100%",
      width: "100%",
    },
    colors: [cor],
    title: {
      text: titulo,
      align: "center",
      style: {
        color: "#2b2b2b",
        fontSize: "20px",
      },
    },
    series: [{ name: nomeSerie, data: quantidades }],
    xaxis: {
      categories: nomes,
      labels: {
        style: { 
          colors: "#000",
          fontWeight: "700",
          fontSize: '16px'
        },
      },
    },
    yaxis: {
      labels: {
        style: { 
          colors: "#000000",
          fontWeight: "700", 
          fontSize: "16px",
        },
      },
    },
    grid: {
      borderColor: "#e9edf5",
    },
    dataLabels: {
      style: {
        colors: ["#ffffff"],
      },
    },
    
  };
  if (grafico_servidores) {
    grafico_servidores.destroy();
  }

  grafico_servidores = new ApexCharts(
    document.getElementById("grafico_servidores"),
    opcoes_servidores
  );
  grafico_servidores.render();
}

function renderizarKPIsTotais() {
  if (dadosTotaisAlertas == 0) return;
  kpi_alertas_atencao = document.getElementById("kpi_alerta_atencao");
  kpi_alertas_criticos = document.getElementById("kpi_alerta_critico");
  kpi_alerta_atencao.innerHTML = dadosTotaisAlertas[0].alertas_atencao;
  kpi_alerta_critico.innerHTML = dadosTotaisAlertas[0].alertas_criticos;
}

async function atualizarKpiCorrelacao() {
  var idDataCenter = sessionStorage.getItem("DataCenter");
  try {
    const crawlerRes = await fetch(`/alertas/attCrawler/${idDataCenter}`);
    console.log("Crawler foi atualizado: ", crawlerRes.ok)
    if (!crawlerRes.ok) throw new Error("Erro ao acionar o crawler.");

    await new Promise((resolve) => setTimeout(resolve, 0));

    const correlacaoRes = await fetch(`/alertas/getCorrelacao/${idDataCenter}`);
    if (!correlacaoRes.ok) throw new Error("Erro ao buscar correlação.");

    const dados = await correlacaoRes.json();

    if (dados && dados.variavel && dados.correlacao !== undefined) {
      document.getElementById(
        "tituloCorrelacao"
      ).innerHTML = `A maior correlação com números de negociações na bolsa de valores foi com os dados capturados de ${dados.variavel} `;
      document.getElementById("kpi_valor_correlacao").innerHTML =
        dados.correlacao;
      const valorCorrelacao = parseFloat(dados.correlacao);
      const spanTipoCorrelacao = document.getElementById("spn_tipoCorrelacao");

      let tipoCorrelacao = "";
      let corBackground = "";
      if (
        (valorCorrelacao > 0 && valorCorrelacao < 0.5) ||
        (valorCorrelacao < 0 && valorCorrelacao > -0.5)
      ) {
        tipoCorrelacao = "Pouca correlação";
        corBackground = "#830000";
      } else if (valorCorrelacao >= 0.5 && valorCorrelacao <= 1) {
        tipoCorrelacao = "Correlação forte";
        corBackground = "green";
      } else if (valorCorrelacao <= -0.5 && valorCorrelacao >= -1) {
        tipoCorrelacao = "Correlação forte negativa";
        corBackground = "green";
      } else if (valorCorrelacao === 0) {
        tipoCorrelacao = "Sem correlação";
        corBackground = "gray";
      }
      spanTipoCorrelacao.innerHTML = tipoCorrelacao;
      spanTipoCorrelacao.style.backgroundColor = corBackground;
    }
  } catch (err) {
    console.error("Erro ao atualizar KPI de correlação:", err.message);
  }
}

function atualizarDashboard() {
  carregarDadosDashboard();
}
