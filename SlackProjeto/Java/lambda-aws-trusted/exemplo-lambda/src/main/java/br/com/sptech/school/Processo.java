package br.com.sptech.school;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Processo {

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

