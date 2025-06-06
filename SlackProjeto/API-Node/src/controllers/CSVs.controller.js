// const AWS = require('aws-sdk');
// const path = require('path');
// AWS.config.update({region:process.env.AWS_REGION})

// async function primeiraConexao(req, res) {
//     const NOME = req.params.arquivo
//     const CAMINHO = req.params.caminho
//     console.log(NOME)
//     console.log(CAMINHO)

//     if(!NOME) {
//         console.log(error).res.status(400)
//         return
//      } else if(!CAMINHO) {
//         console.log(error).res.status(400)
//         return
//     }

//     try {
        
//         const resultado = await pegarCSV(NOME, CAMINHO)

        
//         res.send(resultado)

//     } catch {
//         error()
//     }
    
// }

// async function pegarCSV(nome, caminho) {
//     let s3 = new AWS.S3()
//     const parametros = {
//         Bucket : "bucket-client-tradeflux-123",
//         Key : `${caminho}/${nome}`,
//     }

//     try {
//         let csv = await s3.getObject(parametros).promise()
//         let conteudoCSV = csv.body.toString('utf-8');
//         res.setheader("Content-Type", "text/csv; charset=utf-8")
//         res.status(200).send(conteudoCSV)
//     } catch {
//         error()
//     }

// }

// module.exports = {
//     primeiraConexao
// }

const AWS = require('aws-sdk');
const path = require('path');
AWS.config.update({region: process.env.AWS_REGION})

async function primeiraConexao(req, res) {
    const NOME = req.params.arquivo
    const CAMINHO = req.params.caminho
    console.log('Arquivo:', NOME)
    console.log('Caminho:', CAMINHO)

    if(!NOME) {
        console.log('Nome do arquivo não fornecido');
        return res.status(400).json({ error: 'Nome do arquivo é obrigatório' });
    } 
    
    if(!CAMINHO) {
        console.log('Caminho não fornecido');
        return res.status(400).json({ error: 'Caminho é obrigatório' });
    }

    try {
        // Passar o objeto res para a função pegarCSV
        await pegarCSV(NOME, CAMINHO, res);
    } catch (error) {
        console.error('Erro na primeiraConexao:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

async function pegarCSV(nome, caminho, res) {
    let s3 = new AWS.S3()
    const parametros = {
        Bucket: "bucket-client-tradeflux-123",
        Key: `${caminho}/${nome}`,
    }

    try {
        console.log('Buscando arquivo:', parametros.Key);
        let csv = await s3.getObject(parametros).promise()
        let conteudoCSV = csv.Body.toString('utf-8'); // Corrigido: Body com B maiúsculo
        
        // Configurar headers corretos para download
        res.setHeader("Content-Type", "text/csv; charset=utf-8"); // Corrigido: setHeader
        res.setHeader("Content-Disposition", `attachment; filename="${nome}"`);
        res.status(200).send(conteudoCSV);
        
    } catch (error) {
        console.error('Erro ao buscar CSV do S3:', error);
        if (!res.headersSent) {
            res.status(404).json({ error: 'Arquivo não encontrado no S3' });
        }
    }
}

module.exports = {
    primeiraConexao
}