const express = require('express');
const app = express();
const PORT = 3001;

function gerarDadosUltimos30Dias() {
  const dados = [];
  const hoje = new Date();
  const horarios = ['08:00:00','09:00:00','10:00:00','11:00:00', '12:00:00','13:00:00', '14:00:00','15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00'];

  for (let i = 0; i < 30; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() - i);

    for (const hora of horarios) {
      const datahora = data.toISOString().split('T')[0] + ' ' + hora;

      let volume_total, num_negociacoes;

      // Classificar horário
      if (['10:00:00', '11:00:00', '12:00:00', '15:00:00', '16:00:00', '17:00:00'].includes(hora)) {
        // Pico
        volume_total = Math.floor(Math.random() * 100000 + 400000); // 400k - 500k
        num_negociacoes = Math.floor(Math.random() * 500 + 1000);   // 1000 - 1500
      } else if (['08:00:00', '09:00:00', '13:00:00', '14:00:00'].includes(hora)) {
        // Médio
        volume_total = Math.floor(Math.random() * 150000 + 200000); // 200k - 350k
        num_negociacoes = Math.floor(Math.random() * 300 + 600);    // 600 - 900
      } else {
        // Baixa
        volume_total = Math.floor(Math.random() * 100000 + 50000);  // 50k - 150k
        num_negociacoes = Math.floor(Math.random() * 200 + 100);    // 100 - 300
      }

      dados.push({
        datahora: datahora,
        volume_total,
        num_negociacoes,
        variacao_ibov: +(Math.random() * 4 - 2).toFixed(2),         // -2% a +2%
        oscilacao_dolar: +(Math.random() * 0.5 - 0.25).toFixed(2),  // -0.25 a +0.25
        indice_setorial: +(Math.random() * 1000).toFixed(2)
      });
    }
  }

  return dados;
}

app.get('/dados', (req, res) => {
  const dados = gerarDadosUltimos30Dias();
  res.json(dados);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
