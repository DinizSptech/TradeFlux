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
                "Momento": tratarHorario(req.body.dados.Momento), 
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

    validar = ['ram', 'cpu', 'disco']
    for(let i  = 0; i < validar.length; i++){
            if(captura.dados[validar[i]] >= 80){
                captura.dados.criticidade += 3
            } else if (captura.dados[validar[i]] >= 70){
                captura.dados.criticidade += 1
            }
    }
    monitoriaModel.fetch_captura_wdv(captura)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch (function (erro){
            res.status(500).send("Erro em enviar captura para web-data-viz:" + erro)
        }) 
}

function tratarHorario(data) {
    // Serve para deixar na zona de tempo local, subtrair 3 horas do horário do meridiano d greenwitch
  const dataTratada = new Date(data);

  dataTratada.setHours(dataTratada.getHours() - 3);

  // Funcao q transforma qualquer digito recebido em 2 digitos.
  const padronizar = (n) => n.toString().padStart(2, '0');

  const dia = padronizar(dataTratada.getDate());
  const mes = padronizar(dataTratada.getMonth() + 1); // meses funfam como array, vao de 0 a 11
  const ano = dataTratada.getFullYear();
  const hora = padronizar(dataTratada.getHours());
  const minuto = padronizar(dataTratada.getMinutes());
  const segundo = padronizar(dataTratada.getSeconds());

  return `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;
}


module.exports = {
    enviar_captura_front
}