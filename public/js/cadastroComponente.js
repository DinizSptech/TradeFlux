

var id = [];
var ram = [];
var disco = [];
var cpu = [];

let jaCarregouServidores = false;

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
                  var option = document.createElement("option");
                  option.value = servidor.idServidor;
                  option.text = `Servidor ${servidor.idServidor}`;
                  selectServidor.add(option);
                  id.push(servidor.idServidor);
                  ram.push(servidor.ramTotal);
                  disco.push(servidor.discoTotal);
                  cpu.push(servidor.processadorInfo)
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
    if (jaCarregouComponentes) return; 
    jaCarregouComponentes = true;

  var selectComponente = document.getElementById("select_componente");


  fetch("/componentes/listarComponentes", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  }).then(function (resposta) {
      if (resposta.ok) {
          resposta.json().then((json) => {
              json.forEach((Componente) => {
                  var option = document.createElement("option");
                  option.value = Componente.idComponente;
                  option.text = Componente.nomeComponente;
                  selectComponente.add(option);
          
              });
          });
      } else {
          console.log("NÃO deu certo a resposta");
      }
  })



}


function exibirCaracteristicas() {
    var selectServidor = document.getElementById("select_servidor");
    var servidorSelecionado = selectServidor.value

    for (let i = 0; i < id.length; i++) {
       if(id[i] == servidorSelecionado){
        document.getElementById("ram_total").innerHTML = `RAM total: ${ram[i]}GB  |  `
        document.getElementById("disco_total").innerHTML = `Disco total: ${disco[i]}GB  |  `
        document.getElementById("cpu").innerHTML = `CPU: ${cpu[i]}`
        break;
       }
        
    }
}




let  servidorValidado, componenteValidado, limiarValidado;


console.log(nome)

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


function validarLimiar(limiar){
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
      alert("Cadastro realizado com sucesso!");

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
              console.log("Cadastrado no BD com sucesso.");
              resposta.json().then((json) => {
                  console.log(json);
              });
          } else {
              console.log("Erro ao cadastrar no BD.");
          }
      });
  }
}



function abrirModal(tipo) {
    if (tipo == "cadastro") {
        bg_formulario.style.display = "flex";
    } else {
        bg_formulario_edicao.style.display = "flex";
    }
}
function fecharModal(tipo) {
    if (tipo == "cadastro") {
        bg_formulario.style.display = "none";
    } else {
        bg_formulario_edicao.style.display = "none";
    }
}