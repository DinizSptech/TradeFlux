
library(lubridate)


inicio <- as.POSIXct("2025-03-05 00:01:00")
fim <- inicio + months(3)

# sequência de tempo a cada 1 minuto
timestamps <- seq(from = inicio, to = fim, by = "1 min")
=
set.seed(5255553555)  

limita <- function(x, min, max) {
  pmin(pmax(x, min), max)
}

cpuPercent <- round(limita(rnorm(length(timestamps), mean = 15, sd = 23), 0, 100), 1)

percentualRAM <- round(limita(rnorm(length(timestamps), mean = 50, sd = 25), 0, 100), 1)

percentualDisco <- round(limita(rnorm(length(timestamps), mean = 45, sd = 35), 0, 100), 1)


servidor10 <- data.frame(
  servidor = 10,
  data_hora = timestamps,
  percentualCPU = cpuPercent,
  percentualRAM = percentualRAM,
  percentualDisco = percentualDisco
)


write.table(servidor10, col.names = TRUE, row.names = FALSE,
            file = "servidor10.csv", 
            sep = ";",
            fileEncoding = "UTF-8")



