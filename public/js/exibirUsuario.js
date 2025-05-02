// let usuarios = [
//   {
//     idUsuario: 1,
//     nome: "Jennifer Silva",
//     email: "jennifer.silva@b3.com.br",
//     senha: "Jennifer123@",
//     cargo: "Administradora",
//     status: "Ativo",
//     ultimoAcesso: "27/04/2025 10:20:05",
//   },

//   {
//     idUsuario: 2,
//     nome: "Julia Lima",
//     email: "julia.lima@b3.com.br",
//     senha: "Rogerio123@",
//     cargo: "Analista de Segurança",
//     status: "Ativo",
//     ultimoAcesso: "27/04/2025 10:24:11",
//   },

//   {
//     idUsuario: 3,
//     nome: "Rogério Ramos",
//     email: "rogerio.ramos@b3.com.br",
//     senha: "Rogerio123@",
//     cargo: "Cientista de Dados",
//     status: "Ativo",
//     ultimoAcesso: "27/04/2025 10:29:55",
//   },
// ];

function exibir() {
  fetch("/usuarios/exibir").then((resposta) => {
    resposta.json().then((respostajson) => {
      console.log(respostajson);

      for (let i = 0; i < respostajson.length; i++) {
        const nome_atual = respostajson[i].nome;
        const email_atual = respostajson[i].email;
        const cargo_atual = respostajson[i].cargo;
        const ativo_atual = respostajson[i].ativo;

        console.log(`
            NOME ATUAL: ${nome_atual}
            EMAIL ATUAL: ${email_atual}
            CARGO ATUAL: ${cargo_atual}
            ATIVO ATUAL: ${ativo_atual}`);

        // Exibir no painel:

        bodyTabela.innerHTML += `
                    <tr>
                    <td>${nome_atual}</td>
                    <td>${email_atual}</td>
                    <td>${cargo_atual}</td>
                    <td style="color: ${
                      ativo_atual == "Ativo" ? "#2ecc71" : "#e74c3c"
                    };">${ativo_atual}</td>
                    <td>${usuarios[i].ultimoAcesso}</td>
                    <td class='tableIcons'> <i class="fa-solid fa-pencil" onclick="abrirModal('edicao'); editarUsuario()" ></i></td>
                    <td class='tableIcons deletarUser'><i class="fa-solid fa-trash" onclick="abrirModal('exclusao'); deletarUsuario(${
                      usuarios.idUsuario
                    })"></i></td>
                    </tr>
                    `;
      }
    });
  });
}

exibir();
