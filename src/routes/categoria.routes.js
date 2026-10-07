// Rutas de Categoría

// Importaciones

const express = require("express");
const router = express.Router();

// Importación de clases

const categoriaController = require("../controllers/categoria.controller");

// Rutas

router.get(
    "/", 
    categoriaController.getCategorias
);

router.post(
    "/", 
    categoriaController.cargarCategoria
);

router.get(
    "/:id", 
    categoriaController.getCategoria
);

router.delete(
    "/:id", 
    categoriaController.borrarCategoria
);

// Exportación de rutas

module.exports = router;