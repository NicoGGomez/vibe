// Rutas de Favoritos

// Importaciones

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
    "/mas-solicitados",
    verificarToken,
    favoritoController.obtenerMasSolicitados
);

router.get(
    "/:id",
    verificarToken,
    favoritoController.esFavorito
);

router.delete(
    "/:id",
    verificarToken,
    favoritoController.quitarFavorito
);


// Exportación de ruta

module.exports = router;