function deletar(idUsuario) {
  console.log("ID USUARIO RECEBIDO:", idUsuario);

  fetch(`/usuarios/deletar/${idUsuario}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        console.warn("Erro na resposta");
        return;
      }

      let linha = document.getElementById(`linha-${idUsuario}`);

      if (linha) {
        linha.remove();
      }

      return res.json();
    })
    .then((resjson) => {
      console.log("Usuário excluído com sucesso!");
      exibir();
    })
    .catch((erro) => {
      console.log(erro);
    });
}
