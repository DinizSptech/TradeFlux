function coletarInputs(){
    var razaoSocial = ipt_rzsocial.value;
    var cnpj = ipt_cnpj.value;
    var telefone = ipt_numero.value;
    var cep = ipt_cep.value;
    var erro = false;
    if (!validarRazaoSocial(razaoSocial)) {
        div_erro_rzsocial.innerText = "Razão Social inválida.";
        erro = true;
    } else {
        div_erro_rzsocial.innerText = "";
    }
    if (!validarCnpj(cnpj)) {
        div_erro_cnpj.innerText = "CNPJ inválido. Formato esperado: 00.000.000/0000-00";
        erro = true;
    } else {
        div_erro_cnpj.innerText = "";
    }
    if (!validarTelefone(telefone)) {
        div_erro_num.innerText = "Número de telefone inválido. Formato esperado: (XX) XXXXX-XXXX";
        erro = true;
    } else {
        div_erro_num.innerText = "";
    }
    if (!validarCep(cep)) {
        alert("CEP inválido. Formato esperado: 00000-000");
        erro = true;
    }
    if (validarCep && validarCnpj && validarRazaoSocial && validarTelefone) {
        alert("Cadatro realizado com sucesso!")
    }
}

function validarTelefone(telefone) {
    var regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regexTelefone.test(telefone);
}

function validarCep(cep) {
    var regexCep = /^\d{5}-\d{3}$/;
    return regexCep.test(cep);
}

function validarRazaoSocial(razaoSocial) {
    var regexRazaoSocial = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,&()-]+$/;
    return regexRazaoSocial.test(razaoSocial);
}

function validarCnpj(cnpj) {
    var regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regexCnpj.test(cnpj);
}
