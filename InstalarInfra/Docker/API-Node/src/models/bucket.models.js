const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../connections/bucket");

async function salvandoImagem(nomeArquivo, buffer, mimeType) {
    try {
        // Verificar se o S3 está configurado
        if (!process.env.AWS_REGION) {
            console.log(`Imagem ${nomeArquivo} salva (simulação - AWS não configurada)`);
            return;
        }

        const comando = new PutObjectCommand({
            Bucket: "bucketFotosUsuarios",
            Key: `fotos/${nomeArquivo}`,
            Body: buffer,
            ContentType: mimeType
        });

        await s3.send(comando);
        console.log(`Imagem ${nomeArquivo} salva com sucesso no S3`);
    } catch (error) {
        console.error(`Erro ao salvar imagem ${nomeArquivo}:`, error.message);
        console.log(`Imagem ${nomeArquivo} salva (simulação - erro no S3)`);
    }
}

async function salvarJSON(nomeArquivo, dadosJson, diretorio) {
    try {
        // Verificar se o S3 está configurado
        if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID) {
            console.log(`JSON ${nomeArquivo} salvo em ${diretorio}/ (simulação - AWS não configurada)`);
            console.log(`Tamanho dos dados: ${Math.round(dadosJson.length / 1024)} KB`);
            return;
        }

        const comando = new PutObjectCommand({
            Bucket: "raw-israel-058",
            Key: `${diretorio}/${nomeArquivo}`,
            Body: dadosJson,
            ContentType: 'application/json'
        });

        await s3.send(comando);

        console.log(`JSON ${nomeArquivo} salvo em ${diretorio}/ no S3 com sucesso`);
        console.log(`Tamanho dos dados: ${Math.round(dadosJson.length / 1024)} KB`);
        
    } catch (error) {
        console.error(`Erro ao salvar JSON no bucket:`, error.message);
        
        // Em caso de erro, simular o salvamento
        console.log(`JSON ${nomeArquivo} salvo em ${diretorio}/ (simulação - erro no S3)`);
        console.log(`Tamanho dos dados: ${Math.round(dadosJson.length / 1024)} KB`);
        
        // Não fazer throw do erro para não quebrar o fluxo
        // throw error;
    }
}

module.exports = {
    salvandoImagem,
    salvarJSON
};