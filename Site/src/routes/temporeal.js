var express = require("express");
var router = express.Router();

 let dadosTempoReal = []

router.post("/monitoria", (req,res) => {
  if(dadosTempoReal.length == 0){
    dadosTempoReal.push(req.body)
    res.status(200).send("Novo servidor adicionado na monitoria.")
  }

  for(let i = 0; i < dadosTempoReal.length; i++){
    let servidorAtual = dadosTempoReal[i] 
    if(servidorAtual.servidor = req.body.servidor){
      if (servidorAtual.length > 11){
       servidorAtual.shift()
       servidorAtual.push(req.body.dados[0])
       res.status(200).send("Buffer modificado, nova captura enviada")
      } else {
         servidorAtual.push(req.body.dados[0])
       res.status(200).send("Buffer modificado, nova captura enviada")
      }
    }
  }
})

module.exports = router