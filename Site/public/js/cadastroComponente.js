

var id = [];
var ram = [];
var disco = [];
var cpu = [];
var so = [];
let componentes = []

let jaCarregouServidores = false;
let componenteSelecionadoParaExcluir = null;
let componenteSelecionadoParaEditar = null;

function exibirServidorNoSelect() {
  if (jaCarregouServidores) return; // Se já carregou, sai fora
  jaCarregouServidores = true;

  var selectServidor = document.getElementById("select_servidor");


  fetch("/componentes/listarServidores", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json.forEach((servidor) => {
          id.push(servidor.idservidor);
          ram.push(servidor.ramtotal);
          disco.push(servidor.discototal);
          cpu.push(servidor.processadorinfo)
          so.push(servidor.sistemaoperacional)
        });
         json.forEach((servidor) => {
          var option = document.createElement("option");
          option.value = servidor.idservidor;
          option.text = `Servidor ${servidor.idservidor}`;
          selectServidor.add(option);
          console.log(ram)
          console.log(disco)
          console.log(id)
          console.log(json)
        });
      });
    } else {
      console.log("NÃO deu certo a resposta");
    }
  })



}


let jaCarregouComponentes = false;

function exibirComponentesNoSelect() {


  var servidor = document.getElementById("select_servidor").value
  var selectComponente = document.getElementById("select_componente");
  var componentesNomes = ['CPU Percentual (%)', 'CPU Frequência (GHz)', 'RAM Percentual (%)', 'RAM Usada (GB)', 'Disco Percentual (%)', 'Disco Usado (GB)']

  fetch(`/componentes/listarComponentes/${servidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        const [componentes, parametros] = json;

        selectComponente.innerHTML = "";

        const optionPadrao = document.createElement("option");
        optionPadrao.disabled = true;
        optionPadrao.selected = true;
        optionPadrao.text = "Selecione um componente";
        optionPadrao.value = "#";

        selectComponente.add(optionPadrao);


        componentes.forEach((componente, index) => {
          const option = document.createElement("option");
          option.value = componente.idComponente;
          option.text = componentesNomes[index];

          const jaExiste = parametros.some(
            (param) => param.fkComponente === componente.idComponente
          );

          if (jaExiste) {
            option.disabled = true;
            option.text += " (cadastrado)";
          }

          selectComponente.add(option);
        });
      });
    } else {
      console.log("NÃO deu certo a resposta");
    }
  });
}


function exibirCaracteristicas() {
  var selectServidor = document.getElementById("select_servidor");
  var servidorSelecionado = selectServidor.value

  for (let i = 0; i < id.length; i++) {
    if (id[i] == servidorSelecionado) {
      document.getElementById("ram_total").innerHTML = `RAM Total: ${ram[i]}GB <br>`
      document.getElementById("disco_total").innerHTML = `Disco Total: ${disco[i]}GB <br>`
      document.getElementById("cpu").innerHTML = `CPU: ${cpu[i]} <br>`
      document.getElementById("so").innerHTML = `Sistema Operacional: ${so[i]}`
      break;
    }

  }
}




let servidorValidado, componenteValidado, limiarValidado;


function validarServidor(servidor) {
  servidorValidado = true;

  if (servidor == "#") {
    erros_cadastro_servidor.innerHTML += `<span style="color:red">Selecione um servidor</span><br>`;
    servidorValidado = false;
  }

  return servidorValidado;
}

function validarComponente(componente) {
  componenteValidado = true;

  if (componente == "#") {
    erros_cadastro_componente.innerHTML += `<span style="color:red">Selecione um componente</span><br>`;
    componenteValidado = false;
  }


  return componenteValidado;
}


function validarLimiar(limiar) {
  erros_cadastro_limiar.innerHTML = ``;
  limiarValidado = true;
  if (limiar == "") {
    erros_cadastro_limiar.innerHTML += `<span style="color:red">Defina um limiar de alerta para o componente</span><br>`;
    limiarValidado = false;
  }

  return limiarValidado;
}

function cadastrar() {
  let limiar = ipt_limiar.value;
  let servidor = Number(select_servidor.value);
  let componente = Number(select_componente.value)

  // Validações
  let servidorValidado = validarServidor(servidor);
  let limiarValidado = validarLimiar(limiar);
  let componenteValidado = validarComponente(componente)


  if (servidorValidado && limiarValidado && componenteValidado) {

    fetch("/componentes/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limiarServer: limiar,
        servidorServer: servidor,
        componenteServer: componente
      }),
    }).then(function (resposta) {
      if (resposta.ok) {
        fecharModal('cadastro')
        exibirComponentesNoSelect()
        exibirComponentes()
        alert("Cadastro realizado com sucesso!");
        console.log("Cadastrado no BD com sucesso.");
        resposta.json().then((json) => {
          console.log(json);
        });
      } else {
        console.log("Erro ao cadastrar no BD.");
        alert("Erro ao cadastrar!");
      }
    });
  }



}

limiarCritico = []
limiarAtencao = []
nomeComponenteModal = []
servidorModal = []

function servidorModalEficiencia(servidor){
  console.log(limiarAtencao)
  console.log(disco)
    for (let i = 0; i < id.length; i++) {
    if (id[i - 1] == servidor) {
      document.getElementById("ram_totalModal").innerHTML = `RAM total: ${ram[i - 1]}GB <br>`
      document.getElementById("disco_totalModal").innerHTML = `Disco total: ${disco[i - 1]}GB <br>`
      document.getElementById("cpuModal").innerHTML = `CPU: ${cpu[i - 1]} <br>`
      document.getElementById("soModal").innerHTML = `Sistema Operacional: ${so[i - 1]}`
      break;
      
    }
  }
    for (let i = 0; i < servidorModal.length; i++) {
      if (servidor == servidorModal[i - 1 ]){
        if(nomeComponenteModal[i - 1] == "cpu_percentual"){
      document.getElementById("limiarAtencaoCPUModal").innerHTML = `🟡 Limiar Alerta Atenção: ${limiarAtencao[i - 1]}%`
      document.getElementById("limiarCriticoCPUModal").innerHTML = `🔴 Limiar Alerta Crítico: ${limiarCritico[i - 1]}%`
      } if(nomeComponenteModal[i - 1] == "ram_percentual"){
      document.getElementById("limiarAtencaoRAMModal").innerHTML = `🟡 Limiar Alerta Atenção: ${limiarAtencao[i - 1]}%`
      document.getElementById("limiarCriticoRAMModal").innerHTML = `🔴 Limiar Alerta Crítico: ${limiarCritico[i - 1]}%`
      } if(nomeComponenteModal[i - 1] == "disco_percentual"){
      document.getElementById("limiarAtencaoDiscoModal").innerHTML = `🟡 Limiar Alerta Atenção: ${limiarAtencao[i - 1]}%`
      document.getElementById("limiarCriticoDiscoModal").innerHTML = `🔴 Limiar Alerta Crítico: ${limiarCritico[i - 1]}%`
      } 
     
     }
    }
    }

  

// função de exibir os componentes na tabela
function exibirComponentes() {
  const dataCenter = sessionStorage.DataCenter;

  fetch(`/componentes/exibirComponentes/${dataCenter}`, {
    method: "GET"
  })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);

          componentes = json.map(item => {
            servidorModal.push(item.fk_servidor)
            nomeComponenteModal.push(item.nomecomponente)
            limiarAtencao.push(item.limiar_alerta_atencao)
            limiarCritico.push(item.limiar_alerta_critico)
            let nomeFormatado = item.nomecomponente;

            if (nomeFormatado === "ram_usada" || nomeFormatado === "ram_percentual") {
              nomeFormatado = "RAM";
            } else if (nomeFormatado === "disco_usado" || nomeFormatado === "disco_percentual") {
              nomeFormatado = "Disco";
            } else if (nomeFormatado === "cpu_percentual" || nomeFormatado === "cpu_frequencia") {
              nomeFormatado = "CPU";
            } else if (nomeFormatado === "velocidade download") {
              nomeFormatado = "Download"
            } else {
              nomeFormatado = "Upload"
            }

            return {
              nome: nomeFormatado,
              medida: item.medida,
              limiar: item.limiar_alerta_critico,
              status: item.statusComponente,
              servidor: item.fk_servidor,
              parametroID: item.idparametros_servidor
            };
          });


          const bodyTabela = document.getElementById("bodyTabela");
          bodyTabela.innerHTML = "";

          componentes.forEach(componente => {
            bodyTabela.innerHTML += `
        <tr>
        <td> ${componente.nome}</td>
        <td>${componente.medida}</td>
        <td>${componente.limiar}</td>
        <td style="color: ${componente.status == 'Estável' ? '#2ecc71' : '#e74c3c'};">${componente.status}</td>
        <td>${componente.servidor}</td>
        <td class='tableIcons'> <i class="fa-solid fa-pencil" onclick="pegarParametrosEdicao(${componente.servidor}, '${componente.nome}', ${componente.parametroID}, '${componente.medida}');" ></i></td>
        <td class='tableIcons deletarUser'><i class="fa-solid fa-trash" onclick="pegarParametros(${componente.servidor}, '${componente.nome}', ${componente.parametroID}, '${componente.medida}')"></i></td>
        </tr>    
      `;
          });

        });
      } else {
        console.error('Erro ao obter servidores');
      }
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
    });
}



function pegarParametros(servidor, nome, parametroID, medida) {
  document.getElementById("componenteE").textContent = `${nome} ${medida} - Servidor ${servidor}`
  componenteSelecionadoParaExcluir = parametroID
  abrirModal('exclusao')
}

function excluirComponente() {
  if (componenteSelecionadoParaExcluir) {
    fetch(`/componentes/excluir/${componenteSelecionadoParaExcluir}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert("Componente excluído com sucesso.");
          exibirComponentes();
          fecharModal('exclusao');
        } else {
          alert("Erro ao excluir.");
        }
      });
  }


}


function pegarParametrosEdicao(servidor, nome, parametroID, medida) {
  document.getElementById("componenteEdicao").textContent = `Componente: ${nome} ${medida} - Servidor ${servidor}`
  componenteSelecionadoParaEditar = parametroID
  abrirModal('edicao')
}

function editarComponente() {
  let parametroComponente = componenteSelecionadoParaEditar
  let valor = ipt_limiarEdicao.value

  fetch("/componentes/editarComponente", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parametroComponenteServer: parametroComponente,
      valorServer: valor
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log("foi");
      fecharModal('edicao')
      exibirComponentes()
      alert("Componente editado com sucesso!");
      resposta.json().then((json) => {
        console.log(json);
      });
    } else {
      console.log("Erro ao editar no BD.");
      alert("Erro ao editar!");
    }
  });
}
