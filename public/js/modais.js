var status_perfil = "fechado";
var status_alerta = "fechado";
function abrirModal(tipo) {
  if (tipo == "cadastro") {
    bg_formulario.style.display = "flex";
  } else if (tipo == "edicao") {
    bg_formulario_edicao.style.display = "flex";
  } else if (tipo == 'exclusao'){
    bg_formulario_exclusao.style.display = "flex";
  }
   else if (tipo == "perfil" && status_perfil == "fechado") {
    status_perfil = "aberto";
    perfil_opcoes.style.display = "flex";
    status_alerta = "fechado";
    tabela_notificacoes.style.display = "none";
  } else if (tipo == "perfil" && status_perfil == "aberto") {
    status_perfil = "fechado";
    perfil_opcoes.style.display = "none";
  } else if (tipo == "perfil_completo") {
    status_perfil = "fechado";
    perfil_opcoes.style.display = "none";
    bg_modal_perfil_completo.style.display = "flex";
  } else if (tipo == "notificacoes" && status_alerta == "fechado") {
    status_alerta = "aberto";
    tabela_notificacoes.style.display = "flex";
    status_perfil = "fechado";
    perfil_opcoes.style.display = "none";
  } else if (tipo == "notificacoes" && status_alerta == "aberto") {
    status_alerta = "fechado";
    tabela_notificacoes.style.display = "none";
  } else if (tipo == "perfil_completo") {
    status_perfil = "fechado";
    perfil_opcoes.style.display = "none";
    bg_modal_perfil_completo.style.display = "flex";
  } else if (tipo == "datacenters") {
    status_perfil = "fechado";
    perfil_opcoes.style.display = "none";
    bgModalDatacenters.style.display = "flex";
  }
}
function fecharModal(tipo) {
  if (tipo == "cadastro") {
    bg_formulario.style.display = "none";
  } else if (tipo == "edicao") {
    bg_formulario_edicao.style.display = "none";
  } else if (tipo == "exclusao") {
    bg_formulario_exclusao.style.display = "none";
  }
   else if (tipo == "perfil_completo") {
    bg_modal_perfil_completo.style.display = "none";
  }
   else if (tipo == "datacenters") {
    bgModalDatacenters.style.display = "none";
  }
}

function renderizarModalUsuario() {
  var botaoDatacenters = ``
  var modalDatacenters = ``
  var idDatacenter = sessionStorage.getItem('Datacenter')
  console.log("Id do datacenter atual: ", idDatacenter)
  console.log("Tipagem do ID: ", typeof idDatacenter)
  var estilizacaoOpcoes = `
        <span  onclick="escolherDatacenter('1')" class='opcao_datacenter selecionado'>Datacenter 1 - Selecionado</span>
        <span  onclick="escolherDatacenter('2')" class='opcao_datacenter'>Datacenter 2</span>
        <span  onclick="escolherDatacenter('3')" class='opcao_datacenter'>Datacenter 3</span>
  `
  if (idDatacenter == "2") {
    estilizacaoOpcoes = `
        <span onclick="escolherDatacenter('1')" class='opcao_datacenter'>Datacenter 1</span>
        <span onclick="escolherDatacenter('2')" class='opcao_datacenter selecionado'>Datacenter 2 - Selecionado</span>
        <span onclick="escolherDatacenter('3')" class='opcao_datacenter'>Datacenter 3</span>
    `
  } else if (idDatacenter == "3") {
    estilizacaoOpcoes = `
        <span onclick="escolherDatacenter('1')" class='opcao_datacenter'>Datacenter 1</span>
        <span onclick="escolherDatacenter('2')" class='opcao_datacenter'>Datacenter 2</span>
        <span onclick="escolherDatacenter('3')" class='opcao_datacenter selecionado'>Datacenter 3 - Selecionado</span>
    `
  }
  if (sessionStorage.getItem('ID_USUARIO') == 1 && sessionStorage.getItem('Cargo') == 'administrador') {
    botaoDatacenters = `<span onclick="abrirModal('datacenters')">Datacenters</span>`
    modalDatacenters = `<div id='bgModalDatacenters' class='bg_modal_perfil_completo'>
      <div class='modal_datacenters'>
        ${estilizacaoOpcoes}
      </div>
    </div>`
  }
  sistema_modais.innerHTML += `<div class="container_perfil" id="modal_perfil">
      <i class="fa-solid fa-bell" onclick="abrirModal('notificacoes')"></i>
      <span class="barraVertical"></span>
      <div class="button_perfil" onclick="abrirModal('perfil')">
      <img id="rogerioCientista" style="display: none; border-radius: 50%;" src="../assets/icons_protopersonas/rogerioCientista.png" alt="" height="70"/>
      <img id="jenniferADM"      style="display: none; border-radius: 50%;" src="../assets/icons_protopersonas/jenniferADM.png" alt="" height="60"/>
      <img id="juliaAnalista"    style="display: none; border-radius: 50%;" src="../assets/icons_protopersonas/juliaAnalista.png" alt="" height="55"/>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
    <div class="container_tabela_notificacoes" id="tabela_notificacoes">
      <div class="wrapper">

        <span>Alerta Atenção - RAM - Servidor 1 - 11/04/2025 10:12:01</span>
        <span>ALERTA CRÍTICO - CPU - Servidor 3 - 11/04/2025 09:47:02</span>
        <span>Alerta Atenção - DISCO - Servidor 1 - 10/04/2025 18:32:10</span>
        <span>ALERTA CRÍTICO - CPU - Servidor 2 - 10/04/2025 15:14:04</span>
        <span>Alerta Atenção - RAM - Servidor 3 - 09/04/2025 12:05:02</span>
      </div>
    </div>
    <div class="container_perfil_opcoes" id="perfil_opcoes">
      <span onclick="abrirModal('perfil_completo')">Perfil</span>
      ${botaoDatacenters}
      <span onclick="sairParaLogin()">Sair</span>
    </div>
    <div class="bg_modal_perfil_completo" id="bg_modal_perfil_completo">
      <div class="container_perfil_completo" id="div_perfil_completo">
        <div class="perfil_conteudo">
          <i class="fa-solid fa-circle-user" id="circulo_usuario"></i>
          <div class="div_informacoes" id="seta_usuario">
            <span id="nome_usuario" class="spn_perfil spn_perfil_nome">Tobias Maria Roberto</span>
            <span id="cargo_usuario"class="spn_perfil">Administrador</span>
            <span class="spn_perfil">B3</span>
          </div>
        </div>
        <span class="btn_fechar_perfil" onclick="fecharModal('perfil_completo')">Fechar</span>
      </div>
    </div>
    ${modalDatacenters}
    `;
  nome_usuario = document.getElementById("nome_usuario");
  cargo_usuario = document.getElementById("cargo_usuario");

  nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
  cargo_usuario.innerHTML = sessionStorage.Cargo;


  const cargo = sessionStorage.getItem("Cargo");

  console.log(cargo);

  if (cargo == "cientista") {
    document.getElementById("rogerioCientista").style.display = "block";
  } else if (cargo == "analista") {
    document.getElementById("juliaAnalista").style.display = "block";
  } else if (cargo == "administrador") {
    document.getElementById("jenniferADM").style.display = "block";
  }
}

function escolherDatacenter(data_center){
  
  if (data_center == sessionStorage.getItem('Datacenter')) {
    fecharModal('datacenters')
    return
  } 
  sessionStorage.setItem('Datacenter', data_center);
  console.log("Datacenter alterado para:", sessionStorage.getItem('Datacenter'));
  window.location.reload()
}