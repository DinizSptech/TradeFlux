function deletar(idDataCenter) {
  console.log("ID DATA CENTER RECEBIDO:", idDataCenter);

  fetch(`/dataCenter/deletar/${idDataCenter}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        console.warn("Erro na resposta");
        return;
      }

      let linha = document.getElementById(`linha-${idDataCenter}`);

      if (linha) {
        linha.remove();
      }

      return res.json();
    })
    .then((resjson) => {
      console.log("Data Center excluído com sucesso!");
      exibirDataCenters();
    })
    .catch((erro) => {
      console.log(erro);
    });
}
