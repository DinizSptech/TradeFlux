# NOME: ISRAEL COAQUIRA JUMPIRI    RA: 04242058

library(ggplot2)

dados_registro <- read.csv(file.choose(), sep=";", stringsAsFactors=FALSE)
dados_processos <- read.csv(file.choose(), sep=";", stringsAsFactors=FALSE)

executar_analises <- function(dados_registro, dados_processos, tamanho_registro, tamanho_processos, nome_amostra){
  
  amostra_registro <- head(dados_registro, tamanho_registro)
  amostra_processos <- head(dados_processos, tamanho_processos)
  
  amostra_registro$dataHora <- as.POSIXct(amostra_registro$dataHora, format="%Y-%m-%d %H:%M:%S")
  
  resultados_r2 <- list()
  graficos <- list()
  retas_erros_media <- list()
  retas_erros_regressao <- list()
  
  cat("\n\n==================================================\n")
  cat("ANÁLISE COM AMOSTRA:", nome_amostra, "\n")
  cat("Tamanho de registro:", tamanho_registro, "| Tamanho de processos:", tamanho_processos, "\n")
  cat("==================================================\n\n")
  
  ######################################
  # ANÁLISE 1: BYTES ENVIADOS vs. CPU  #
  ######################################
  
  modelo1 <- lm(amostra_registro$cpuUsadoPercent ~ amostra_registro$bytesEnviados)
  
  g1 <- ggplot(amostra_registro, aes(x = bytesEnviados, y = cpuUsadoPercent)) +
    geom_point() +
    geom_smooth(method = "lm") +
    labs(title = paste("Relação entre Bytes Enviados e CPU -", nome_amostra),
         x = "Bytes Enviados", y = "CPU Usado (%)") +
    theme_minimal()
  
  retas <- g1 +
    geom_hline(yintercept = mean(amostra_registro$cpuUsadoPercent))  
  
  reta_erros_media <- retas + geom_segment(aes(
    x = bytesEnviados, y = cpuUsadoPercent, 
    xend = bytesEnviados, yend = mean(cpuUsadoPercent)), color="red") 
  
  reta_erros_regressao <- retas +
    geom_segment(aes(x = bytesEnviados, y = cpuUsadoPercent, xend = bytesEnviados, 
                     yend = predict(lm(cpuUsadoPercent ~ bytesEnviados))),
                 color="red")
  
  graficos$bytes_cpu <- g1
  retas_erros_media$bytes_cpu <- reta_erros_media
  retas_erros_regressao$bytes_cpu <- reta_erros_regressao
  
  SQt = sum((mean(amostra_registro$cpuUsadoPercent) - amostra_registro$cpuUsadoPercent)**2) # soma total dos quadrados
  SQres = sum((predict(modelo1) - amostra_registro$cpuUsadoPercent)**2) # regressão da soma quadrada
  r2_1 = (SQt - SQres) / SQt
  resultados_r2$`Bytes Enviados vs CPU` <- r2_1
  
  cat("ANÁLISE 1: BYTES ENVIADOS vs. CPU\n")
  cat("R² do modelo:", r2_1, "\n\n")
  
  ##############################################
  # ANÁLISE 2: QUANTIDADE DE PROCESSOS vs. RAM #
  ##############################################
  
  modelo2 <- lm(amostra_registro$ramUsadoPercent ~ amostra_registro$qtdProcessos)
  
  g2 <- ggplot(amostra_registro, aes(x = qtdProcessos, y = ramUsadoPercent)) +
    geom_point() +
    geom_smooth(method = "lm") +
    labs(title = paste("Relação entre Quantidade de Processos e RAM -", nome_amostra),
         x = "Quantidade de Processos", y = "RAM Usada (%)") +
    theme_minimal()
  
  retas <- g2 +
    geom_hline(yintercept = mean(amostra_registro$ramUsadoPercent))  
  
  reta_erros_media <- retas + geom_segment(aes(
    x = qtdProcessos, y = ramUsadoPercent, 
    xend = qtdProcessos, yend = mean(ramUsadoPercent)), color="red") 
  
  reta_erros_regressao <- retas +
    geom_segment(aes(x = qtdProcessos, y = ramUsadoPercent, xend = qtdProcessos, 
                     yend = predict(lm(ramUsadoPercent ~ qtdProcessos))), color="red")
  
  graficos$processos_ram <- g2
  retas_erros_media$processos_ram <- reta_erros_media
  retas_erros_regressao$processos_ram <- reta_erros_regressao
  
  SQt = sum((mean(amostra_registro$ramUsadoPercent) - amostra_registro$ramUsadoPercent)**2) # soma total dos quadrados
  SQres = sum((predict(modelo2) - amostra_registro$ramUsadoPercent)**2) # regressão da soma quadrada
  r2_2 = (SQt - SQres) / SQt
  resultados_r2$`Qtd Processos vs RAM` <- r2_2
  
  cat("ANÁLISE 2: QUANTIDADE DE PROCESSOS vs. RAM\n")
  cat("R² do modelo:", r2_2, "\n\n")
  
  #######################################
  # ANÁLISE 3: PYTHON CPU vs. CPU TOTAL #
  #######################################
  
  python_dados <- amostra_processos[amostra_processos$nome == "python.exe" & 
                                      amostra_processos$tipoProcesso == "CPU", ]
    dados_python <- data.frame(
      idRegistro = python_dados$idRegistro,
      pythonCPU = python_dados$cpuPercent
    )
    
    dados_combinados <- merge(amostra_registro, dados_python, by="idRegistro")
    
    modelo3 <- lm(dados_combinados$cpuUsadoPercent ~ dados_combinados$pythonCPU)
    
    g3 <- ggplot(dados_combinados, aes(x = pythonCPU, y = cpuUsadoPercent)) +
      geom_point() +
      geom_smooth(method = "lm") +
      labs(title = paste("Impacto do Python no Consumo Total de CPU -", nome_amostra),
            x = "CPU usado por Python (%)", y = "CPU Total do Sistema (%)") +
      theme_minimal()
    
    retas <- g3 +
      geom_hline(yintercept = mean(dados_combinados$cpuUsadoPercent))  
    
    reta_erros_media <- retas + geom_segment(aes(
      x = pythonCPU, y = cpuUsadoPercent, 
      xend = pythonCPU, yend = mean(cpuUsadoPercent)), color="red") 
    
    reta_erros_regressao <- retas +
      geom_segment(aes(x = pythonCPU, y = cpuUsadoPercent, xend = pythonCPU, 
                       yend = predict(lm(cpuUsadoPercent ~ pythonCPU))), color="red")
      
    graficos$python_cpu <- g3
    retas_erros_media$python_cpu <- reta_erros_media
    retas_erros_regressao$python_cpu <- reta_erros_regressao
    
    SQt = sum((mean(dados_combinados$cpuUsadoPercent) - dados_combinados$cpuUsadoPercent)**2) # soma total dos quadrados
    SQres = sum((predict(modelo3) - dados_combinados$cpuUsadoPercent)**2) # regressão da soma quadrada
    r2_3 = (SQt - SQres) / SQt
    resultados_r2$`Python CPU vs CPU Total` <- r2_3
      
    cat("ANÁLISE 3: PYTHON CPU vs. CPU TOTAL\n")
    cat("R² do modelo:", r2_3, "\n\n")

  
  ######################################
  # ANÁLISE 4: BRAVE CPU vs. CPU TOTAL #
  ######################################
  
  brave_dados <- amostra_processos[amostra_processos$nome == "brave.exe" & 
                                     amostra_processos$tipoProcesso == "CPU", ]
    brave_agrupado <- aggregate(cpuPercent ~ idRegistro, 
                                data = brave_dados, 
                                FUN = sum)
    
    names(brave_agrupado) <- c("idRegistro", "braveCPU")
    
    dados_brave <- merge(amostra_registro, brave_agrupado, by="idRegistro")
    
    modelo4 <- lm(dados_brave$cpuUsadoPercent ~ dados_brave$braveCPU)
    
    g4 <- ggplot(dados_brave, aes(x = braveCPU, y = cpuUsadoPercent)) +
      geom_point() +
      geom_smooth(method = "lm") +
      labs(title = paste("Impacto do Brave no Consumo Total de CPU -", nome_amostra),
          x = "CPU usado por Brave (%)", y = "CPU Total do Sistema (%)") +
      theme_minimal()
    
    retas <- g4 +
      geom_hline(yintercept = mean(dados_brave$cpuUsadoPercent))  
    
    reta_erros_media <- retas + geom_segment(aes(
      x = braveCPU, y = cpuUsadoPercent, 
      xend = braveCPU, yend = mean(cpuUsadoPercent)), color="red") 
    
    reta_erros_regressao <- retas +
      geom_segment(aes(x = braveCPU, y = cpuUsadoPercent, xend = braveCPU, yend = predict(lm(cpuUsadoPercent ~ braveCPU))), color="red")
    
    graficos$brave_cpu <- g4
    retas_erros_media$brave_cpu <- reta_erros_media
    retas_erros_regressao$brave_cpu <- reta_erros_regressao
    
    SQt = sum((mean(dados_brave$cpuUsadoPercent) - dados_brave$cpuUsadoPercent)**2) # soma total dos quadrados
    SQres = sum((predict(modelo4) - dados_brave$cpuUsadoPercent)**2) # regressão da soma quadrada
    r2_4 = (SQt - SQres) / SQt
    resultados_r2$`BRAVE CPU vs CPU TOTAL` <- r2_4
      
    cat("ANÁLISE 4: BRAVE CPU vs. CPU TOTAL\n")
    cat("R² do modelo:", r2_4, "\n\n")
  
  ############################
  # ANÁLISE 5: TEMPO vs. RAM #
  ############################
  
  amostra_registro$tempo_seq <- 1:nrow(amostra_registro)
  
  modelo5 <- lm(amostra_registro$ramUsadoPercent ~ amostra_registro$tempo_seq)
  
  g5 <- ggplot(amostra_registro, aes(x = tempo_seq, y = ramUsadoPercent)) +
    geom_point() +
    geom_smooth(method = "lm") +
    labs(title = paste("Evolução do Uso de RAM ao Longo do Tempo -", nome_amostra),
         x = "Sequência Temporal", y = "RAM Usada (%)") +
    theme_minimal()
  
  retas <- g5 +
    geom_hline(yintercept = mean(amostra_registro$ramUsadoPercent))  
  
  reta_erros_media <- retas + geom_segment(aes(
    x = tempo_seq, y = ramUsadoPercent, 
    xend = tempo_seq, yend = mean(ramUsadoPercent)), color="red") 
  
  reta_erros_regressao <- retas +
    geom_segment(aes(x = tempo_seq, y = ramUsadoPercent, xend = tempo_seq, 
    yend = predict(lm(ramUsadoPercent ~ tempo_seq))), color="red")
  
  graficos$tempo_ram <- g5
  retas_erros_media$tempo_ram <- reta_erros_media
  retas_erros_regressao$tempo_ram <- reta_erros_regressao
  
  SQt = sum((mean(amostra_registro$ramUsadoPercent) - amostra_registro$ramUsadoPercent)**2) # soma total dos quadrados
  SQres = sum((predict(modelo5) - amostra_registro$ramUsadoPercent)**2) # regressão da soma quadrada
  r2_5 = (SQt - SQres) / SQt
  resultados_r2$`Tempo vs RAM` <- r2_5
  
  cat("ANÁLISE 5: TEMPO vs. RAM\n")
  cat("R² do modelo:", r2_5, "\n\n")
  
  return(list(resultados_r2 = resultados_r2, graficos = graficos, retas_erros_media = retas_erros_media, retas_erros_regressao = retas_erros_regressao))
}

