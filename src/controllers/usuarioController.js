const e = require("express");
const crypto = require('crypto');

const PEPPER = 'Tralalelo_tralala';
// Aqui você deve definir o valor da sua pimenta, que é uma string secreta e única para o seu sistema. Ela deve ser mantida em segredo e não deve ser armazenada no banco de dados.
let usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  
  // Descomente para debugar caso algo dê errado:
  const testeSenha = "Jennifer123@";
  const hashBDTesteConstrução = criarHashComPepper(testeSenha)
  const hashErrado = "6d2f4a8c1e5b7d9a3c6f2e8d1a5b7c9e:7f3a1d8e5c2b9f6a4d7e0c3b8a5f2d9c6b3e0a7d4f1c8b5a2e9f6d3c0b7a4f1";
  const testeValido = verificarSenhaComPepper(hashErrado, testeSenha);
  const testeValido2 = verificarSenhaComPepper(hashBDTesteConstrução, testeSenha);
  
  console.log("")
  console.log("")
  console.log("Testes")
  
  console.log("Pimenta:", PEPPER);
  console.log("Teste manual de verificação:", testeValido)
  console.log("Teste manual de verificação:", testeValido2);

  console.log("")
  console.log("")
  console.log("")

  senha = senha.trim();

  const senhaTeste = "Jennifer123@";
  const senhaHash = criarHashComPepper(senhaTeste);
  console.log("Senha gerada com hash:", senhaHash);
  console.log("Verificação bate:", verificarSenhaComPepper(senhaHash, senha));

  console.log("Entrei autenticar")

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

          const senhaBD = resultadoAutenticar[0].senha
          const valido = verificarSenhaComPepper(senhaBD, senha)

          if (valido) {
            res.json({
              id: resultadoAutenticar[0].idUsuario,
              nome: resultadoAutenticar[0].nome,
              email: resultadoAutenticar[0].email,
              senha: senha,
              cargo: resultadoAutenticar[0].cargo,
              data_center: resultadoAutenticar[0].fkDataCenter
            });
          
          } else {
            res.status(403).send("Hash");
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

    senhaHasheada = criarHashComPepper(senha)

    usuarioModel
      .cadastrar(nome, senhaHasheada, email, cargo, ativo, data_center)
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
  
  const hash = crypto.scryptSync(senha + PEPPER, salt, 32).toString('hex');
  console.log(hash)
    // Aqui a gente basicamente cria o "Criptografia", pq entre aspas? Pq isso não é criptografia, basicamente, pelo Hash ser aleatório, a gente vai salvar o hash e dps vai comparar o hash salvo no BD que foi criado utilizando a nossa "pimenta" para ver se bate as duas

  return `${salt}:${hash}`;
  // Retorna uma string, o : é só um divisor do sal com nosso Hash

}

function verificarSenhaComPepper(senhaArmazenada, senhaFornecida) {
  
  console.log("Senha armazenada:", senhaArmazenada);
  console.log("Senha fornecida:", senhaFornecida);

  const [salt, hash] = senhaArmazenada.split(':');
  console.log("Salt recuperado:", salt);
  console.log("Hash original:", hash);

  // Ele sepata o Hash que tá lá no BD e separa para gente usar o Salt que ele tem pra criar o novo Hash e validar dps com a criação do Pepper para ver se fununcia

  const hashVerificacao = crypto.scryptSync(senhaFornecida + PEPPER, salt, 32).toString('hex');
  console.log("Hash gerado para verificação:", hashVerificacao);
  console.log("Hash original e hash de verificação são iguais?", hash === hashVerificacao);

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