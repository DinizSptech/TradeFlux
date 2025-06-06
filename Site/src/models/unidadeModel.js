var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql  //nome, estado, cidade, bairro, contato, fkEmpresa
function cadastrar(nome, cep, estado, cidade, bairro, logradouro, numero, complemento, fkCliente) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cep,
    estado,
    cidade,
    bairro,
    logradouro,
    numero,
    complemento,
    fkCliente
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
        INSERT INTO endereco (cep, logradouro, numero, bairro, cidade, uf) VALUES 
        ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${estado}');

        INSERT INTO data_center (nome, fk_endereco, fk_cliente) VALUES
        ('${nome}', LAST_INSERT_ID(), ${fkCliente});
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
};