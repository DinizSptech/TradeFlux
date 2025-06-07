const express = require("express");
// Express é pra conseguir fazer o gerenciamento de chamadas HTTP
const cors = require("cors");
// Cors é para fazer a parte de acesso do que pode ou não acessar
const app = express();

require("dotenv").config();

const corsOptions = {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Aqui é a configuração do Cors para aceitar de qualquer IP
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  
  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(cors(corsOptions));
app.use(express.json());

const monitoriaRouter = require("./src/routes/monitoria.routes");
const alertaRouter = require("./src/routes/alerta.routes");
const bdRouter = require("./src/routes/bdMYSQL.routes");
const bucketRouter = require("./src/routes/bucket.routes");
const pixRouter = require("./src/routes/pix.routes");
const csvRouter = require("./src/routes/pegarCSVs.routes");

app.use("/alerta", alertaRouter);
app.use("/bd", bdRouter);
app.use("/bucket", bucketRouter);
app.use("/monitoria", monitoriaRouter);
app.use("/pix", pixRouter);
app.use("/CSVs", csvRouter);

app.listen(3000, () => {
  // Tô colocando ele pra escutar tudo que bater na porta aí
  console.log("Servidor iniciado");
});

// Testes que eu tava fazendo para Aprender a lidar com os metódos:

// app.get("/teste", cors(), (request, response) => {
//     // Request me geraria informações sobre a requisição
//     // Response define a resposta de quando bater nessa rota

//     // response.status Serve para saber o status da requisição
//     response.status(200)
//     response.json(jsonZinho)

// })

// app.post("/testeRecebendo", cors(), jsonParser, (request , response) => {
//     const corpoRequisicao = request.body
//     console.log(corpoRequisicao)

// })

// app.get("/teste2/:id", cors(), (request, response) => {
//     const id = request.params.id
//     console.log(id)
// })