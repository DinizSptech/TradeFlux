// var ambiente_processo = 'producao';
var ambiente_processo = "producao";

var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = "8080";
var HOST_APP = "site";

var app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuarios");
const unidadesRouter = require("./src/routes/unidades");
const servidoresRouter = require("./src/routes/servidores");
const dataCenterRouter = require("./src/routes/dataCenter");
const componentesRouter = require("./src/routes/componentes");
const alertasRouter = require("./src/routes/alertas");
const admRouter = require("./src/routes/adm");
const temporealRouter = require("./src/routes/temporeal");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/unidades", unidadesRouter);
app.use("/servidores", servidoresRouter);
app.use("/componentes", componentesRouter);
app.use("/dataCenter", dataCenterRouter);
app.use("/alertas", alertasRouter);
app.use("/adm", admRouter);
app.use("/tempo_real", temporealRouter);

app.listen(PORTA_APP, function () {
  console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${process.env.APP_HOST}:${process.env.APP_PORT} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
