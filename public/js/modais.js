var status_perfil = "fechado"
var status_alerta = "fechado"
function abrirModal(tipo){
    if(tipo == "cadastro"){
        bg_formulario.style.display = "flex";
    } else if(tipo == "edicao"){
        bg_formulario_edicao.style.display = "flex";
    } else if(tipo == "perfil" && status_perfil == "fechado"){
        status_perfil = "aberto"
        perfil_opcoes.style.display = "flex";
        status_alerta = "fechado"
        tabela_notificacoes.style.display = "none";
    } else if(tipo == "perfil" && status_perfil ==  "aberto"){
        status_perfil = "fechado"
        perfil_opcoes.style.display = "none";
    } else if(tipo == "perfil_completo"){
        status_perfil = "fechado"
        perfil_opcoes.style.display = "none";
        bg_modal_perfil_completo.style.display = "flex"
    } else if(tipo == "notificacoes" && status_alerta == "fechado"){
        status_alerta = "aberto"
        tabela_notificacoes.style.display = "flex";
        status_perfil = "fechado"
        perfil_opcoes.style.display = "none";
    } else if(tipo == "notificacoes" && status_alerta ==  "aberto"){
        status_alerta = "fechado"
        tabela_notificacoes.style.display = "none";
    } else if(tipo == "perfil_completo"){
        status_perfil = "fechado"
        perfil_opcoes.style.display = "none";
        bg_modal_perfil_completo.style.display = "flex"
    }

  }
  function fecharModal(tipo){
    if (tipo == "cadastro") {
        bg_formulario.style.display = "none";
    } else if(tipo == "edicao"){
        bg_formulario_edicao.style.display = "none";
    } else if(tipo == "perfil_completo"){
        bg_modal_perfil_completo.style.display = "none";
    }
  }