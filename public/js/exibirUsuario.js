function exibir() {
  fetch("/usuarios/exibir").then((resposta) => {
    resposta.json().then((respostajson) => {
      for (let i = 0; i < respostajson.length; i++) {
        const nome_atual = respostajson[i].nome;
        const email_atual = respostajson[i].email;
        const cargo_atual = respostajson[i].cargo;
        const ativo_atual = respostajson[i].ativo;

        bodyTabela.innerHTML += `
                    <tr>
                    <td>${nome_atual}</td>
                    <td>${email_atual}</td>
                    <td>${cargo_atual}</td>
                    <td>${ativo_atual}</td>
                    </tr>`;
      }
    });
  });
}