resultados_pequena <- executar_analises(dados_registro, dados_processos, 20, 200, "pequena")
resultados_media <- executar_analises(dados_registro, dados_processos, 200, 2000, "media")
resultados_completa <- executar_analises(dados_registro, dados_processos, nrow(dados_registro), nrow(dados_processos), "completa")


graficos_amostra_pequena <- resultados_pequena$graficos
graficos_amostra_media <- resultados_media$graficos
graficos_amostra_completa <- resultados_completa$graficos

# Gráficos com regressão linear de uso de cpu em função do envio de bytes
graficos_amostra_pequena$bytes_cpu
graficos_amostra_media$bytes_cpu
graficos_amostra_completa$bytes_cpu

# Gráficos com regressão linear de uso de ram em função da qtd de processos
graficos_amostra_pequena$processos_ram
graficos_amostra_media$processos_ram
graficos_amostra_completa$processos_ram

# Gráficos com regressão linear de uso de cpu do python em função da cpu total do sistema
graficos_amostra_pequena$python_cpu
graficos_amostra_media$python_cpu
graficos_amostra_completa$python_cpu

# Gráficos com regressão linear de uso de cpu do brave em função da cpu total do sistema
graficos_amostra_pequena$brave_cpu
graficos_amostra_media$brave_cpu
graficos_amostra_completa$brave_cpu

