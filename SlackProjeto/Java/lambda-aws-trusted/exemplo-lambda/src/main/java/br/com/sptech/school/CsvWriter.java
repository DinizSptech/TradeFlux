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
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("Servidor", "Data Hora", "CPU Percentual", "CPU Frequência",
                "RAM Percentual", "Memória Usada (GB)", "Disco Percentual", "Disco Usado (GB)", "Velocidade Download (Mbps)", "Velocidade Upload (Mbps)"));

        // Processar e escrever cada objeto no CSV
        for(Stock stock : stocks) {
            csvPrinter.printRecord(
                    stock.getServidor(),
            stock.getDataHora(),
            stock.getPercentualCPU(),
            stock.getFrequenciaCPU(),
            stock.getPercentualRAM(),
            stock.getMemoriaUsadaGB(),
            stock.getPercentualDisco(),
            stock.getDiscoUsadoGB(),
            stock.getVelocidadeDownloadMbps(),
            stock.getVelocidadeUploadMbps()
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
                "Servidor", "Data Hora", "CPU Percentual", "CPU Frequência",
                "RAM Percentual", "Memória Usada (GB)", "Disco Percentual",
                "Disco Usado (GB)", "Velocidade Download (Mbps)", "Velocidade Upload (Mbps)",
                "Tempo Ativo", "PID", "Name", "CPU Percent", "RAM Percent", "Grupo"
        ));

        for (Stock stock : stocks) {
            csvPrinter.printRecord(
                    stock.getServidor(),
                    stock.getDataHora(),
                    stock.getPercentualCPU(),
                    stock.getFrequenciaCPU(),
                    stock.getPercentualRAM(),
                    stock.getMemoriaUsadaGB(),
                    stock.getPercentualDisco(),
                    stock.getDiscoUsadoGB(),
                    stock.getVelocidadeDownloadMbps(),
                    stock.getVelocidadeUploadMbps(),
                    stock.getTempoAtivo(),
                    stock.getPid(),
                    stock.getName(),
                    stock.getCpuPercent(),
                    stock.getRamPercent(),
                    stock.getGrupo()
            );
        }

        csvPrinter.flush();
        writer.close();
        return outputStream;
    }

}
