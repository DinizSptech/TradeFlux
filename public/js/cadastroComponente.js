

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
                  option.text = servidor.UUIDServidor;
                  selectServidor.add(option);
                  id.push(servidor.idServidor);
                  ram.push(servidor.ramTotal);
                  disco.push(servidor.discoTotal);
                  cpu.push(servidor.cpuInfo)
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
let nomeValidado, servidorValidado, medidaValidado, limiarValidado;
var nomeAlterado;

console.log(nome)

function validarServidor(servidor) {
  servidorValidado = true;

  if (servidor == "#") {
      erros_cadastro_servidor.innerHTML += `<span style="color:red">Preencha o servidor do componente</span><br>`;
    servidorValidado = false;
  }


  return servidorValidado;
}

function validarNome(nome) {
  erros_cadastro_nome.innerHTML = ``;
  nomeValidado = true;

  if (nome == "") {
      erros_cadastro_nome.innerHTML += `<span style="color:red">Preencha o nome do componente</span><br>`;
    nomeValidado = false;
  }


  return nomeValidado;
}

function validarMedida(medida, nome) {
  erros_cadastro_medida.innerHTML = ``;
  medidaValidado = true;
  nomeAlterado = nome.toLowerCase()


  if (medida == "#") {   
      erros_cadastro_medida.innerHTML += `<span style="color:red">Preencha o campo medida</span><br>`;
    medidaValidado = false;
  } else if((medida == "gb" || medida == "bt") && nomeAlterado.includes("cpu")){
    erros_cadastro_medida.innerHTML += `<span style="color:red">Insira uma medida válida para este componente</span><br>`;
    medidaValidado = false;
  } else if(medida == "gz" && (nomeAlterado.includes("ram") || nomeAlterado.includes("disco"))){
    erros_cadastro_medida.innerHTML += `<span style="color:red">Insira uma medida válida para este componente</span><br>`;
    medidaValidado = false;
  } else if (nomeAlterado.includes("ram") && medida == "gb"){
  nomeAlterado = "RAM_usada"
  } else if (nomeAlterado.includes("ram") && medida == "pt"){
  nomeAlterado = "RAM_percentual"
  } else if (nomeAlterado.includes("disco") && medida == "gb"){
  nomeAlterado = "Disco_usado"
  } else if (nomeAlterado.includes("disco") && medida == "pt"){
  nomeAlterado = "Disco_percentual"
  } else if (nomeAlterado.includes("cpu") && medida == "gz"){
  nomeAlterado = "CPU_Frequencia"
  } else if (nomeAlterado.includes("cpu") && medida == "pt"){
  nomeAlterado = "CPU_percentual"
  }

  return {medidaValidado, nomeAlterado};
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
  let nome = ipt_nomeComponente.value;
  let medida = select_medida.value;
  let limiar = ipt_limiar.value;
  let servidor = Number(select_servidor.value);

  // Validações
  let nomeValidado = validarNome(nome);
  let servidorValidado = validarServidor(servidor);
  let limiarValidado = validarLimiar(limiar);
  let resultadoMedida = validarMedida(medida, nome);
  let medidaValidado = resultadoMedida.medidaValidado;
  let nomeAlterado = resultadoMedida.nomeAlterado;

  if (nomeValidado && servidorValidado && medidaValidado && limiarValidado) {
      alert("Cadastro realizado com sucesso!");
      console.log("Nome: " + nomeAlterado);
      console.log("Medida: " + medida);
      console.log("Limiar: " + limiar);
      console.log("Servidor: " + servidor);

      fetch("/componentes/cadastrar", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              nomeServer: nomeAlterado,
              medidaServer: medida,
              limiarServer: limiar,
              servidorServer: servidor,
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