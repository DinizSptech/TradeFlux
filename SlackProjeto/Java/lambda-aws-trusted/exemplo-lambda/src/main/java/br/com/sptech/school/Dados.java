// Dados.java
package br.com.sptech.school;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Dados {

    @JsonProperty("Momento")
    private String momento;

    @JsonProperty("ram")
    private double percentualRAM;

    @JsonProperty("cpu")
    private double percentualCPU;

    @JsonProperty("disco")
    private double percentualDisco;

    @JsonProperty("download")
    private double velocidadeDownloadMbps;

    @JsonProperty("upload")
    private double velocidadeUploadMbps;

    @JsonProperty("ram_gb")
    private double memoriaUsadaGB;

    @JsonProperty("cpu_freq")
    private double frequenciaCPU;

    @JsonProperty("disco_gb")
    private double discoUsadoGB;

    @JsonProperty("tempo_ativo")
    private String tempoAtivo;

    @JsonProperty("processos")
    private List<Processo> processos;

    public String getMomento() {
        return momento;
    }

    public void setMomento(String momento) {
        this.momento = momento;
    }

    public double getPercentualRAM() {
        return percentualRAM;
    }

    public void setPercentualRAM(double percentualRAM) {
        this.percentualRAM = percentualRAM;
    }

    public double getPercentualCPU() {
        return percentualCPU;
    }

    public void setPercentualCPU(double percentualCPU) {
        this.percentualCPU = percentualCPU;
    }

    public double getPercentualDisco() {
        return percentualDisco;
    }

    public void setPercentualDisco(double percentualDisco) {
        this.percentualDisco = percentualDisco;
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

    public double getMemoriaUsadaGB() {
        return memoriaUsadaGB;
    }

    public void setMemoriaUsadaGB(double memoriaUsadaGB) {
        this.memoriaUsadaGB = memoriaUsadaGB;
    }

    public double getFrequenciaCPU() {
        return frequenciaCPU;
    }

    public void setFrequenciaCPU(double frequenciaCPU) {
        this.frequenciaCPU = frequenciaCPU;
    }

    public double getDiscoUsadoGB() {
        return discoUsadoGB;
    }

    public void setDiscoUsadoGB(double discoUsadoGB) {
        this.discoUsadoGB = discoUsadoGB;
    }

    public String getTempoAtivo() {
        return tempoAtivo;
    }

    public void setTempoAtivo(String tempoAtivo) {
        this.tempoAtivo = tempoAtivo;
    }

    public List<Processo> getProcessos() {
        return processos;
    }

    public void setProcessos(List<Processo> processos) {
        this.processos = processos;
    }
}
