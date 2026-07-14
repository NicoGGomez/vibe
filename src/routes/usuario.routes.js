const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");


router.get("/", usuarioController.getUsuarios);


module.exports = router;