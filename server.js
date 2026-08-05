const app = require("./src/app");
const { cotizarViaCargo } = require("./src/services/viaCargo.service");


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


const prueba = await cotizarViaCargo({
    cpOrigen: "7000",
    cpDestino: "1000",
    peso: 1,
    alto: 4,
    ancho: 10,
    largo: 10,
    valorDeclarado: 100000
});

console.log(prueba);