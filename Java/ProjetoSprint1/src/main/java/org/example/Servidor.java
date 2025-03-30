package org.example;

public class Servidor {

    private String cpu;
    private String nome;
    private Integer ram;
    private Integer disk;
    private String so;

    @Override
    public String toString() {
        return "\n Servidores{" +
                "cpu='" + cpu + '\'' +
                ", nome='" + nome + '\'' +
                ", ram=" + ram +
                ", disk=" + disk +
                ", so='" + so + '\'' +
                '}';
    }

    public Servidor(String cpu, Integer ram, Integer disk, String so, String nome) {
        this.cpu = cpu;
        this.ram = ram;
        this.disk = disk;
        this.so = so;
        this.nome = nome;
    }

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public Integer getRam() {
        return ram;
    }

    public void setRam(Integer ram) {
        this.ram = ram;
    }

    public Integer getDisk() {
        return disk;
    }

    public void setDisk(Integer disk) {
        this.disk = disk;
    }

    public String getSo() {
        return so;
    }

    public void setSo(String so) {
        this.so = so;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }



}

