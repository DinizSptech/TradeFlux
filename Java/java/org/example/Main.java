package org.example;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        List<Servidor> servers = new ArrayList<>();


        servers.add(new Servidor("AMD EPYC 7452", 24, 1000, "Debian 10", "Servidor 3"));
        servers.add(new Servidor("Xeon Gold 6248R", 20, 1200, "Red Hat Enterprise Linux 8", "Servidor 6"));
        servers.add(new Servidor("Intel Xeon E5-2670", 16, 500, "CentOS 7", "Servidor 2"));
        servers.add(new Servidor("Intel Xeon E3-1270 v6", 8, 200, "Windows Server 2022", "Servidor 9"));
        servers.add(new Servidor("AMD EPYC 7742", 64, 2000, "Ubuntu Server 20.04", "Servidor 8"));
        servers.add(new Servidor("Xeon v34h", 12, 250, "Linux Ubuntu Server 22.04", "Servidor 1"));
        servers.add(new Servidor("Intel Xeon Platinum 8280", 28, 1500, "SUSE Linux Enterprise Server 15", "Servidor 7"));
        servers.add(new Servidor("Intel Core i9-10900K", 10, 300, "Windows Server 2019", "Servidor 4"));
        servers.add(new Servidor("AMD Ryzen 9 5950X", 16, 750, "Fedora 34", "Servidor 5"));


        Ordenadores.ordenarNome(servers);

        System.out.println("Ordenação por Nome:");
        System.out.println(servers.toString());

        Ordenadores.ordenarDisk(servers);
        System.out.println("Ordenação por Disk:");
        System.out.println(servers.toString());

        Ordenadores.ordenarRam(servers);
        System.out.println("Ordenação por memória Ram:");
        System.out.println(servers.toString());




    }
}