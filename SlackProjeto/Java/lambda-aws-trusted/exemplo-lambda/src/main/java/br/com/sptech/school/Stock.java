package br.com.sptech.school;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Stock {

    @JsonProperty("servidor")
    private String servidor;

    @JsonProperty("dados")
    private Dados dados;

    @JsonProperty("timestamp")
    private String timestamp;

    // Getters e Setters

    public String getServidor() {
        // Aqui faz a validação se o servidor não está nulo
            if (servidor != null) {
                Pattern pattern = Pattern.compile("\\s+(\\d+)");
                Matcher matcher = pattern.matcher(servidor);

                // Aqui ele tá fazendo um regex que serve para pegar o "Servidor 10" e pegar só o 10 ao invés de tudo

                if (matcher.find()) {
                    return matcher.group(1); // Retorna apenas o número
                }
            }
            return servidor; // Retorna o valor original se não encontrar o padrão
    }

    public void setServidor(String servidor) {
        this.servidor = servidor;
    }

    public Dados getDados() {
        return dados;
    }

    public void setDados(Dados dados) {
        this.dados = dados;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
