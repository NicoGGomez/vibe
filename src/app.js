// app

// Importaciones

const express = require("express");
const path = require("path");
const cors = require("cors");

// Importaciones de clases de rutas

const usuarioRoutes = require("./routes/usuario.routes");
const categoriasRoutes = require("./routes/categoria.routes");
const productosRoutes = require("./routes/producto.routes");
const carritoRoutes = require("./routes/carrito.routes");
const pagoRoutes = require("./routes/pago.routes");
const mercadoPagoSetupRoutes = require("./routes/mercadoPagoSetup.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const favoritoRoutes = require("./routes/favorito.routes");

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
app.use("/productos", productosRoutes);
app.use("/carrito", carritoRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/pagos", pagoRoutes);
app.use("/pagos/setup",mercadoPagoSetupRoutes);
app.use("/favoritos", favoritoRoutes);

module.exports = app;

