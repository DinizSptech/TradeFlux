
function entrar(){
    var usuario = IPTusuario.value;
    var senha = IPTsenha.value;

    if(usuario == "ADM" && senha =="123456"){
        
        window.location.href = "";
    }else{
        
        divERRORsenha.innerHTML = "<span>Senha ou Usuário incorretos</span>"
    }
    
    if (usuario == "analista" && senha == "123456"){
        window.location.href = "./dashboardNOQ.html"
    }else{
       divERRORsenha.innerHTML = "<span>Senha ou Usuário incorretos</span>"
    }

    if (usuario == "cientista" && senha == "123456"){
        window.location.href = ""
    }else{
       divERRORsenha.innerHTML = "<span>Senha ou Usuário incorretos</span>"
    }


}