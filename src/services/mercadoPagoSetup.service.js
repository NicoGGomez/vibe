const crearSucursal = async () => {

    const respuesta = await fetch(
        `https://api.mercadopago.com/users/${process.env.MP_USER_ID}/stores`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                name: "Vibe",
                external_id: "VIBE001",

                location: {
                    street_name: "Espora",
                    street_number: "1074",
                    city_name: "Tandil",
                    state_name: "Buenos Aires",

                    // Ubicación de referencia de Vibe
                    latitude: -37.314807489279154,
                    longitude: -59.11806689340413,

                    reference: "Vibe"
                }
            })
        }
    );

    const datos = await respuesta.json();

    console.log("Crear sucursal:", respuesta.status);
    console.log(datos);

    if (!respuesta.ok) {
        throw new Error(
            datos.message ||
            datos.error ||
            JSON.stringify(datos)
        );
    }

    return datos;
};

const obtenerSucursales = async () => {

    const respuesta = await fetch(
        `https://api.mercadopago.com/users/${process.env.MP_USER_ID}/stores`,
        {
            headers: {
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        }
    );

    const datos = await respuesta.json();

    console.log("Sucursales:", respuesta.status);
    console.log(datos);

    if (!respuesta.ok) {
        throw new Error(
            datos.message ||
            JSON.stringify(datos)
        );
    }

    return datos;
};


const crearCaja = async (storeId) => {

    const respuesta = await fetch(
        "https://api.mercadopago.com/pos",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                name: "Vibe Checkout",

                // Para una integración como la nuestra
                fixed_amount: true,

                store_id: storeId,

                external_store_id: "VIBE001",

                external_id: "VIBE001POS001",

                category: 621102
            })
        }
    );

    const datos = await respuesta.json();

    console.log("Crear caja:", respuesta.status);
    console.log(datos);

    if (!respuesta.ok) {
        throw new Error(
            datos.message ||
            datos.error ||
            JSON.stringify(datos)
        );
    }

    return datos;
};


module.exports = {
    crearSucursal,
    crearCaja,
    obtenerSucursales
};