# Gráficos com regressão linear de uso de ram em função do tempo
graficos_amostra_pequena$tempo_ram
graficos_amostra_media$tempo_ram
graficos_amostra_completa$tempo_ram

retas_erros_media_amostra_pequena <- resultados_pequena$retas_erros_media
retas_erros_media_amostra_media <- resultados_media$retas_erros_media
retas_erros_media_amostra_completa <- resultados_completa$retas_erros_media
retas_erros_regressao_amostra_pequena <- resultados_pequena$retas_erros_regressao
retas_erros_regressao_amostra_media <- resultados_media$retas_erros_regressao
retas_erros_regressao_amostra_completa <- resultados_completa$retas_erros_regressao


# Gráficos com regressão linear de uso de cpu em função do envio de bytes
retas_erros_media_amostra_pequena$bytes_cpu
retas_erros_regressao_amostra_pequena$bytes_cpu

retas_erros_media_amostra_media$bytes_cpu
retas_erros_regressao_amostra_media$bytes_cpu

retas_erros_media_amostra_completa$bytes_cpu
retas_erros_regressao_amostra_completa$bytes_cpu

# Gráficos com regressão linear de uso de ram em função da qtd de processos
retas_erros_media_amostra_pequena$processos_ram
retas_erros_regressao_amostra_pequena$processos_ram

