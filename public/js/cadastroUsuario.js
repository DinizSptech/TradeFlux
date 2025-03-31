// function coletarInputs() {
//   var usuario = ipt_usuario.value;
//   var email = ipt_email.value;
//   var senha = ipt_senha.value;
//   var confSenha = ipt_conf_senha.value;

// const { json } = require("express");

//   if (!senhaPadraoMicrosoft(senha)) {
//     div_erro_senha.innerHTML = `<span style="color:red">A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (como !, @, #, etc.)</span>`;
//   } else {
//     div_erro_senha.innerHTML = ``;
//   }

//   verificarSenhasIguais(senha, confSenha);
//   emailValido(email);
//   usuarioValido(usuario);

//   if (
//     senhaPadraoMicrosoft(senha) &&
//     senhaPadraoMicrosoft(confSenha) &&
//     verificarSenhasIguais(senha, confSenha) &&
//     emailValido(email) &&
//     usuarioValido(usuario)
//   ) {
//   }
// }

// function usuarioValido(usuario) {
//   if (usuario.length >= 5) {
//     div_erro_usuario.innerHTML = ``;
//     return true;
//   } else {
//     div_erro_usuario.innerHTML = `<span style="color:red">O usuario deve possuir pelo menos 5 caracteres</span>`;
//   }
// }

// function emailValido(email) {
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   if (!emailRegex.test(email)) {
//     div_erro_email.innerHTML = `<span style="color:red">Email inválido</span>`;
//     return false;
//   } else {
//     div_erro_email.innerHTML = ``;
//     return true;
//   }
// }

// function verificarSenhasIguais(senha, confirmSenha) {
//   if (senha != confirmSenha) {
//     div_senha_n_coincide.innerHTML = `
//       <span style="color:red">As senhas não coincidem</span>
//       `;
//   } else {
//     div_senha_n_coincide.innerHTML = ``;
//   }
// }

// function senhaPadraoMicrosoft(senha) {
//   const minLength = 8;
//   const maxLength = 256;
//   const hasUpperCase = /[A-Z]/.test(senha);
//   const hasLowerCase = /[a-z]/.test(senha);
//   const hasNumber = /[0-9]/.test(senha);
//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
//   if (
//     senha.length >= minLength &&
//     senha.length <= maxLength &&
//     hasUpperCase &&
//     hasLowerCase &&
//     hasNumber &&
//     hasSpecialChar
//   ) {
//     return true;
//   }
// }

// CONFIGURAÇÃO BACKEND:

function cadastrar() {
  let nome = ipt_nome.value;
  let email = ipt_email.value;
  let cargo = select_cargo.value;
  let senha = ipt_senha.value;
  let confirmSenha = ipt_confirmSenha.value;

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
}
