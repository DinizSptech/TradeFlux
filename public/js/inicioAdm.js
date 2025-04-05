function mostrar() {
    var div = document.getElementById("div_adicionar_servidor");
    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
    
}
function adicionarServidor() {
    var dataCenterEscolhido = document.getElementById("select_escolher_data_center").value;
    fetch("/servidores/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dataCenterServer: dataCenterEscolhido,
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                alert("Servidor adicionado com sucesso!");
                window.location.reload();
            });
        } else {
            console.log("NÃO deu certo a resposta");
        }
    }
    );
}

    function exibirDataCentersNoSelect() {
        var selectDataCenter = document.getElementById("select_escolher_data_center");

        fetch("/servidores/listarDataCenters", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then((json) => {
                    json.forEach((dataCenter) => {
                        var option = document.createElement("option");
                        option.value = dataCenter.idData_Center;
                        option.text = dataCenter.nome;
                        selectDataCenter.add(option);
                    });
                });
            } else {
                console.log("NÃO deu certo a resposta");
            }
        });
    }

