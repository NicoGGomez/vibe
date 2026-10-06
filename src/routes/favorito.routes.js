// Rutas de Favoritos

const express = require("express");

const router = express.Router();


// Importación de clases

const favoritoController =
    require("../controllers/favorito.controller");

const verificarToken =
    require("../middlewares/auth.middleware");


// Rutas

router.post(
    "/",
    verificarToken,
    favoritoController.agregarFavorito
);

router.get(
    "/",
    verificarToken,
    favoritoController.obtenerFavoritos
);

router.get(
    "/:id",
    verificarToken,
    favoritoController.esFavorito
);

router.get(
    "/mas-solicitados",
    verificarToken,
    favoritoController.obtenerMasSolicitados
);

router.delete(
    "/:id",
    verificarToken,
    favoritoController.quitarFavorito
);


// Exportación

module.exports = router;