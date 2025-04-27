function cadastrar() {
  const nomeElement = document.getElementById('ipt_nome');
  const emailElement = document.getElementById('ipt_email');
  const cargoElement = document.getElementById('select_cargo');
  const senhaElement = document.getElementById('ipt_senha');
  const confirmSenhaElement = document.getElementById('ipt_confirmSenha');
  
  const erros_cadastro_usuario = document.getElementById('erros_cadastro_usuario');
  const erros_cadastro_email = document.getElementById('erros_cadastro_email');
  const erros_cadastro_cargo = document.getElementById('erros_cadastro_cargo');
  const erros_cadastro_senha = document.getElementById('erros_cadastro_senha');
  const erros_cadastro_confirmSenha = document.getElementById('erros_cadastro_confirmSenha');

  const elementos = {
    nomeElement,
    emailElement,
    cargoElement,
    senhaElement,
    confirmSenhaElement,
    erros_cadastro_usuario,
    erros_cadastro_email,
    erros_cadastro_cargo,
    erros_cadastro_senha,
    erros_cadastro_confirmsenha
  };
  
  console.log("Elementos encontrados:", elementos);
  
  // Lista os elementos que não foram encontrados
  const elementosFaltantes = Object.entries(elementos)
    .filter(([_, valor]) => valor === null)
    .map(([nome]) => nome);
  
  if (elementosFaltantes.length > 0) {
    console.error("Elementos não encontrados:", elementosFaltantes);
    alert("Erro ao carregar o formulário. Elementos faltantes: " + elementosFaltantes.join(", "));
    return;
  }
  
  if (!nomeElement || !emailElement || !cargoElement || !senhaElement || !confirmSenhaElement) {
    console.error("Um ou mais campos do formulário não foram encontrados!");
    alert("Erro ao carregar o formulário. Por favor, atualize a página.");
    return;
  }
  
  if (!erros_cadastro_usuario) erros_cadastro_usuario = { innerHTML: "" };
  if (!erros_cadastro_email) erros_cadastro_email = { innerHTML: "" };
  if (!erros_cadastro_cargo) erros_cadastro_cargo = { innerHTML: "" };
  if (!erros_cadastro_senha) erros_cadastro_senha = { innerHTML: "" };
  if (!erros_cadastro_confirmsenha) erros_cadastro_confirmsenha = { innerHTML: "" };
  
  let nome = nomeElement.value;
  let email = emailElement.value;
  let cargo = cargoElement.value;
  let senha = senhaElement.value;
  let confirmSenha = confirmSenhaElement.value;
  let data_center = 1;
  let ativo = 1;

  function validarNome(nome) {
    erros_cadastro_usuario.innerHTML = ``;
    let nomeValidado = true;

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
    erros_cadastro_senha.style.display = 'flex';
    let emailValidado = true;
    
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
    let cargoValidado = true;
    
    if (cargo == "#") {
      erros_cadastro_cargo.innerHTML += `<span style="color:red">Selecione um cargo</span><br>`;
      cargoValidado = false;
    }
    return cargoValidado;
  }

  function validarSenha(senha) {
    erros_cadastro_senha.innerHTML = ``;
    erros_cadastro_senha.style.display = 'flex';
    let senhaValidada = true;
    
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
    let confirmSenhaValidada = true;

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
    console.log("DataCenter: " + data_center);

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
        dataCenterServer: data_center,
        ativoServer: ativo,
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

function editarUsuario(idUsuario, nome, email, senha, cargo, status){
}