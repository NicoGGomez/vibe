const { randomUUID } = require("crypto");

const crearOrdenQR = async (monto, referencia) => {

    const idempotencyKey = randomUUID();

    const respuesta = await fetch(
        "https://api.mercadopago.com/v1/orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                "X-Idempotency-Key": idempotencyKey
            },
            body: JSON.stringify({
                type: "qr",
                total_amount: monto.toFixed(2),
                description: "Compra Vibe",
                external_reference: referencia,
                config: {
                    qr: {
                        mode: "dynamic"
                    }
                },
                transactions: {
                    payments: [
                        {
                            amount: monto.toFixed(2)
                        }
                    ]
                }
            })
        }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        console.error("Error Mercado Pago:", datos);
        throw new Error(
            datos.message || "No se pudo crear la orden de Mercado Pago"
        );
    }

    return datos;
};

module.exports = {
    crearOrdenQR
};