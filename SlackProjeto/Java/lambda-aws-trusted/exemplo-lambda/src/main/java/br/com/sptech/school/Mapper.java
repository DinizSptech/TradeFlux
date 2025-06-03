package br.com.sptech.school;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class Mapper {

    public List<Stock> map(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(inputStream);

        List<Stock> stocks = new ArrayList<>();

        // Percorre cada elemento do array principal
        for (JsonNode serverNode : rootNode) {
            String servidor = serverNode.get("servidor").asText();
            JsonNode dadosArray = serverNode.get("dados");

            // Percorre o array de dados
            for (JsonNode dadoNode : dadosArray) {
                String momento = dadoNode.get("Momento").asText();
                double ram = dadoNode.get("ram").asDouble();
                double cpu = dadoNode.get("cpu").asDouble();
                double disco = dadoNode.get("disco").asDouble();
                double download = dadoNode.get("download").asDouble();
                double upload = dadoNode.get("upload").asDouble();
                double ramGb = dadoNode.get("ram_gb").asDouble();
                double cpuFreq = dadoNode.get("cpu_freq").asDouble();
                double discoGb = dadoNode.get("disco_gb").asDouble();
                String tempoAtivo = dadoNode.get("tempoAtivo").asText();

                JsonNode processosArray = dadoNode.get("processos");

                // Percorre cada processo
                for (JsonNode processoNode : processosArray) {
                    Stock stock = new Stock();

                    // Dados do servidor
                    stock.setServidor(servidor);
                    stock.setDataHora(momento);
                    stock.setPercentualCPU(cpu);
                    stock.setFrequenciaCPU(cpuFreq);
                    stock.setPercentualRAM(ram);
                    stock.setMemoriaUsadaGB(ramGb);
                    stock.setPercentualDisco(disco);
                    stock.setDiscoUsadoGB(discoGb);
                    stock.setVelocidadeDownloadMbps(download);
                    stock.setVelocidadeUploadMbps(upload);
                    stock.setTempoAtivo(tempoAtivo);

                    // Dados do processo
                    stock.setPid(processoNode.get("pid").asInt());
                    stock.setName(processoNode.get("name").asText());
                    stock.setCpuPercent(processoNode.get("cpu_percent").asDouble());
                    stock.setRamPercent(processoNode.get("ram_percent").asDouble());
                    stock.setGrupo(processoNode.get("grupo").asText());

                    stocks.add(stock);
                }
            }
        }

        return stocks;
    }
}