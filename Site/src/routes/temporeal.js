var express = require("express");
var router = express.Router();

let buffer = [];

router.post("/monitoria", (req, res) => {
  console.log("Dados recebidos!")
  const servidorRecebido = req.body.servidor;
  const novoDado = req.body.dados;
  
  let servidorExistente = buffer.find(dadoServer => dadoServer.servidor == servidorRecebido);

  if (!servidorExistente) {
    buffer.push({
      servidor: servidorRecebido,
      dados: [novoDado],
      countdown: 15,
      ativo: true
    });
    return res.status(200).send("Novo servidor adicionado na monitoria.");
  }

  if (servidorExistente.dados.length >= 15) {
    servidorExistente.dados.shift();
  }
  servidorExistente.dados.push(novoDado);
  servidorExistente.countdown = 15
  console.log(servidorExistente.dados[servidorExistente.dados.length - 1])
  return res.status(200).send("Buffer modificado, nova captura enviada.");
});


router.get("/monitoria", (req, res) => {
  console.log("\n Lendo buffer lista! \n")
  res.status(200).json(buffer);
});

(async function () {
    let clearBuffer = function() { 
        for(let i = 0; i < buffer.length; i++){
          console.log(buffer[i].servidor + " - Cronometro: " + buffer[i].countdown)
          if(buffer[i].countdown <= 5 && buffer[i].countdown > 0){
            buffer[i].ativo = false
          } else if (buffer[i].countdown < 0){
            console.log(`"SERVIDOR ${buffer[i].servidor} REMOVIDO!"`)
           buffer.splice(i,1)
           continue
          } 
          buffer[i].countdown -= 1
        }
    };

    setInterval(clearBuffer, 6000);
})();

module.exports = router;
