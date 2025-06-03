package br.com.sptech.school;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Stock {

    @JsonProperty("servidor")
    private String servidor;

    @JsonProperty("data_hora")
    private String dataHora;

    @JsonProperty("percentualCPU")
    private double percentualCPU;

    @JsonProperty("frequenciaCPU")
    private double frequenciaCPU;

    @JsonProperty("percentualRAM")
    private double percentualRAM;

    @JsonProperty("memoriaUsadaGB")
    private double memoriaUsadaGB;

    @JsonProperty("percentualDisco")
    private double percentualDisco;

    @JsonProperty("discoUsadoGB")
    private double discoUsadoGB;

    @JsonProperty("velocidadeDownloadMbps")
    private double velocidadeDownloadMbps;

    @JsonProperty("velocidadeUploadMbps")
    private double velocidadeUploadMbps;

    @JsonProperty("tempoAtivo")
    private String tempoAtivo;

    @JsonProperty("pid")
    private int pid;

    @JsonProperty("name")
    private String name;

    @JsonProperty("cpu_percent")
    private double cpuPercent;

    @JsonProperty("ram_percent")
    private double ramPercent;

    @JsonProperty("grupo")
    private String grupo;

    // Getters e Setters

    public String getServidor() {
        if (servidor != null) {
            Pattern pattern = Pattern.compile("\\s+(\\d+)");
            Matcher matcher = pattern.matcher(servidor);

            if (matcher.find()) {
                return matcher.group(1); // Retorna apenas o número
            }
        }
        return servidor; // Retorna o valor original se não encontrar o padrão
    }
    public void setServidor(String servidor) {
        this.servidor = servidor;
    }

    public String getDataHora() {
        return dataHora;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public double getPercentualCPU() {
        return percentualCPU;
    }

    public void setPercentualCPU(double percentualCPU) {
        this.percentualCPU = percentualCPU;
    }

    public double getFrequenciaCPU() {
        return frequenciaCPU;
    }

    public void setFrequenciaCPU(double frequenciaCPU) {
        this.frequenciaCPU = frequenciaCPU;
    }

    public double getPercentualRAM() {
        return percentualRAM;
    }

    public void setPercentualRAM(double percentualRAM) {
        this.percentualRAM = percentualRAM;
    }

    public double getMemoriaUsadaGB() {
        return memoriaUsadaGB;
    }

    public void setMemoriaUsadaGB(double memoriaUsadaGB) {
        this.memoriaUsadaGB = memoriaUsadaGB;
    }

    public double getPercentualDisco() {
        return percentualDisco;
    }

    public void setPercentualDisco(double percentualDisco) {
        this.percentualDisco = percentualDisco;
    }

    public double getDiscoUsadoGB() {
        return discoUsadoGB;
    }

    public void setDiscoUsadoGB(double discoUsadoGB) {
        this.discoUsadoGB = discoUsadoGB;
    }

    public double getVelocidadeDownloadMbps() {
        return velocidadeDownloadMbps;
    }

    public void setVelocidadeDownloadMbps(double velocidadeDownloadMbps) {
        this.velocidadeDownloadMbps = velocidadeDownloadMbps;
    }

    public double getVelocidadeUploadMbps() {
        return velocidadeUploadMbps;
    }

    public void setVelocidadeUploadMbps(double velocidadeUploadMbps) {
        this.velocidadeUploadMbps = velocidadeUploadMbps;
    }

    public String getTempoAtivo() {
        return tempoAtivo;
    }

    public void setTempoAtivo(String tempoAtivo) {
        this.tempoAtivo = tempoAtivo;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCpuPercent() {
        return cpuPercent;
    }

    public void setCpuPercent(double cpuPercent) {
        this.cpuPercent = cpuPercent;
    }

    public double getRamPercent() {
        return ramPercent;
    }

    public void setRamPercent(double ramPercent) {
        this.ramPercent = ramPercent;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
}