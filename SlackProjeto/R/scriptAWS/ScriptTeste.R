# Se a Giu perguntar pra vcs tbm como feita a conexão, ele usa uma depedência chamada "httr" para fazer requisições http no Bucket

# Caso seja sua primeira vez utilizando o arquivo, descomente o seguinte comando para a instalação do pacote:

# install.packages('aws.s3')
# install.packages('ggplot2')

library(aws.s3)
library(ggplot2)

# Preencha as seguintes informações:

Sys.setenv(
  "AWS_ACCESS_KEY_ID" = "",
  "AWS_SECRET_ACCESS_KEY" = "",
  "AWS_SESSION_TOKEN" = "",
  "AWS_DEFAULT_REGION" = "us-east-1"
)

bucket_nomeOrigem <- "bucket-trusted-tradeflux"
bucket_nomeDestino <- "bucket-client-tradeflux"

# Aqui é só pra criar o bucket de teste caso vc não tenha: put_bucket(bucket_nameOrigem)

# Area de ver informações:

#Use esse comando para listar seus servidores:
bucket_caminhoSemServidorEscolhido = "monitoramento/"
get_bucket(bucket_nomeOrigem, prefix = bucket_caminhoSemServidorEscolhido)

# Altere o número do servidor para escolher o servidor desejado para gerar seus insights:
bucket_caminhoServidorEscolhido = "monitoramento/servidor_exemplo1"
get_bucket(bucket_nomeOrigem, prefix = bucket_caminhoServidorEscolhido)

# Aqui caso queira dados do Pix:
bucket_caminhoPix = "pix/"
get_bucket(bucket_nomeOrigem, prefix = bucket_caminhoPix)

# Areá de "pegar" dados:

bucket_caminhoCSV <- paste0(bucket_caminhoServidorEscolhido, "/maquina1.csv")
# ou
bucket_caminhoPixCSV <- paste0(bucket_caminhoPix, "/exemplo.csv")

# Aqui pegaremos o "Bruto", basicamente um tipo de dado que é o que vem desse comando para pegar o objeto para convertemos para texto:
obj <- get_object(bucket_caminhoCSV, bucket = bucket_nomeOrigem)
texto_csv <- rawToChar(obj)

# Cria uma conexão de leitura a partir do texto (Não sei explicar perfeitamete tudo sobre como funciona por baixo dos panos essa conexão, mas basicamente isso é para a pessoa não precisar ficar baixando arquivo e sim ler diretamente do bucket)
con <- textConnection(texto_csv)

dadosMonitoramentoInterno <- read.csv(con, sep = ";", header = TRUE, quote = "\"")
dadosMonitoramentoInterno

# Fecha a conexão
close(con)

# Todo processo dnv mas para PIX:
obj <- get_object(bucket_caminhoPixCSV, bucket = bucket_nomeOrigem)
texto_csv <- rawToChar(obj)

con <- textConnection(texto_csv)

dadosMonitoramentoExterno <- read.csv(con, sep = ";", header = TRUE, quote = "\"")

# ÁREA PARA CRIAÇÂO DOS INSIGHTS POSTERIOR A VER OS ARQUIVOS DISPONÌVEIS E SELECIONAR OS CSVS DESEJADOS POSTERIOR A ALTERAÇÂO DO SCRIPT BASE


# FINAL, PARTE DE SALVAR EM IMAGEM E SUBIR NO BUCKET:

# Criando um arquivo temporário para transformar o gráfico em imagem
arquivo_temp <- tempfile(fileext = ".png")

# Abrir dispositivo gráfico para salvar em PNG
png(arquivo_temp, width = 800, height = 600)

# Gerando o gráfico (aqui você coloca o código que vc quer):


# Fechar o dispositivo gráfico para finalizar a imagem
dev.off()

# Enviando o arquivo para o bucket
# Não esqueça de preencher o Object da seguinte maneira: rogério/(dia_mes_ano-data_hr)(exemplo: 04_05_25-23_59).png
put_object(
  file = arquivo_temp,
  object = "rogério/.png",
  bucket = "bucket-client-tradeflux",
  content_type = "image/png"
)

# Caso tenha alguma dúvida, segue abaixo a documentação:
# https://www.rdocumentation.org/packages/aws.s3/versions/0.1.33