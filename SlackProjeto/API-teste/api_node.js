const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3002;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/alertas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alertas');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});