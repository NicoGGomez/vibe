// Servicio de Mercado pago

// Importaciones

const { randomUUID } = require("crypto");

// Función para generar un código QR

const crearOrdenQR = async (monto, referencia) => {

    const idempotencyKey = randomUUID();

    const body = {
        type: "qr",
        total_amount: Number(monto).toFixed(2),
        description: "Compra Vibe",
        external_reference: referencia,

        config: {
            qr: {
                external_pos_id: process.env.MP_EXTERNAL_POS_ID,
                mode: "dynamic"
            }
        },

        transactions: {
            payments: [
                {
                    amount: Number(monto).toFixed(2)
                }
            ]
        }
    };

    console.log("Enviando a Mercado Pago:");
    console.log(JSON.stringify(body, null, 2));

    const respuesta = await fetch(
        "https://api.mercadopago.com/v1/orders",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                "X-Idempotency-Key": idempotencyKey
            },

            body: JSON.stringify(body)
        }
    );

    const datos = await respuesta.json();

    console.log("Status Mercado Pago:", respuesta.status);
    console.log("Respuesta Mercado Pago:");
    console.log(JSON.stringify(datos, null, 2));

    if (!respuesta.ok) {
        throw new Error(
            datos.message ||
            datos.error ||
            JSON.stringify(datos)
        );
    }

    return datos;
};

// Función para crear preferncia

const crearPreferencia = async (monto, referencia) => {

    const body = {
        items: [
            {
                title: "Compra Vibe",
                quantity: 1,
                unit_price: Number(monto),
                currency_id: "ARS"
            }
        ],

        external_reference: referencia,

        back_urls: {
            success: "misCompras.html",
            failure: "index.html",
            pending: "..."
        },

        auto_return: "approved"
    };

    const respuesta = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            },

            body: JSON.stringify(body)
        }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.message ||
            datos.error ||
            JSON.stringify(datos)
        );
    }

    return datos;
};

// Función para obtener orden de código QR

const obtenerOrdenQR = async (idOrden) => {

    const respuesta = await fetch(
        `https://api.mercadopago.com/v1/orders/${idOrden}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.message ||
            datos.error ||
            JSON.stringify(datos)
        );
    }

    return datos;
};

// Exportación de Función

module.exports = {
    crearOrdenQR,
    crearPreferencia,
    obtenerOrdenQR
};