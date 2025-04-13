

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

;


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