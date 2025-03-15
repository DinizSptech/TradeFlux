function coletarInputs(){
    var cnpk = ipt_usuario.value;
    var razaosocial = ipt_email.value;
    var telefone = ipt_senha.value;
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

function validarTelefone(){
    
}
