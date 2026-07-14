const express = require("express");
const path = require("path");

const contactoRoutes = require("./routes/contactoRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// rutas
app.use("/contacto", contactoRoutes);

module.exports = app;

