function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  let nome = req.body.nomeServer;
  let logradouro = req.body.logradouroServer;
  let bairro = req.body.bairroServer;
  let cidade = req.body.cidadeServer;
  let uf = req.body.ufServer;
  let numero = req.body.numeroServer;
  let complemento = req.body.complementoServer;
  let cep = req.body.cepServer;


  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (logradouro == undefined) {
    res.status(400).send("Seu logradouro está undefined!");
  } else if (bairro == undefined) {
    res.status(400).send("Seu bairro está undefined!");
  } else if (cidade == undefined) {
    res.status(400).send("Sua cidade está undefined!");
  }  else if (uf == undefined) {
    res.status(400).send("Seu uf está undefined!");
  }  else if (numero == undefined) {
    res.status(400).send("Seu numero está undefined!");
  } else if (cep == undefined) {
    res.status(400).send("Seu CEP está undefined!");
  } 
  else {

    usuarioModel
      .cadastrar(nome, logradouro, bairro, cidade, uf, numero, cep, complemento)
      .then((resultado) => {
        res.status(200).json(resultado);
        res.status(200).send("Usuario cadastrado com sucesso");
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
    cadastrar,
  };