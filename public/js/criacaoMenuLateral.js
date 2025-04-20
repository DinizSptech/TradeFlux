function carregarMenuLateral() {
var cargo = sessionStorage.getItem("Cargo");  

console.log(cargo)
  if (cargo == "administrador") {
    barralateral.innerHTML = `
        <div class="div-logo">
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
          <span><a onclick="sairParaLogin()">Sair</a></span>
        </div>`;
} else if(cargo == "cientista"){
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
      <span><a onclick="sairParaLogin()">Sair</a></span>
    </div>`;
  } else if (cargo == "analista") {
    barralateral.innerHTML = `
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
    <span><a onclick="sairParaLogin()">Sair</a></span>
  </div>`;
}
}

function sairParaLogin() {
  sessionStorage.clear()
  window.location.href = "./login.html";
}

function sairParaJira() {
  window.open("https://www.atlassian.com/software/jira", '_blank');
}

/*    

 <div class="option">
          <i class="fa-solid fa-gear"></i>
          <span><a href="./atendimento.html">Configurações</a></span>
        </div>

<div class="option">
<i class="fa-solid fa-lightbulb"></i>
<span><a href="./cadastroEsteira.html">Insights</a></span>
</div>

*/
