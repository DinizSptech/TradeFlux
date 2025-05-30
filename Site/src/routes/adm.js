var express = require("express");
var router = express.Router();
var admController = require("../controllers/admController");

// Rotas - Alertas KPI
router.get("/alertas/24h", admController.getQtdAlertas24h);
router.get("/alertas/7d", admController.getQtdAlertas7d);
router.get("/alertas/30d", admController.getQtdAlertas30d);

// Rotas - Tempo médio geral
router.get("/tempo-medio/24h", admController.getTempoMedioGeral24h);
router.get("/tempo-medio/7d", admController.getTempoMedioGeral7d);
router.get("/tempo-medio/30d", admController.getTempoMedioGeral30d);

// Rotas - Top 5 alertas com maior atraso
router.get("/alertas-maior-atraso/24h", admController.get5AlertasMaiorAtraso24h);
router.get("/alertas-maior-atraso/7d", admController.get5AlertasMaiorAtraso7d);
router.get("/alertas-maior-atraso/30d", admController.get5AlertasMaiorAtraso30d);

// Rotas - Data Centers com maior tempo de resolução
router.get("/datacenter/media-resolucao/24h", admController.getDataCenterMediaResolucao24h);
router.get("/datacenter/media-resolucao/7d", admController.getDataCenterMediaResolucao7d);
router.get("/datacenter/media-resolucao/30d", admController.getDataCenterMediaResolucao30d);

// Rotas - Data Centers total de alertas
router.get("/datacenter/total-alertas/24h", admController.getDataCenterTotalAlertas24h);
router.get("/datacenter/total-alertas/7d", admController.getDataCenterTotalAlertas7d);
router.get("/datacenter/total-alertas/30d", admController.getDataCenterTotalAlertas30d);

// Rotas - Data Centers alertas atrasados
router.get("/datacenter/alertas-atrasados/24h", admController.getDataCenterTotalAlertasAtrasados24h);
router.get("/datacenter/alertas-atrasados/7d", admController.getDataCenterTotalAlertasAtrasados7d);
router.get("/datacenter/alertas-atrasados/30d", admController.getDataCenterTotalAlertasAtrasados30d);

module.exports = router;