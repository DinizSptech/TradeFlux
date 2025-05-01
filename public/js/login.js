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
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;
          sessionStorage.Cargo = json.cargo;
          sessionStorage.DataCenter = json.data_center;
          nivelConta = json.cargo;

          if (nivelConta == "administrador") {
            alert(
              `Olá ${json.nome}, login realizado com sucesso! Redirecionando para a conta administradora...`
            );
            window.location.href = "./alertas.html";
          } else if (nivelConta == "analista") {
            alert(
              `Olá ${json.nome}, login realizado com sucesso! Redirecionando para a conta analista!...`
            );
            window.location.href = "./dashboard_analista.html";
          } else if (nivelConta == "cientista") {
            alert(
              `Olá ${json.nome}, login realizado com sucesso! Redirecionando para a conta Cientista de Dados!...`
            );
            window.location.href = "./dashboard_Cientista.html";
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

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}

function entrarSemBD() {
  var emailVar = IPTemail.value;
  var senhaVar = IPTsenha.value;
  var cargo = "";

  if (!emailVar || !senhaVar) {
    divERROR.innerHTML = "Preencha todos os campos!";
    divERROR.style.display = "block";
    return false;
  } else if (
    emailVar == "julia.analista@b3.com.br" &&
    senhaVar == "Senha@123"
  ) {
    cargo = "analista";
    sessionStorage.setItem("Cargo", cargo);
    window.location.href = "./dashboard_analista.html";
  } else if (
    emailVar == "rogerio.cientista@b3.com.br" &&
    senhaVar == "Senha@123"
  ) {
    cargo = "cientista";
    sessionStorage.setItem("Cargo", cargo);
    window.location.href = "./dashboard_Cientista.html";
  } else if (
    emailVar == "jennifer.admin@b3.com.br" &&
    senhaVar == "Senha@123"
  ) {
    cargo = "administrador";
    sessionStorage.setItem("Cargo", cargo);
    window.location.href = "./dash_gerente_servidores.html";
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