retas_erros_media_amostra_media$processos_ram
retas_erros_regressao_amostra_media$processos_ram

retas_erros_media_amostra_completa$processos_ram
retas_erros_regressao_amostra_completa$processos_ram

# Gráficos com regressão linear de uso de cpu do python em função da cpu total do sistema
retas_erros_media_amostra_pequena$python_cpu
retas_erros_regressao_amostra_pequena$python_cpu

retas_erros_media_amostra_media$python_cpu
retas_erros_regressao_amostra_media$python_cpu

retas_erros_media_amostra_completa$python_cpu
retas_erros_regressao_amostra_completa$python_cpu

# Gráficos com regressão linear de uso de cpu do brave em função da cpu total do sistema
retas_erros_media_amostra_pequena$brave_cpu
retas_erros_regressao_amostra_pequena$brave_cpu

retas_erros_media_amostra_media$brave_cpu
retas_erros_regressao_amostra_media$brave_cpu

retas_erros_media_amostra_completa$brave_cpu
retas_erros_regressao_amostra_completa$brave_cpu

# Gráficos com regressão linear de uso de ram em função do tempo
retas_erros_media_amostra_pequena$tempo_ram
retas_erros_regressao_amostra_pequena$tempo_ram

retas_erros_media_amostra_media$tempo_ram
retas_erros_regressao_amostra_media$tempo_ram

retas_erros_media_amostra_completa$tempo_ram
retas_erros_regressao_amostra_completa$tempo_ram


resultados_pequena <- resultados_pequena$resultados_r2
resultados_media <- resultados_media$resultados_r2
resultados_completa <- resultados_completa$resultados_r2



resultados_comparativos <- data.frame(
  Analise = names(resultados_pequena),
  Pequena = unlist(resultados_pequena),
  Media = unlist(resultados_media),
  Completa = unlist(resultados_completa)
)
names(resultados_pequena)
resultados_comparativos
