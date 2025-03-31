// CONFIGURAÇÃO BACKEND:

function cadastrar() {
  let nome = ipt_nome.value;
  let email = ipt_email.value;
  let cargo = select_cargo.value;
  let senha = ipt_senha.value;
  let confirmSenha = ipt_confirmSenha.value;

  function validarNome(nome) {
    erros_cadastro_usuario.innerHTML = ``;
    nomeValidado = true;

    if (nome == "") {
        erros_cadastro_usuario.innerHTML += `<span style="color:red">Preencha o campo Usuario</span><br>`;
      nomeValidado = false;
    }

    if (nome.length < 3) {
        erros_cadastro_usuario.innerHTML += `<span style="color:red">O Usuario deve ter pelo menos 3 caracteres</span><br>`;
      nomeValidado = false;
    }

    return nomeValidado;
  }

  function validarEmail(email) {
    erros_cadastro_email.innerHTML = ``;
    emailValidado = true;
    if (email == "") {
        erros_cadastro_email.innerHTML += `<span style="color:red">Preencha o campo Email</span><br>`;
      emailValidado = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        erros_cadastro_email.innerHTML += `<span style="color:red">Email inválido</span><br>`;
      emailValidado = false;
    }

    return emailValidado;
  }

  function validarCargo(cargo){
    erros_cadastro_cargo.innerHTML = ``;  
    cargoValidado = true;
    if (cargo == "#") {
        erros_cadastro_cargo.innerHTML += `<span style="color:red">Selecione um cargo</span<br>`;
      cargoValidado = false;
    }
    return cargoValidado;
  }

    function validarSenha(senha) {
        erros_cadastro_senha.innerHTML = ``;
    senhaValidada = true;
    if (senha == "") {
        erros_cadastro_senha.innerHTML += `<span style="color:red">Preencha o campo Senha</span><br>`;
      senhaValidada = false;
    }
    if (senha.length < 8) {
        erros_cadastro_senha.innerHTML += `<span style="color:red">A senha deve ter pelo menos 8 caracteres</span><br>`;
      senhaValidada = false;
    }
    if (!/\d/.test(senha)) {
        erros_cadastro_senha.innerHTML += `<span style="color:red">A senha deve conter pelo menos um número</span><br>`;
      senhaValidada = false;
    }
    if (!/[!@#$%^&*]/.test(senha)) {
        erros_cadastro_senha.innerHTML += `<span style="color:red">A senha deve conter pelo menos um caractere especial</span><br>`;
      senhaValidada = false;
    }
    if (!/[A-Z]/.test(senha)) {
        erros_cadastro_senha.innerHTML += `<span style="color:red">A senha deve conter pelo menos uma letra maiúscula</span><br>`;
      senhaValidada = false;
    }
    if (!/[a-z]/.test(senha)) {
        erros_cadastro_senha.innerHTML += `<span style="color:red">A senha deve conter pelo menos uma letra minúscula</span><br>`;
      senhaValidada = false;
    }
    return senhaValidada;
}
    function validarConfirmSenha(confirmSenha, senha) {
        erros_cadastro_confirmsenha.innerHTML = ``;
        confirmSenhaValidada = true;

        if (confirmSenha == "") {
            erros_cadastro_confirmsenha.innerHTML += `<span style="color:red">Preencha o campo Confirmar Senha</span><br>`;
            confirmSenhaValidada = false;
        }
        if (confirmSenha != senha) {
            erros_cadastro_confirmsenha.innerHTML += `<span style="color:red">As senhas não coincidem</span><br>`;
            confirmSenhaValidada = false;
        }
        return confirmSenhaValidada;
    }

    if (validarNome(nome) && validarEmail(email) && validarCargo(cargo) && validarSenha(senha) && validarConfirmSenha(confirmSenha, senha)) {
        alert("Cadastro realizado com sucesso! Redirecionando para a página de login...");
        console.log("Cadastro realizado com sucesso!");
        console.log("Nome: " + nome);
        console.log("Email: " + email);
        console.log("Cargo: " + cargo);
        console.log("Senha: " + senha);
    
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nomeServer: nome,
              emailServer: email,
              cargoServer: cargo,
              senhaServer: senha,
            }),
          }).then(function (resposta) {
            if (resposta.ok) {
              console.log(resposta);
              console.log("Resposta OK!");
              console.log("Cadastrado no BD");
        
              resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));
              });
            } else {
              console.log("NÃO deu certo a resposta");
            }
          });
            window.location.href = "/pages/login.html";
        }


    }


