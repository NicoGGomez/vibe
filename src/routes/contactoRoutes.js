const express = require("express");

const router = express.Router();

const contactoController = require("../controllers/contactoController");

router.get("/", contactoController.mostrarContacto);

module.exports = router;