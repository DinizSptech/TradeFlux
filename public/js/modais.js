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

  function renderizarModalUsuario(){
    main_page.innerHTML += `<div class="container_perfil" id="modal_perfil">
      <i class="fa-solid fa-bell" onclick="abrirModal('notificacoes')"></i>
      <span class="barraVertical"></span>
      <div class="button_perfil" onclick="abrirModal('perfil')">
        <i class="fa-solid fa-circle-user"></i>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
    <div class="container_tabela_notificacoes" id="tabela_notificacoes">
      <div class="wrapper">

        <span>Alerta 1</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
        <span>Alerta 2</span>
      </div>
    </div>
    <div class="container_perfil_opcoes" id="perfil_opcoes">
      <span onclick="abrirModal('perfil_completo')">Perfil</span>
      <span onclick="sairParaLogin()">Sair</span>
    </div>
    <div class="bg_modal_perfil_completo" id="bg_modal_perfil_completo">
      <div class="container_perfil_completo" id="div_perfil_completo">
        <div class="perfil_conteudo">
          <i class="fa-solid fa-circle-user" id="circulo_usuario"></i>
          <div class="div_informacoes" id="seta_usuario">
            <span class="spn_perfil spn_perfil_nome">Tobias Maria Roberto</span>
            <span class="spn_perfil">Administrador</span>
            <span class="spn_perfil">B3</span>
          </div>
        </div>
        <span class="btn_fechar_perfil" onclick="fecharModal('perfil_completo')">Fechar</span>
      </div>
    </div>`
  }