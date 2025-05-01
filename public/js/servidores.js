servidores = []
    
function exibirServidores() {
const dataCenter = sessionStorage.DataCenter;

fetch(`/servidores/exibirServidores/${dataCenter}`, {
method: "GET"
})
.then(response => {
if (response.ok) {
  response.json().then(json => {
    console.log(json);

    servidores = json.map(item => ({
      
      idServidor: item.idServidor,
      totalComponentes: item.totalComponentes,
      status: item.statusServidor,
      alertas: item.alertas_hoje      
  }));


    const bodyTabela = document.getElementById("bodyTabela");
    bodyTabela.innerHTML = ""; 
  
    servidores.forEach(servidor => {
      bodyTabela.innerHTML += `
        <tr>
        <td> Servidor ${servidor.idServidor}</td>
        <td>${servidor.totalComponentes}</td>
        <td style="color: ${servidor.status == 'Estável' ? '#2ecc71' : '#e74c3c'};">${servidor.status}</td>
        <td style="color: ${servidor.alertas == 0 ? '#2ecc71' : '#e74c3c'};">${servidor.alertas}</td>
        <td class='tableIcons'> <i class="fa-solid fa-pencil" onclick="abrirModal('edicao');" ></i></td>
        <td class='tableIcons deletarUser'><i class="fa-solid fa-trash"  onclick='abrirModal('edicao');'></i></td>
        </tr>
        
      `;
    });

  });
    } else {
    console.error('Erro ao obter alertas');
    }
})
    .catch(error => {
    console.error("Erro na requisição:", error);
});
}

function editarServidor() {
    let servidor = Number(select_servidor.value);
    let componente = select_componente.value
    let valor = ipt_valorEdicao.value
  
        fetch("/servidores/editarServidor", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                servidorServer: servidor,
                componenteServer: componente,
                valorServer: valor
            }),
        }).then(function (resposta) {
            if (resposta.ok) {     
                console.log("foi");
                alert("Servidor editado com sucesso!");
                resposta.json().then((json) => {
                    console.log(json);
                });
            } else {
                console.log("Erro ao cadastrar no BD.");
                alert("Erro ao editar!");
            }
        });
    }
  


