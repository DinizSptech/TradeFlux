function tornarTabelaResponsiva() {
    // Get the header text for each column
    var cabecalhos = document.querySelectorAll('#tabelaFuncionarios th');
    var textosCabecalhos = [];
    
    for (var i = 0; i < cabecalhos.length; i++) {
      textosCabecalhos.push(cabecalhos[i].textContent.trim());
    }
    
    // Add data-label attribute to each cell
    var linhas = document.querySelectorAll('#tabelaFuncionarios tbody tr');
    
    for (var i = 0; i < linhas.length; i++) {
      var celulas = linhas[i].querySelectorAll('td');
      
      for (var j = 0; j < celulas.length; j++) {
        if (j < textosCabecalhos.length) {
          celulas[j].setAttribute('data-label', textosCabecalhos[j]);
        }
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(tornarTabelaResponsiva, 100);
  });