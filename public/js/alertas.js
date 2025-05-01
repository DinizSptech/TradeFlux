let alertas = [];

function exibirAlertas() {
  const dataCenter = sessionStorage.DataCenter;

  fetch(`/alertas/exibirAlertas/${dataCenter}`, {
    method: "GET"
  })
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        console.log(json);

        alertas = json.map(item => {
        let nomeFormatado = item.nomeComponente;

        if (nomeFormatado === "Ram_Usada" || nomeFormatado === "Ram_Percentual") {
          nomeFormatado = "RAM";
        } else if (nomeFormatado === "Disco_Usado" || nomeFormatado === "Disco_Percentual") {
          nomeFormatado = "Disco";
        } else if (nomeFormatado === "Cpu_Percentual" || nomeFormatado === "Cpu_Frequencia") {
          nomeFormatado = "CPU";
        }

        return {
          nome: nomeFormatado,
          valor: item.valor,
          medida: item.medida,
          nivel: item.criticidade === 1 ? "Atenção" : "Crítico",
          servidor: item.idServidor,
          dataHora: item.data
        };
      });


        const bodyTabela = document.getElementById("bodyTabela");
        bodyTabela.innerHTML = ""; 
      
        alertas.forEach(alerta => {
        const dataFormatada = new Date(alerta.dataHora).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo"
         });
          bodyTabela.innerHTML += `
            <tr>
              <td>${alerta.nome}</td>
              <td style="font-weight: bold; color: ${alerta.nivel === "Crítico" ? '#e74c3c' : '#F29D12'};">${alerta.valor}</td>
              <td>${alerta.medida}</td>
              <td style="font-weight: bold; color: ${alerta.nivel === "Crítico" ? '#e74c3c' : '#F29D12'};">${alerta.nivel}</td>
              <td>${alerta.servidor}</td>
              <td>${dataFormatada}</td>
              <td><input type="checkbox" onclick="confirmarVisto()" /></td>
            </tr>
          `;


        });

      });
    } else {
      console.error('Erro ao obter alertas');
    }
  })
  .catch(error => {
    console.error("Erro na requisição:", error);
  });
}
 