// const express = require("express");
// const router = express.Router();
// const CSVscontroller = require('../controllers/CSVs.controller');

// router.get("/csvTodosServidores/:arquivo/:caminho", function (req, res) {
//     CSVscontroller.primeiraConexao(req, res)
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const CSVscontroller = require('../controllers/CSVs.controller');

// Adicione log para debug
console.log('Rota CSV carregada');

// Teste com rota simples primeiro
router.get("/test", function (req, res) {
    res.json({ message: "Rota funcionando!" });
});

router.get("/csvTodosServidores/:arquivo/:caminho", function (req, res) {
    console.log('Rota csvTodosServidores chamada');
    console.log('Params:', req.params);
    CSVscontroller.primeiraConexao(req, res)
});

module.exports = router;