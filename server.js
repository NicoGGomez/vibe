// Server

// Importación de app

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

// PRUEBA DE COTIZACIÓN DE ENVÍO

// const { cotizarViaCargo } = require("./src/services/viaCargo.service");

// (async () => {
//     try {
//         const prueba = await cotizarViaCargo({
//             cpOrigen: "7000",
//             cpDestino: "1000",
//             peso: 1,
//             alto: 4,
//             ancho: 10,
//             largo: 10,
//             valorDeclarado: 100000
//         });

//         console.log(prueba);
//     } catch (err) {
//         console.error(err);
//     }
// })();