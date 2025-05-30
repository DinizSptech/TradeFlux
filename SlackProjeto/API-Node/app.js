const express = require("express");
// Express é pra conseguir fazer o gerenciamento de chamadas HTTP
const cors = require("cors");
// Cors é para fazer a parte de acesso do que pode ou não acessar

const app = express();

app.use((request, response, next) =>{
    response.header("Access-Control-Allow-Origin", "*")
    // Aqui configuramos o cors e o * é o padrão do "Pode qualquer ip"
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    app.use(cors())
    next()
})

const monitoriaRouter = require("./src/routes/monitoria.routes")
const alertaRouter = require("./src/routes/monitoria.routes")
const bdRouter = require("./src/routes/bdMYSQL.routes")
const bucketRouter = require("./src/routes/bucket.routes")

app.use("/alerta", alertaRouter)
app.use("/bd", bdRouter)
app.use("/bucket", bucketRouter)
app.use("/monitoria", monitoriaRouter)

app.listen(8080,()=>{
    // Tô colocando ele pra escutar tudo que bater na porta aí
    console.log("Servidor iniciado")
})

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