function exibir() {
  fetch("/usuarios/exibir").then((resposta) => {
    resposta.json().then((respostajson) => {
      console.log(respostajson);

      bodyTabela.innerHTML = "";

      for (let i = 0; i < respostajson.length; i++) {
        const id_atual = respostajson[i].idUsuario;
        const nome_atual = respostajson[i].nome;
        const email_atual = respostajson[i].email;
        const cargo_atual = respostajson[i].cargo;
        const ativo_atual = respostajson[i].ativo;
        const acesso_atual = respostajson[i].acesso;

        bodyTabela.innerHTML += `
                    <tr id="linha-${id_atual}">
                    <td>${nome_atual}</td>
                    <td>${email_atual}</td>
                    <td>${cargo_atual}</td>
                    <td>${ativo_atual == 1 ? "Ativo" : "Inativo"}</td>
                    <td>${acesso_atual}</td>
                    <td class='tableIcons'> <i class="fa-solid fa-pencil" onclick="abrirModal('edicao'); editarUsuario()" ></i></td>
                    <td class='tableIcons deletarUser'><i class="fa-solid fa-trash" 
                    onclick="deletar(${id_atual})"></i>
                      </td>
                    </tr>`;
      }
    });
  });
}
