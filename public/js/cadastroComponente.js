

var id = [];
var ram = [];
var disco = [];
var cpu = [];

function exibirServidorNoSelect() {
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
function cadastrar() {
    var nome = ipt_nomeComponente.value;
    var medida = select_medida.value;
    var limiar = ipt_limiar.value;
    var servidor = select_servidor.value
    var componente = 1;

    console.log(nome)
  
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
      if (medida == "") {   
          erros_cadastro_medida.innerHTML += `<span style="color:red">Preencha o campo medida</span><br>`;
        medidaValidado = false;
      } else if((medida == "gb" || medida == "bt") && nome.toLowerCase().includes("cpu")){
        erros_cadastro_medida.innerHTML += `<span style="color:red">Insira uma medida válida para este componente</span><br>`;
        medidaValidado = false;
      } else if(medida == "gz" && (nome.toLowerCase().includes("ram") || nome.toLowerCase().includes("disco"))){
        erros_cadastro_medida.innerHTML += `<span style="color:red">Insira uma medida válida para este componente</span><br>`;
        medidaValidado = false;
      }

      return medidaValidado;
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
  
    
      if (validarNome(nome) && validarMedida(medida, nome) && validarLimiar(limiar)) {
          alert("Cadastro realizado com sucesso!");
          console.log("Cadastro realizado com sucesso!");
          console.log("Nome: " + nome);
          console.log("Medida: " + medida);
          console.log("Limiar: " + limiar);
          console.log("Servidor: " + servidor);
          console.log("Componente: " + componente);
      
          fetch("/componentes/cadastrar", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nomeServer: nome,
                medidaServer: medida,
                limiarServer: limiar,
                servidorServer: servidor,
                componenteServer: componente
              }),
            }).then(function (resposta) {
              if (resposta.ok) {
                console.log(resposta);
                console.log("Resposta OK!");
                console.log("Cadastrado no BD");
          
                resposta.json().then((json) => {
                  console.log(json);
                  console.log(JSON.stringify(json));
                });
              } else {
                console.log("NÃO deu certo a resposta");
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