package br.com.sptech.school;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

public class Main implements RequestHandler<S3Event, String> {

    // Criação do cliente S3 para acessar os buckets
    private final AmazonS3 s3Client = AmazonS3ClientBuilder.defaultClient();

    // Bucket de destino para o CSV gerado
    private static final String DESTINATION_BUCKET = "bucket-trusted-tradeflux-123";

    @Override
    public String handleRequest(S3Event s3Event, Context context) {

        // Extraímos o nome do bucket de origem e a chave do arquivo JSON
        String sourceBucket = s3Event.getRecords().get(0).getS3().getBucket().getName();
        String sourceKey = s3Event.getRecords().get(0).getS3().getObject().getKey();

        try {
            // Leitura do arquivo JSON do bucket de origem
            InputStream s3InputStream = s3Client.getObject(sourceBucket, sourceKey).getObjectContent();

            // Conversão do JSON para uma lista de objetos Stock usando o Mapper
            Mapper mapper = new Mapper();
            List<Stock> stocks = mapper.map(s3InputStream);

            // Geração do arquivo CSV a partir da lista de Stock usando o CsvWriter
            CsvWriter csvWriter = new CsvWriter();

            // Gerar CSV de dados gerais
            ByteArrayOutputStream csvOutputStream = csvWriter.writeCsv(stocks);
            byte[] csvBytes = csvOutputStream.toByteArray();
            InputStream csvInputStream = new ByteArrayInputStream(csvBytes);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(csvBytes.length);
            metadata.setContentType("text/csv");

            String fileName = sourceKey.substring(sourceKey.lastIndexOf('/') + 1); // extrai só o nome do arquivo
            String destinationKeyAmanda = "Datacenter1Amanda/" + fileName.replace(".json", ".csv");
            String destinationKeyIsrael = "Datacenter1Israel/" + fileName.replace(".json", ".csv");

            // Envia o CSV de dados gerais
            s3Client.putObject(DESTINATION_BUCKET, destinationKeyAmanda, csvInputStream, metadata);
            context.getLogger().log("CSV de dados gerais enviado para: " + destinationKeyAmanda);

            s3Client.putObject(DESTINATION_BUCKET, destinationKeyIsrael, csvInputStream, metadata);
            context.getLogger().log("CSV de dados gerais enviado para: " + destinationKeyIsrael);

            // Gerar CSV de dados com processos
            ByteArrayOutputStream csvProcessOutputStream = csvWriter.writeCsvComProcessos(stocks);
            byte[] csvProcessBytes = csvProcessOutputStream.toByteArray();
            InputStream csvProcessInputStream = new ByteArrayInputStream(csvProcessBytes);

            ObjectMetadata processMetadata = new ObjectMetadata();
            processMetadata.setContentLength(csvProcessBytes.length);
            processMetadata.setContentType("text/csv");

            String destinoProcesso = "Datacenter1/" + fileName.replace(".json", "_processos.csv");

            // Envia o CSV de dados com processos
            s3Client.putObject(DESTINATION_BUCKET, destinoProcesso, csvProcessInputStream, processMetadata);
            context.getLogger().log("CSV de dados com processos enviado para: " + destinoProcesso);

            return "Sucesso no processamento";
        } catch (Exception e) {
            // Tratamento de erros e log do contexto em caso de exceção
            context.getLogger().log("Erro: " + e.getMessage());
            return "Erro no processamento";
        }
    }

}