function entrar() {
  var emailVar = IPTemail.value;
  var senhaVar = IPTsenha.value;

  if (!emailVar || !senhaVar) {
    divERROR.innerHTML = "Preencha todos os campos!";
    divERROR.style.display = "block";
    return false;
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) => {
          nivelConta = json.cargo;
          console.log("Estarei enviando valores para sessionStorage")
          sessionStorage.setItem("EMAIL_USUARIO", json.email);
          sessionStorage.setItem("NOME_USUARIO", json.nome);
          sessionStorage.setItem("Cargo", json.cargo);
          sessionStorage.setItem("ID_USUARIO", json.idusuario);
          sessionStorage.setItem("DataCenter", json.fk_data_center);
          if (nivelConta == "administrador") {
            alert(
              `Olá ${json.nome}, login realizado com sucesso! Redirecionando para a conta administradora...`
            );
            window.location.href = "./dash_adm_alertas.html";
          } else if (nivelConta == "analista") {
            alert(
              `Olá ${json.nome}, login realizado com sucesso! Redirecionando para a conta analista!...`
            );
            window.location.href = "./dash_analista_monitoramento.html";
          } else if (nivelConta == "cientista") {
            alert(
              `Olá ${json.nome}, login realizado com sucesso! Redirecionando para a conta Cientista de Dados!...`
            );
            window.location.href = "./dash_cientista_alertas.html";
          }
        });
      } else {
        resposta.text().then((texto) => {
          console.log(texto);

          divERROR.innerHTML = "Usuário e/ou senha inválidos!";
          divERROR.style.display = "block";
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

function atualizarAcesso() {
  fetch("/usuarios/atualizarAcesso/:idUsuario", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.warn("Problema na resposta");
        return;
      }
      return res.json();
    })
    .then((resjson) => {
      console.log("Deu bom");
    })
    .catch((erro) => {
      console.warn(erro);
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
}

// function entrarSemBD() {
//   var emailVar = IPTemail.value;
//   var senhaVar = IPTsenha.value;
//   var cargo = "";

//   if (!emailVar || !senhaVar) {
//     divERROR.innerHTML = "Preencha todos os campos!";
//     divERROR.style.display = "block";
//     return false;
//   } else if (
//     emailVar == "julia.analista@b3.com.br" &&
//     senhaVar == "Senha@123"
//   ) {
//     cargo = "analista";
//     sessionStorage.setItem("Cargo", cargo);
//     window.location.href = "./dashboard_analista.html";
//   } else if (
//     emailVar == "rogerio.cientista@b3.com.br" &&
//     senhaVar == "Senha@123"
//   ) {
//     cargo = "cientista";
//     sessionStorage.setItem("Cargo", cargo);
//     window.location.href = "./dashboard_Cientista.html";
//   } else if (
//     emailVar == "jennifer.admin@b3.com.br" &&
//     senhaVar == "Senha@123"
//   ) {
//     cargo = "administrador";
//     sessionStorage.setItem("Cargo", cargo);
//     window.location.href = "./dash_gerente_servidores.html";
//   }

//   console.log("FORM LOGIN: ", emailVar);
//   console.log("FORM SENHA: ", senhaVar);
// }
