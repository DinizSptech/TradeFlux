const mysql = require("mysql2");

const mySqlSelect = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER_SELECT,
    password: process.env.DB_PASSWORD_SELECT,
    port: process.env.DB_PORT,
    multipleStatements: true
};

const mySqlInsert = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER_INSERT,
    password: process.env.DB_PASSWORD_INSERT,
    port: process.env.DB_PORT,
    multipleStatements: true
}

function executarSelect(instrucao) {

    console.log(mySqlSelect)

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlSelect);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO SELECT DO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

function executarInsert(instrucao) {

    console.log(mySqlInsert)


    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlInsert);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO INSERT DO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executarSelect,
    executarInsert
};