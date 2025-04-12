
function entrar(){ 
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
              nivelConta = json.cargo;
  
              if(nivelConta == "administrador") {
                alert(
                    "Login realizado com sucesso! Redirecionando para a conta administradora..."
                  );
                  window.location.href = "./inicioAdm.html";
              } else if(nivelConta == "analista") {
                  alert(
                    "Login realizado com sucesso! Redirecionando para a conta analista!..."
                  );
                  window.location.href = "./dashboard_analista.html";
              } else if(nivelConta == "cientista"){
                    alert(
                        "Login realizado com sucesso! Redirecionando para a conta Cientista de Dados!..."
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

