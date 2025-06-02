const monitoriaModel = require("../models/monitoria.models")

function enviar_captura_front(req,res){
      
    captura = {
        'servidor': req.body.servidor, // Corrigido: era 'nome_servidor' mas no Python é 'servidor'
        'dados': 
            {
                'Momento': req.body.dados[0].Momento, // Corrigido: dados vem como array
                'ram': req.body.dados[0].ram, // Corrigido: campos corretos
                'cpu': req.body.dados[0].cpu,
                'disco': req.body.dados[0].disco,
                'criticidade': 0,
                'download': req.body.dados[0].download,
                'upload': req.body.dados[0].upload,
                'tempoAtivo': req.body.dados[0].tempoAtivo,
                'processos': req.body.dados[0].processos // Corrigido: agora pega do request
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