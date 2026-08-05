const PUBLIC_KEY = process.env.VIACARGO_PUBLIC_KEY;

export const cotizarViaCargo = async ({
    cpOrigen,
    cpDestino,
    peso,
    alto,
    ancho,
    largo,
    valorDeclarado
}) => {

    const response = await fetch("https://ws.busplus.com.ar/alerce/cotizar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PUBLIC-KEY": PUBLIC_KEY
        },
        body: JSON.stringify({
            IdClienteRemitente: "99999999",
            IdCentroRemitente: "99",

            CodigoPostalRemitente: cpOrigen,
            CodigoPostalDestinatario: cpDestino,

            Alto: String(alto),
            Ancho: String(ancho),
            Largo: String(largo),

            Kilos: String(peso),

            NumeroBultos: "1",

            ImporteValorDeclarado: String(valorDeclarado),

            TipoPortes: "P"
        })
    });

    if (!response.ok) {
        throw new Error("Error al cotizar con Vía Cargo");
    }

    return await response.json();
};