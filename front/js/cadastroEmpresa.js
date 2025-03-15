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
