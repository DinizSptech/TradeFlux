const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../connections/bucket");

async function salvandoImagem(nomeArquivo, buffer, mimeType) {
    const comando = new PutObjectCommand({
        Bucket: "bucketFotosUsuarios",
        Key: `fotos/${nomeArquivo}`,
        Body: buffer,
        ContentType: mimeType
    });

    await s3.send(comando);
}

module.exports = {
    salvandoImagem
};