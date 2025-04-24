package br.com.sptech.school;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Stock {

    @JsonProperty("data-hora")
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

    // Getters e setters
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
}
