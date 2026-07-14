const express = require("express");
const path = require("path");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuario.routes");
const categoriasRoutes = require("./routes/categoria.routes");

const app = express();

app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// rutas
app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriasRoutes);

module.exports = app;

