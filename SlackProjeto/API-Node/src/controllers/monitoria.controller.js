const monitoriaModel = require("../models/monitoria.models")

function enviar_captura_front(req,res){
      
           captura = {
        'servidor': req.body.nome_servidor,
        'dados': [

          {
            'Momento': req.body.dados[0].Momento,
            'ram': req.body.dados[0].ram_percentual,
            'cpu': req.body.dados[0].cpu_percentual,
            'disco': req.body.dados[0].disco_percentual,
            'criticidade': 0,
            'download': req.body.dados[0].velocidade_download,
            'upload': req.body.dados[0].velocidade_upload,
            'tempoAtivo': req.body.dados[0].tempo_ativo,
            'processos': req.body.dados[0].processos
          }
        ]
        
      }

       validar = ['ram', 'cpu', 'disco','download','upload']
        for(let i  = 0; i < validar.length; i++){
          if(i <= 2){
            if(captura.dados[0][validar[i]] > 80){
              captura.dados[0].criticidade += 3
            } else if (captura.dados[0][validar[i]] > 70){
              captura.dados[0].criticidade += 1
            }
          } else if (i == 3){
           if(captura.dados[0][validar[i]] > 1500){
              captura.dados[0].criticidade += 3
        }else if (captura.dados[0][validar[i]] > 1000){
              captura.dados[0].criticidade += 1
            }
      } else {
                   if(captura.dados[0][validar[i]] > 500){
              captura.dados[0].criticidade += 3
        }else if (captura.dados[0][validar[i]] > 300){
              captura.dados[0].criticidade += 1
            }
      } 

    }

     monitoriaModel.fetch_captura_wdv(captura)
            .then( function (resultado) {
                res.json(resultado);
                res.status(200).send("Sucesso em enviar captura para web-data-viz!\n")
            }).catch (function (erro){
              res.status(500).send("Erro em enviar captura para web-data-viz:" + erro)
            }) 
    

}

module.exports = {
  enviar_captura_front
}