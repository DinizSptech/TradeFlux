const e = require("express");
const crypto = require('crypto');

const PEPPER = "Tralalelo_tralala"
let usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.autenticar(email)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);

          const valido = verificarSenhaComPepper(resultadoAutenticar[0].senha, senha)

          if (valido) {
            res.json({
              id: resultadoAutenticar[0].idUsuario,
              nome: resultadoAutenticar[0].nome,
              email: resultadoAutenticar[0].email,
              senha: resultadoAutenticar[0].senha,
              cargo: resultadoAutenticar[0].cargo,
              data_center: resultadoAutenticar[0].data_center
            });
          
          } else {
            res.status(403).send("Email e/ou senha inválido(s)");
          }

        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  let nome = req.body.nomeServer;
  let senha = req.body.senhaServer;
  let email = req.body.emailServer;
  let cargo = req.body.cargoServer;
  let data_center = req.body.dataCenterServer;
  let ativo = req.body.ativoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  }  else if (ativo == undefined) {
    res.status(400).send("Seu ativo está undefined!");
  }  else if (data_center == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  }
  else {

    senhaHashirizada = criarHashComPepper(senha)

    usuarioModel
      .cadastrar(nome, senhaHashirizada, email, cargo, ativo, data_center)
      .then((resultado) => {
        res.status(200).json(resultado);
        res.status(200).send("Usuario cadastrado com sucesso");
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function criarHashComPepper(senha) {

  const salt = crypto.randomBytes(16).toString('hex');
  // Aqui ele tá criando o "Sal", que vamos utilizar pra criar o Hash na const abaixo, pq dessa maneira, sempre será utilizado a String antes de converter, dando mais segurança
  
  const hash = crypto.scryptSync(senha + PEPPER, salt, 64).toString('hex');
  // Aqui a gente basicamente cria o "Criptografia", pq entre aspas? Pq isso não é criptografia, basicamente, pelo Hash ser aleatório, a gente vai salvar o hash e dps vai comparar o hash salvo no BD que foi criado utilizando a nossa "pimenta" para ver se bate as duas

  return `${salt}:${hash}`;
  // Retorna uma string, o : é só um divisor do sal com nosso Hash

}

function verificarSenhaComPepper(senhaArmazenada, senhaFornecida) {
  
  const [salt, hash] = senhaArmazenada.split(':');
  // Ele sepata o Hash que tá lá no BD e separa para gente usar o Salt que ele tem pra criar o novo Hash e validar dps com a criação do Pepper para ver se fununcia

  const hashVerificacao = crypto.scryptSync(senhaFornecida + PEPPER, salt, 64).toString('hex');
  // aqui criamos o novo Hash 

  return hash === hashVerificacao;
  // aqui retornamos true ou false, ou seja, a senha tá certa ou não
}

module.exports = {
  autenticar,
  cadastrar,
};

// A senha segue o padrão Salt and Pepper:

// O salt é uma sequência aleatória de bytes (ou caracteres) que é combinada com a senha do usuário antes de criar o hash. Cada usuário recebe um salt diferente e aleatório, que é então armazenado junto com o hash resultante.

// O pepper é uma chave secreta única para todo o sistema que é adicionada às senhas antes de passar pelo processo de hash. Diferente do salt, que é único para cada usuário e armazenado junto com o hash. Se um atacante conseguir acesso ao banco de dados com os hashes e salts, ainda não conseguirá quebrar as senhas eficientemente sem conhecer o pepper. Isso torna o sistema muito mais seguro contra vazamentos de dados, já que o atacante precisaria comprometer tanto o banco de dados quanto o servidor de aplicação para obter todos os elementos necessários para tentar quebrar as senhas.