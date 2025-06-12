const bucketModel = require("../models/bucket.models")
const fs = require('fs').promises;
const path = require('path');

// Buffers para armazenar dados temporariamente
let bufferCapturas = [];
let bufferAlertas = [];

function salvarMonitoria(request, response) {
    let cpu = request.body.cpu
    let ram = request.body.ram
    let disco = request.body.disco
    let processos = request.body.processos
    let download = request.body.download
    let upload = request.body.upload

   const variaveis = { cpu, ram, disco, processos, download, upload }
   let erro = false

    for (const [nome, valor] of Object.entries(variaveis)) {
        
        if (valor == undefined) {
            response.status(400).send(`A variável '${nome}' está undefined!`);
            erro = true
            return
        }
    
    }

    if(!erro) {
        bucketModel
            .salvandoJSON(request)
            .then(() => {
            response.status(200).send("Componente cadastrado com sucesso");
          })
        .catch(function (erro) {
            console.error("Erro ao cadastrar componente:", erro);
            response.status(500).json(erro.sqlMessage || erro.message);
          });
    } 

}

function salvarCaptura(request, response) {
    try {
        const dadosCaptura = request.body;
        
        // Adicionar timestamp se não existir
        if (!dadosCaptura.timestamp) {
            dadosCaptura.timestamp = new Date().toISOString();
        }
        
        // Adicionar aos buffer de capturas
        bufferCapturas.push(dadosCaptura);
        console.log(`Buffer capturas: ${bufferCapturas.length}/240`);
        
        // Verificar se chegou a 240 registros
        if (bufferCapturas.length >= 60) {
            const dadosParaEnviar = [...bufferCapturas];
            bufferCapturas = []; // Limpar buffer
            
            // Enviar para bucket de forma assíncrona
            enviarParaBucket(dadosParaEnviar, 'capturas')
                .then(() => console.log('Capturas enviadas para bucket com sucesso'))
                .catch(err => console.error('Erro ao enviar capturas:', err));
        }
        
        response.status(200).json({ mensagem: "Captura armazenada no buffer", buffer_size: bufferCapturas.length });
        
    } catch (error) {
        console.error('Erro ao processar captura:', error);
        response.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

function salvarAlerta(request, response) {
    try {
        const dadosAlerta = request.body;
        
        // Adicionar timestamp se não existir
        if (!dadosAlerta.timestamp) {
            dadosAlerta.timestamp = new Date().toISOString();
        }
        
        // Adicionar ao buffer de alertas
        bufferAlertas.push(dadosAlerta);
        console.log(`Buffer alertas: ${bufferAlertas.length}/100`);
        
        // Verificar se chegou a 100 registros
        if (bufferAlertas.length >= 25) {
            const dadosParaEnviar = [...bufferAlertas];
            bufferAlertas = []; // Limpar buffer
            
            // Enviar para bucket de forma assíncrona
            enviarParaBucket(dadosParaEnviar, 'alertas')
                .then(() => console.log('Alertas enviados para bucket com sucesso'))
                .catch(err => console.error('Erro ao enviar alertas:', err));
        }
        
        response.status(200).json({ mensagem: "Alerta armazenado no buffer", buffer_size: bufferAlertas.length });
        
    } catch (error) {
        console.error('Erro ao processar alerta:', error);
        response.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

async function enviarParaBucket(dados, diretorio) {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const nomeArquivo = `${diretorio}_${timestamp}.json`;
        const dadosJson = JSON.stringify(dados, null, 2);
        
        // Usar o modelo para salvar no bucket
        await bucketModel.salvarJSON(nomeArquivo, dadosJson, diretorio);
        
        console.log(`Arquivo ${nomeArquivo} enviado para ${diretorio}/ com ${dados.length} registros`);
        
    } catch (error) {
        console.error(`Erro ao enviar para bucket (${diretorio}):`, error);
        throw error;
    }
}

function salvarFoto(request, response) {
    try {
        const { nomeArquivo, dadosImagem, mimeType } = request.body;
        
        if (!nomeArquivo || !dadosImagem || !mimeType) {
            return response.status(400).json({ erro: 'Parâmetros obrigatórios: nomeArquivo, dadosImagem, mimeType' });
        }
        
        const buffer = Buffer.from(dadosImagem, 'base64');
        
        bucketModel.salvandoImagem(nomeArquivo, buffer, mimeType)
            .then(() => {
                response.status(200).json({ mensagem: 'Foto salva com sucesso' });
            })
            .catch(error => {
                console.error('Erro ao salvar foto:', error);
                response.status(500).json({ erro: 'Erro ao salvar foto' });
            });
            
    } catch (error) {
        console.error('Erro ao processar foto:', error);
        response.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

function pegarFoto(request, response) {
    response.status(501).json({ erro: 'Funcionalidade não implementada' });
}

function obterStatusBuffers(request, response) {
    response.status(200).json({
        capturas: {
            atual: bufferCapturas.length,
            limite: 240
        },
        alertas: {
            atual: bufferAlertas.length,
            limite: 100
        }
    });
}

module.exports = {
    salvarMonitoria,
    salvarCaptura,
    salvarAlerta,
    salvarFoto,
    pegarFoto,
    obterStatusBuffers
};