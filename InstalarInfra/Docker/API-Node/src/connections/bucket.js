// bucket.js - Versão melhorada com validação de credenciais
const { S3Client } = require("@aws-sdk/client-s3");

// Verificar se as variáveis de ambiente existem
const region = process.env.AWS_REGION || 'us-east-1';
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN; // Para credenciais temporárias

console.log('Configuração AWS:');
console.log('Region:', region);
console.log('Access Key ID:', accessKey ? `${accessKey.substring(0, 4)}...` : 'NÃO DEFINIDO');
console.log('Secret Key:', secretKey ? 'DEFINIDO' : 'NÃO DEFINIDO');
console.log('Session Token:', sessionToken ? 'DEFINIDO' : 'NÃO DEFINIDO');

// Verificar se é credencial temporária
if (accessKey && accessKey.startsWith('ASIA') && !sessionToken) {
    console.warn('⚠️  ATENÇÃO: Credencial temporária detectada (ASIA) mas AWS_SESSION_TOKEN não foi fornecido!');
}

// Verificar se credenciais estão definidas
if (!accessKey || !secretKey) {
    console.error('❌ ERRO: Credenciais AWS não estão definidas no .env');
    process.exit(1);
}

const credentials = {
    accessKeyId: accessKey,
    secretAccessKey: secretKey
};

// Adicionar session token se disponível (necessário para credenciais temporárias)
if (sessionToken) {
    credentials.sessionToken = sessionToken;
}

const s3 = new S3Client({
    region: region,
    credentials: credentials
});

module.exports = s3;