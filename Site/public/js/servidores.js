servidores = []
let servidorSelecionadoParaExcluir = null;


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

            idservidor: item.idservidor,
            totalComponentes: item.totalComponentes,
            status: item.statusServidor,
            alertas: item.alertas_hoje,
            datacenter: item.fk_data_center
          }));


          const bodyTabela = document.getElementById("bodyTabela");
          bodyTabela.innerHTML = "";

          servidores.forEach(servidor => {
            bodyTabela.innerHTML += `
        <tr>
        <td> Servidor ${servidor.idservidor}</td>
        <td>${servidor.totalComponentes}</td>
        <td style="color: ${servidor.status == 'Estável' ? '#479f6b' : '#e74c3c'};">${servidor.status}</td>
        <td style="color: ${servidor.alertas == 0 ? '#479f6b' : '#e74c3c'};">${servidor.alertas}</td>
        <td>${servidor.datacenter}</td>
        <td class='tableIcons'> <i class="fa-solid fa-pencil" onclick="abrirModal('edicao');" ></i></td>
        <td class='tableIcons deletarUser'><i class="fa-solid fa-trash" onclick="setServidorExcluir(${servidor.idservidor})"></i></td>
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


function setServidorExcluir(servidorID) {
  servidorSelecionadoParaExcluir = servidorID
  document.getElementById("servidorE").textContent = `Servidor ${servidorSelecionadoParaExcluir}`;
  abrirModal('exclusao');

}

function excluirServidor() {
  if (servidorSelecionadoParaExcluir) {
    fetch(`/servidores/excluir/${servidorSelecionadoParaExcluir}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert("Servidor excluído com sucesso.");
          exibirServidores();
          fecharModal('exclusao');
        } else {
          alert("Erro ao excluir.");
        }
      });
  }


}


