function coletarInputs(){
    var usuario = ipt_usuario.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var confSenha = ipt_conf_senha.value;

    senhaPadraoMicrosoft(senha)
    senhaPadraoMicrosoft(confSenha)
    verificarSenhasIguais(senha,confSenha)
    emailValido(email)
    usuarioValido(usuario)

    if(senhaPadraoMicrosoft(senha) &&
        senhaPadraoMicrosoft(confSenha) &&
        verificarSenhasIguais(senha,confSenha) &&
        emailValido(email) &&
        usuarioValido(usuario)){
            
        }
}


function usuarioValido(usuario){
    if(usuario.length >= 5){
        div_erro_usuario.innerHTML=``
        return true;
    } else{
        div_erro_usuario.innerHTML = `<span style="color:red">O usuario deve possuir pelo menos 5 caracteres</span>`;
    }
}
function emailValido(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        div_erro_email.innerHTML = `<span style="color:red">Email inválido</span>`;
        return false
    } else {
        div_erro_email.innerHTML = ``;
        return true
    }
}

function verificarSenhasIguais(senha,confirmSenha){
    if (senha != confirmSenha) {
        div_senha_n_coincide.innerHTML = `
      <span style="color:red">As senhas não coincidem</span>
      `
    } else {
        div_senha_n_coincide.innerHTML = ``
    }
}

function senhaPadraoMicrosoft(senha) {
    const minLength = 8;
    const maxLength = 256;
    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumber = /[0-9]/.test(senha);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    if (senha.length >= minLength &&
        senha.length <= maxLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar) {
        
    }
    return ;
}

