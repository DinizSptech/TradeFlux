package org.example;

import java.lang.reflect.Array;
import java.util.List;

public class Ordenadores {

    public static void ordenarNome(List<Servidor>  server){
        for(int i = 0; i < server.size()-1; i++){
            for(int j= i+1; j < server.size(); j++)
                if(server.get(i).getNome().compareTo(server.get(j).getNome()) > 0){
                    Servidor aux = server.get(i);
                    server.set(i, server.get(j));
                    server.set(j, aux);
                }
        }
    }

    public static void ordenarDisk(List<Servidor> server){
        for(int i = 0; i < server.size()-1; i++){
            for(int j= i+1; j < server.size(); j++)
                if(server.get(i).getDisk() > server.get(j).getDisk()){
                    Servidor aux = server.get(i);
                    server.set(i, server.get(j));
                    server.set(j, aux);
                }
        }
    }

    public static void ordenarRam(List<Servidor> server){
        for(int i = 0; i < server.size()-1; i++){
            for(int j= i+1; j < server.size(); j++)
                if(server.get(i).getRam() > server.get(j).getRam()){
                    Servidor aux = server.get(i);
                    server.set(i, server.get(j));
                    server.set(j, aux);
                }
        }
    }

}
