function cadastrar() {
  let usuario = ipt_usuario.value;
  let email = ipt_email.value;
  let senha = ipt_senha.value;
  let confirmSenha = ipt_confirmSenha.value;

  if (usuario == "" || email == "" || senha == "" || confirmSenha == "") {
    div_erro.innerHTML = `Preencha todos os campos.`;
  }
}
