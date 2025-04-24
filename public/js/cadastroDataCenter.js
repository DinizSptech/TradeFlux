let nome = document.getElementById("ipt_nome")
let cep = document.getElementById("ipt_cep") 
let uf = document.getElementById("ipt_uf")
let cidade = document.getElementById("ipt_cidade")
let bairro = document.getElementById("ipt_bairro")
let logradouro = document.getElementById("ipt_logradouro")
let numero = document.getElementById("ipt_numero")
let complemento = document.getElementById("ipt_complemento")

function validarCep(cep) {
    cep = document.getElementById("ipt_cep").value
    divErroCep.innerHTML = "";
    const regexN = /[0-9]/;
    let cepValido = true;
    if (cep == "") {
      divErroCep.innerHTML += "Preencha o campo CEP\n";
      cepValido = false;
    }
    if (!regexN.test(cep)) {
        divErroCep.innerHTML += "O CEP deve possuir apenas números\n";
      cepValido = false;
    }
    if (cep.length !== 8) {
        divErroCep.innerHTML += "O CEP deve possuir 8 dígitos\n";
      cepValido = false;
    }
    return cepValido;
  }

  function autoPreencherCep() {
    let cep = document.getElementById("ipt_cep").value
    if (validarCep(cep)) {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("ipt_logradouro").value = data.logradouro;
          document.getElementById("ipt_bairro").value = data.bairro;
          document.getElementById("ipt_cidade").value = data.localidade;
          document.getElementById("ipt_uf").value = data.uf;
        })
        .catch((error) => console.error("Erro ao buscar CEP:", error));
    }
  }

  function validarNome(nome) {
    nome = document.getElementById("ipt_nome").value
    divErroNome.innerHTML = "";
    let nomeValido = true;
    if (nome == "") {
      divErroNome.innerHTML += "Preencha o campo Nome\n";
      nomeValido = false;
    }
    return nomeValido;
  }

  function validarNumero(numero) {
    numero = document.getElementById("ipt_numero").value
    divErroNumero.innerHTML = "";
    let numeroValido = true;
    if (numero == "") {
      divErroNumero.innerHTML += "Preencha o campo Número\n";
      numeroValido = false;
    }
    return numeroValido;
  }

  function continuar() {
    const nomeValido = validarNome(nome)
    const cepValido = validarCep(cep)
    const numeroValido = validarNumero(numero)
    if (nomeValido && cepValido && numeroValido) {
        nome = document.getElementById("ipt_nome").value
        cep = document.getElementById("ipt_cep").value
        uf = document.getElementById("ipt_uf").value
        cidade = document.getElementById("ipt_cidade").value
        bairro = document.getElementById("ipt_bairro").value
        logradouro = document.getElementById("ipt_logradouro").value
        numero = document.getElementById("ipt_numero").value
        complemento = document.getElementById("ipt_complemento").value

        if (complemento == "") {
            complemento = "--"
            
        }

        alert("Data Center cadastrado com sucesso!")
        console.log("Dados do Data Center:")
        console.log("nome: " + nome)
        console.log("cep: " + cep)
        console.log("uf: " + uf)
        console.log("cidade: " + cidade)
        console.log("bairro: " + bairro)
        console.log("logradouro: " + logradouro)
        console.log("numero: " + numero)
        console.log("complemento: " + complemento)

        fetch("/unidades/cadastrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                logradouroServer: logradouro,
                bairroServer: bairro,
                cidadeServer: cidade,
                ufServer: uf,
                numeroServer: numero,
                complementoServer: complemento,
                cepServer: cep,
              })
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
              console.log(resposta);
            }
          });
        }


    } 
    
  









