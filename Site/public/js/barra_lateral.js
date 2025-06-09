function toggleMenu() {
  if (window.innerWidth <= 768) {
    const menu = document.querySelector(".barra-lateral");
    menu.classList.toggle("open");
  }
  window.addEventListener("resize", function () {
    const menu = document.querySelector(".barra-lateral");
    if (window.innerWidth > 768) {
      menu.classList.remove("open");
    }
  });
}

function mudarIcone() {
  const menuIcon = document.getElementById("menu-bar");

  if (menuIcon.innerHTML === "☰") {
    menuIcon.innerHTML = "&times;";
  } else {
    menuIcon.innerHTML = "&#9776;";
  }
}

function carregarMenuLateral() {
  const cargo = sessionStorage.getItem("Cargo");
  const idUsuario = 1;
  const barralateral = document.getElementById("barralateral");

  const menuBar = document.getElementById("menu-bar");

  if (menuBar) {
    menuBar.addEventListener("click", toggleMenu);
  }

  var opcaoDatacenters = ``;

  if (idUsuario == "1" && cargo == "administrador") {
    opcaoDatacenters = `
        <a href="../pages/dash_gerente_datacenters.html">
            <div class="option" data-tooltip="Data Centers">
                <i class="fa-solid fa-network-wired"></i>
                <span>Data Centers</span>
            </div>
        </a>
        `;
  }

  console.log(cargo);
  if (cargo == "administrador") {
    barralateral.innerHTML = `
            <div class="div-logo">
                <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil">
                <span class="txtLogo">TRADEFLUX</span>
            </div>

            <span class="barraHorizontal"></span>

            <a href="./dash_adm_alertas.html">
            <div class="option selected" data-tooltip="Dashboard de Alertas">
                <i class="fa-solid fa-land-mine-on"></i>
                <span>Dashboard de Alertas</span>
            </div>
            </a>
            
            <a href="./dash_adm_custo.html">
            <div class="option selected" data-tooltip="Dashboard de Custos">
                <i class="fa-solid fa-magnifying-glass-dollar"></i>
                <span>Dashboard de Custos</span>
            </div>
            </a>

            <a href="./alertas.html">
            <div class="option" data-tooltip="Historico de Alertas">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>Histórico de Alertas</span>
            </div>
            </a>
            
            <a href="./dash_gerente_servidores.html">
            <div class="option" data-tooltip="Servidores">
                <i class="fa-solid fa-server"></i>
                <span>Servidores</span>
            </div>
            </a>
            
            <a href="./dash_gerente_componentes.html">
            <div class="option" data-tooltip="Componentes">
                <i class="fa-solid fa-gauge"></i>
                <span>Componentes</span>
            </div>
            </a>

            <a href="./dash_gerente_funcionarios.html">
            <div class="option" data-tooltip="Usuários">
                <i class="fa-solid fa-user"></i>
                <span>Usuários</span>
            </div>
            </a>

            <span class="barraHorizontal"></span>

            <div class="option" data-tooltip="Perfil de Usuário">
                <i class="fa-solid fa-address-card"></i>
                <span onclick="abrirModal('perfil_completo')"><a>Perfil</a></span>
            </div>

            <div onclick="sairParaLogin()" class="option" data-tooltip="Sair">
                <i class="fa-solid fa-door-open"></i>
                <span ><a>Sair</a></span>
            </div>
        `;
  } else if (cargo == "cientista") {
    barralateral.innerHTML = `
            <div class="div-logo">
                <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil">
                <span class="txtLogo">TRADEFLUX</span>
            </div>

            <span class="barraHorizontal"></span>

            <div class="option selected" data-tooltip="Dashboard de Alertas">
                <i class="fa-solid fa-calendar-days"></i>
                <span><a href="./dash_cientista_alertas.html">Dashboard de Alertas</a></span>
            </div>

            <div class="option selected" data-tooltip="Dashboard de Eficiência">
                <i class="fa-solid fa-arrow-trend-up"></i>
                <span><a href="./dash_cientista_eficiencia.html">Dashboard de Eficiência</a></span>
            </div>

            <div class="option selected" data-tooltip="Dashboard Comparativa">
                <i class="fa-solid fa-chart-column"></i>
                <span><a href="./dash_cientista_comparativa.html">Dashboard Comparativa</a></span>
            </div>

            <div class="option" data-tooltip="Histórico de Alertas">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span><a href="./alertas.html">Histórico de Alertas</a></span>
            </div>

            
            <span class="barraHorizontal"></span>
            
            <div class="option" data-tooltip="Perfil de Usuário">
                <i class="fa-solid fa-address-card"></i>
                <span onclick="abrirModal('perfil_completo')"><a>Perfil</a></span>
            </div>

            <div class="option" data-tooltip="Sair">
                <i class="fa-solid fa-door-open"></i>
                <span onclick="sairParaLogin()"><a>Sair</a></span>
            </div>
        `;
  } else if (cargo == "analista") {
    barralateral.innerHTML = `
            <div class="div-logo">
                <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil">
                <span class="txtLogo">TRADEFLUX</span>
            </div>

            <span class="barraHorizontal"></span>

            <div class="option selected" data-tooltip="Dashboard de Monitoramento">
                <i class="fa-solid fa-chart-line"></i>
                <span><a href="./dash_analista_monitoramento.html">Dash de Monitoramento</a></span>
            </div>

            <div class="option" data-tooltip="Histórico de Alertas">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span><a href="./alertas.html">Histórico de Alertas</a></span>
            </div>

            <span class="barraHorizontal"></span>

            <div class="option" data-tooltip="Perfil de Usuário">
                <i class="fa-solid fa-address-card"></i>
                <span onclick="abrirModal('perfil_completo')"><a>Perfil</a></span>
            </div>

            <div class="option" data-tooltip="Sair">
                <i class="fa-solid fa-door-open"></i>
                <span onclick="sairParaLogin()"><a>Sair</a></span>
            </div>
        `;
  }
}

function sairParaLogin() {
  sessionStorage.clear();
  window.location.href = "/pages/login.html";
}

function renderizarPerfilUsuario(){
  var nome = sessionStorage.getItem('NOME_USUARIO')
  var nomeUpper = nome[0].toUpperCase() + nome.substring(1)
  var cargo = sessionStorage.getItem('Cargo')
  var cargoUpper = cargo[0].toUpperCase() + cargo.substring(1)
  console.log("Perfil renderizado")
  sistema_modais.innerHTML = `
  <div class="bg_modal_perfil_completo" id="bg_modal_perfil_completo">
      <div class="container_perfil_completo" id="div_perfil_completo">
        <div class="perfil_conteudo">
          <i class="fa-solid fa-circle-user" id="circulo_usuario"></i>
          <div class="div_informacoes" id="seta_usuario">
            <span id="nome_usuario" class="spn_perfil spn_perfil_nome">${nomeUpper}</span>
            <span id="cargo_usuario"class="spn_perfil">${cargoUpper}</span>
            <span class="spn_perfil">B3</span>
          </div>
        </div>
        <span class="btn_fechar_perfil" onclick="fecharModal('perfil_completo')">Fechar</span>
      </div>
    </div>
  `
}

function abrirModal(tipo) {
  if (tipo == "perfil_completo") {
    // perfil_opcoes.style.display = "none";
    bg_modal_perfil_completo.style.display = "flex";
  }
}

function fecharModal(tipo) {
  if (tipo == "perfil_completo") {
    // perfil_opcoes.style.display = "none";
    bg_modal_perfil_completo.style.display = "none";
  }
}