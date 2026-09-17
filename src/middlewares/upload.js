// Middleware para recibir y procesar un archivo

const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

// Exportación de función

module.exports = upload;