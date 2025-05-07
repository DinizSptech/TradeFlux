document.getElementById("contatoForm").addEventListener("submit", function (event) {
    event.preventDefault();

  });

function enviarMensagemSuporte() {
    
    var nome = document.getElementById("ipt_nome").value
    var email = document.getElementById("ipt_email").value
    var mensagem = document.getElementById("ipt_mensagem").value

    emailjs.init('iFj8pPu2mOXkR1U7D')

    var templateParametros = {
        from_nome: nome,
        from_email: email,
        mensagem: mensagem
    };

    alert("Mensagem enviada com sucesso, aguarde retorno e um e-mail foi enviado com as informações de sua mensagem")

    var servicoID = 'service_uon868g'
    var templateID = 'template_8nkl193'
    
    emailjs.send(servicoID, templateID, templateParametros)

}

function enviarMensagemCadastro() {
    var nome = document.getElementById("ipt_nome").value
    var email = document.getElementById("ipt_email").value
    var senha = document.getElementById("ipt_senha").value
    var cargo = document.getElementById("slt_cargo").value

    emailjs.init('iFj8pPu2mOXkR1U7D')
    var servicoID = 'service_uon868g'
    var templateID = 'template_8nkl193'

    var templateParametros = {
        from_nome: nome,
        from_email: email,
        from_senha: senha,
        from_cargo: cargo
    };

    emailjs.send(servicoID, templateID, templateParametros)

    alert("Mensagem enviada com sucesso, aguarde retorno")

}