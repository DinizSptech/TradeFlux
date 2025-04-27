
function toggleMenu() {

  if (window.innerWidth <= 768) {
    const menu = document.querySelector('.barra-lateral');
    menu.classList.toggle('open');
    
  }
  window.addEventListener('resize', function() {
    const menu = document.querySelector('.barra-lateral');
    if (window.innerWidth > 768) {
      // Se for desktop, remove a classe 'open' (se existir)
      menu.classList.remove('open');
    }
  });

}

function mudarIcone() {
  const menuIcon = document.getElementById('menu-bar');
  
  if (menuIcon.innerHTML === '☰') {
    menuIcon.innerHTML = '&times;'; 
  } else {
    menuIcon.innerHTML = '&#9776;';
  }
}


function carregarMenuLateral() {
const cargo = sessionStorage.getItem("Cargo");
const barralateral = document.getElementById("barralateral");


const menuBar = document.getElementById("menu-bar");
menuBar.addEventListener('click', toggleMenu);

console.log(cargo);
if (cargo == "administrador") {
    barralateral.innerHTML = 
    `          <div class="div-logo">
        <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil" >
        <span class="txtLogo">TRADEFLUX</span>
        </div>

        <span class="barraHorizontal"></span>

        <div class="option selected">
            <i class="fa-solid fa-chart-line"></i>
            <span><a href="./dashboard_analista.html">Dashboard Analista</a></span>
        </div>

        <div class="option selected">
            <i class="fa-solid fa-lightbulb"></i>
            <span><a href="./dashboard_Cientista.html">Dashboard Cientista</a></span>
        </div>

        <div class="option">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span><a href="./alertas.html">Alertas</a></span>
        </div>

        <div class="option">
            <i class="fa-solid fa-network-wired"></i>
            <span><a href="./dash_gerente_datacenters.html">Data centers</a></span>
        </div>

        <div class="option">
            <i class="fa-solid fa-server"></i>
            <span><a href="./dash_gerente_servidores.html">Servidores</a></span>
        </div>

        <div class="option">
            <i class="fa-solid fa-gauge"></i>
            <span><a href="./dash_gerente_componentes.html">Componentes</a></span>
        </div>

        <div class="option">
            <i class="fa-solid fa-user"></i>
            <span><a href="./dash_gerente_funcionarios.html">Usuários</a></span>
        </div>

        <div class="option">
            <i class="fa-solid fa-headset"></i>
            <span><a href="./atendimento.html">Suporte</a></span>
        </div>

        <span class="barraHorizontal"></span>

        <div class="option">
            <i class="fa-solid fa-door-open"></i>
             <span><a href="/pages/login.html">Sair</a></span>
        </div>
    `
} else if (cargo == "cientista") {
    barralateral.innerHTML = `
    <div class="div-logo">
    <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil" >
    <span class="txtLogo">TRADEFLUX</span>
    </div>

    <span class="barraHorizontal"></span>

    <div class="option selected">
        <i class="fa-solid fa-lightbulb"></i>
        <span><a href="./dashboard_Cientista.html">Dashboard Cientista</a></span>
    </div>

    <div class="option">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span><a href="./alertas.html">Alertas</a></span>
    </div>

    <div class="option">
        <i class="fa-solid fa-headset"></i>
        <span><a onclick="sairParaJira()">Suporte</a></span>
    </div>

    <span class="barraHorizontal"></span>

    <div class="option">
        <i class="fa-solid fa-door-open"></i>
       <span><a href="/pages/login.html">Sair</a></span>
    </div>`
} else if (cargo == "analista") {
    barralateral.innerHTML = 
    `
    <div class="div-logo">
    <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil" >
    <span class="txtLogo">TRADEFLUX</span>
    </div>

    <span class="barraHorizontal"></span>

    <div class="option selected">
        <i class="fa-solid fa-chart-line"></i>
        <span><a href="./dashboard_analista.html">Dashboard Analista</a></span>
    </div>

    <div class="option">
        <i class="fa-solid fa-headset"></i>
        <span><a onclick="sairParaJira()">Suporte</a></span>
    </div>

    <span class="barraHorizontal"></span>

    <div class="option">
        <i class="fa-solid fa-door-open"></i>
       <span><a href="/pages/login.html">Sair</a></span>
    </div>
    `
}
}
