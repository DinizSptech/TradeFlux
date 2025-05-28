install.packages("lubridate")
library(lubridate)

data_centers <- c("Data Center 1", "Data Center 2", "Data Center 3")
data_fim <- as.Date("2024-05-27")
data_inicio <- data_fim - 30

gerar_tempo <- function() {
  minutos <- rnorm(1, 6, 2)
  minutos <- max(2, min(10, minutos))
  segundos <- as.integer(minutos * 60) + sample(0:59, 1)
  h <- segundos %/% 3600
  m <- (segundos %% 3600) %/% 60
  s <- segundos %% 60
  sprintf("%02d:%02d:%02d", h, m, s)
}

tempo_segundos <- function(tempo) {
  partes <- as.numeric(strsplit(tempo, ":")[[1]])
  partes[1] * 3600 + partes[2] * 60 + partes[3]
}

dados <- data.frame()
data_atual <- data_inicio

while (data_atual <= data_fim) {
  for (i in 1:sample(5:15, 1)) {
    hora <- as.POSIXct(paste(data_atual, sprintf("%02d:%02d:%02d",
                                                 sample(0:23, 1), sample(0:59, 1), sample(0:59, 1))))
    dados <- rbind(dados, data.frame(
      data_center = sample(data_centers, 1),
      data_hora = format(hora, "%Y-%m-%d %H:%M:%S"),
      tempo_resolucao = gerar_tempo()
    ))
  }
  data_atual <- data_atual + 1
}

dados$temp <- sapply(dados$tempo_resolucao, tempo_segundos)
dados <- dados[order(dados$temp, decreasing = TRUE), ]

write.csv(dados, "alertas.csv", row.names = FALSE)
print(paste("CSV gerado com", nrow(dados), "registros"))
head(dados)
