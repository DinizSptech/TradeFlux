const AWS = require('aws-sdk');
const path = require('path');

// Configurar AWS com credenciais temporárias
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN  // IMPORTANTE: Para credenciais temporárias (É aquilo que o Edu vive falando da gente não ter realmente uma conta, então precisamos disso para ter acesso, se não dá cadu)
});

async function primeiraConexao(req, res) {
    const NOME = req.params.arquivo;
    const CAMINHO = req.params.caminho;

    // Só os testes que eu tava fazendo para debuggar o programa, caso dê erro em algo, descomente abaixo e veja o que vem no console:
    // console.log('Nome do arquivo recebido:', NOME);
    // console.log('Caminho recebido:', CAMINHO);
    // console.log('URL completa:', req.originalUrl);

    if (!NOME) {
        console.log('Nome do arquivo não fornecido');
        return res.status(400).json({ error: 'Nome do arquivo é obrigatório' });
    } 
    
    if (!CAMINHO) {
        console.log('Caminho não fornecido');
        return res.status(400).json({ error: 'Caminho é obrigatório' });
    }

    try {
        const resultado = await pegarCSV(NOME, CAMINHO);
        
        // Definir headers para download do CSV
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${NOME}"`);
        res.status(200).send(resultado);
        // console.log('Arquivo "pego" com sucesso');

    } catch (error) {
        console.error('Erro ao buscar CSV:', error.message);
        res.status(500).json({ 
            error: 'Erro interno do servidor ao buscar CSV',
            details: error.message 
        });
    }
}

async function pegarCSV(nome, caminho) {
    const s3 = new AWS.S3();
    
    // Construir o caminho completo
    const keyCompleta = `${caminho}/${nome}`;
    
    const parametros = {
        Bucket: "tradeflux-client",
        Key: keyCompleta,
    };

    // console.log('Bucket:', parametros.Bucket);
    // console.log('Key completa:', parametros.Key);
    // console.log('Região AWS:', process.env.AWS_REGION);

   try {
        const objeto = await s3.getObject(parametros).promise();
        return objeto.Body.toString('utf-8');
        
    } catch (error) {
        throw new Error(`Arquivo não encontrado: ${parametros.Key}`);
    }
}

module.exports = {
    primeiraConexao
};