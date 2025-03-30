// function coletarInputs() {
//   var usuario = ipt_usuario.value;
//   var email = ipt_email.value;
//   var senha = ipt_senha.value;
//   var confSenha = ipt_conf_senha.value;

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
  let usuario = document.getElementById("ipt_usuario");
  let email = document.getElementById("ipt_email");
  let cargo = document.getElementById("select_cargo");
  let senha = document.getElementById("ipt_senha");
  let confirmSenha = document.getElementById("ipt_confirmSenha");

  fetch("/usuarios/cadastrar", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuarioServer: usuario,
      emailServer: email,
      cargoServer: cargo,
      senhaServer: senha,
      confirmSenhaServer: confirmSenha,
    }),
  }).then(function (resposta) {
    console.log(resposta);

    if (resposta.ok) {
      console.log("Resposta OK!");

      resposta.json().then((json) => {
        console.log("JSON:", json);
        console.log(JSON.stringify(json));
      });
    } else {
      console.log("NÃO deu certo a resposta");
    }
  });
}

//     function cadastrar() {
//       // Agora vá para o método fetch logo abaixo

//         finalizarAguardar();
//         return false;
//       } else {
//         setInterval(sumirMensagem, 5000);
//       }

//       // Enviando o valor da nova input
//       fetch("/usuarios/cadastrar", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           // crie um atributo que recebe o valor recuperado aqui
//           // Agora vá para o arquivo routes/usuario.js
//           nomeServer: nomeVar,
//           emailServer: emailVar,
//           senhaServer: senhaVar,
//           generoServer: generoVar,
//           idadeServer: idadeVar,
//           alturaServer: alturaVar,
//         }),
//       })
//         .then(function (resposta) {
//           console.log("resposta: ", resposta);

//           if (resposta.ok) {
//             mensagem_realizado.style.display = "block";
//             lista_nome.push(nomeVar);
//             lista_email.push(emailVar);
//             lista_senha.push(senhaVar);
//             lista_genero.push(generoVar);
//             lista_idade.push(idadeVar);
//             lista_altura.push(alturaVar);

//             resposta.json().then((json) => {
//               // armazenar os dados de idade e altura para usar na dashboard
//               console.log(json);
//               console.log(JSON.stringify(json));
//               // sessionStorage.LISTA_IDADE = json.lista_idade;
//               // sessionStorage.LISTA_ALTURA = json.lista_altura;

//               mensagem_realizado.innerHTML = `Cadastro Realizado! Redirecionando para o Login...`;

//               setTimeout(() => {
//                 window.location = "login.html";
//               }, "2000");
//             });

//             limparFormulario();
//             finalizarAguardar();
//           } else {
//             throw "Houve um erro ao tentar realizar o cadastro!";
//           }
//         })
//         .catch(function (resposta) {
//           console.log(`#ERRO: ${resposta}`);
//           finalizarAguardar();
//         });

//       return false;
//     }

//     function sumirMensagem() {
//       cardErro.style.display = "none";
//     }

//       var lista_idades = JSON.parse(sessionStorage.getItem("LISTA_IDADES")) || [];
//       var lista_alturas =
//         JSON.parse(sessionStorage.getItem("LISTA_ALTURAS")) || [];

//       lista_idades.push(Number(idadeVar));
//       lista_alturas.push(Number(alturaVar));

//       sessionStorage.setItem("LISTA_IDADES", JSON.stringify(lista_idades));
//       sessionStorage.setItem("LISTA_ALTURAS", JSON.stringify(lista_alturas));

//   </script> -->
