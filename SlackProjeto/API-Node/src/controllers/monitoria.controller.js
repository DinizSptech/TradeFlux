const monitoriaModel = require("../models/monitoria.models")

function enviar_captura_front(req,res){
    if(!req){
     res.status(400).send("Vetor de dados da captura vazio.")
    }
    console.log("\n\n\nCorpo da requisição: ")
    console.log(req.body)
      
    captura = {

        "servidor": req.body.servidor, // Corrigido: era "nome_servidor" mas no Python é "servidor"
        "dados": {
                "Momento": req.body.dados.Momento, 
                "ram": req.body.dados.ram, 
                "cpu": req.body.dados.cpu,
                "disco": req.body.dados.disco,
                "criticidade": 0,
                "download": req.body.dados.download,
                "upload": req.body.dados.upload,
                "tempo_ativo": req.body.dados.tempo_ativo,
                "processos": req.body.dados.processos
            }
        
    }

    validar = ['ram', 'cpu', 'disco','download','upload']
    for(let i  = 0; i < validar.length; i++){
        if(i <= 2){
            if(captura.dados[validar[i]] > 80){
                captura.dados.criticidade += 3
            } else if (captura.dados[validar[i]] > 70){
                captura.dados.criticidade += 1
            }
        } else if (i == 3){
            if(captura.dados[validar[i]] > 1500){
                captura.dados.criticidade += 3
            }else if (captura.dados[validar[i]] > 1000){
                captura.dados.criticidade += 1
            }
        } else {
            if(captura.dados[validar[i]] > 500){
                captura.dados.criticidade += 3
            }else if (captura.dados[validar[i]] > 300){
                captura.dados.criticidade += 1
            }
        } 
    }

    monitoriaModel.fetch_captura_wdv(captura)
        .then( function (resultado) {
            res.status(200).json(resultado);
        }).catch (function (erro){
            res.status(500).send("Erro em enviar captura para web-data-viz:" + erro)
        }) 
}

module.exports = {
    enviar_captura_front
}