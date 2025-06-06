package br.com.sptech.school;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CsvWriter {

    public ByteArrayOutputStream writeCsv(List<Stock> stocks) throws IOException {
        // Criar um CSV em memória utilizando ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("Servidor", "Data Hora", "CPU Percentual",
                "RAM Percentual", "Disco Percentual"));

        // Processar e escrever cada objeto no CSV
        for(Stock stock : stocks) {
            csvPrinter.printRecord(
                    stock.getServidor(),
                    stock.getDados().getMomento(),
                    stock.getDados().getPercentualCPU(),
                    stock.getDados().getPercentualRAM(),
                    stock.getDados().getPercentualDisco()
                    // Esse .getDados funciona pq ele pega o objeto Dados dentro de cada stock e dps faz o comando de cada um desses objetos
            );
        }

        // Fechar o CSV para garantir que todos os dados sejam escritos
        csvPrinter.flush();
        writer.close();

        // Retornar o ByteArrayOutputStream que contém o CSV gerado em memória
        return outputStream;
    }

    public ByteArrayOutputStream writeCsvComProcessos(List<Stock> stocks) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader(
                "Servidor", "Momento", "CPU Percentual", "CPU Frequência",
                "RAM Percentual", "Memória Usada (GB)", "Disco Percentual",
                "Disco Usado (GB)", "Velocidade Download (Mbps)", "Velocidade Upload (Mbps)",
                "Tempo Ativo", "PID", "Name", "CPU Percent", "RAM Percent", "Grupo"
        ));
        for (Stock stock : stocks) {
            Dados dados = stock.getDados();
            for (Processo processo : dados.getProcessos()) {
                csvPrinter.printRecord(
                        stock.getServidor(),
                        dados.getMomento(),
                        dados.getPercentualCPU(),
                        dados.getFrequenciaCPU(),
                        dados.getPercentualRAM(),
                        dados.getMemoriaUsadaGB(),
                        dados.getPercentualDisco(),
                        dados.getDiscoUsadoGB(),
                        dados.getVelocidadeDownloadMbps(),
                        dados.getVelocidadeUploadMbps(),
                        dados.getTempoAtivo(),
                        processo.getPid(),
                        processo.getName(),
                        processo.getCpuPercent(),
                        processo.getRamPercent(),
                        processo.getGrupo()

                        // Msm coisa que o de cima, mas pegando os processos tbm

                );
            }
        }
        csvPrinter.flush();
        writer.close();
        return outputStream;
    }

}