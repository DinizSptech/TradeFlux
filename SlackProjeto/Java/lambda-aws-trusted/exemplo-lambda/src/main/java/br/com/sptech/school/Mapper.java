package br.com.sptech.school;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Mapper {

    public List<Stock> map(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Stock> stocks = mapper.readValue(inputStream,
                mapper.getTypeFactory().constructCollectionType(List.class, Stock.class));
        return stocks;
    }

}