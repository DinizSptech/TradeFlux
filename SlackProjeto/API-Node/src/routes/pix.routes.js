const express = require("express");
const router = express.Router();

const pixController = require("../controllers/pix.controller");

router.get("/pegarPix", function (request, response) {
  pixController.pegarPix(request, response);
});

module.exports = router;
