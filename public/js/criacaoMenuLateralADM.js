function carregarMenuLateral(){
    barralateral.innerHTML = `
        <div class="div-logo">
        <img class="imgLogo" src="../assets/TRADEFLUX__2_cortado.png" class="perfil-foto" alt="foto de perfil" >
        <span class="txtLogo">TRADEFLUX</span>
        </div>

        <span class="barraHorizontal"></span>

        <div class="option selected">
          <i class="fa-solid fa-chart-line"></i>
          <span><a href="./dashboard.html">Dashboard</a></span>
        </div>

        <div class="option">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span><a href="./alertas.html">Alertas</a></span>
        </div>
        
        <div class="option">
          <i class="fa-solid fa-server"></i>
          <span><a href="./alertas.html">Servidores</a></span>
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
          <span><a onclick="deslogar()">Sair</a></span>
        </div>`;
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