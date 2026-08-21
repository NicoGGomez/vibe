import { mostrarCarga, generarSkeleton } from "./carga.js";

const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const carritoAbierto = document.getElementById("carrito-abierto");
const mensajeError = document.getElementById("msg-error");
const btnIrCarrito = document.getElementById("btn-ir-carrito");
const contenedorCardsCarrito = document.getElementById("cont-cards-carrito")
const cantProductos = document.getElementById("cant-productos");
const montoProductos = document.getElementById("monto-productos");
const montoFinal = document.getElementById("monto-final");
const montoEnvio = document.getElementById("monto-envio");
const btnContinuar = document.getElementById("btn-continuar-carrito")
const btnEnvio = document.getElementById("btn-envio")
const btnRetiro = document.getElementById("btn-retiro")
const btnUbicacion = document.getElementById("btn-ubicacion")
const formEnvio = document.getElementById("info-ubicacion")
const btnUbicacionSeleccionada = document.getElementById("btn-ubicacion-seleccionada");
const btnGenerarQR = document.getElementById("btn-generar-qr");
const contenedorQR = document.getElementById("qr");

if (btnGenerarQR) {

    btnGenerarQR.addEventListener("click", async () => {

        if (totalCompra <= 0) {
            alert("No hay productos para pagar.");
            return;
        }

        try {

            btnGenerarQR.textContent = "Generando QR...";
            btnGenerarQR.disabled = true;

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Debés iniciar sesión.");
                return;
            }

            const total = totalCompra + precioEnvio;

            const respuesta = await fetch(
                "https://vibe-n9dy.onrender.com/pagos/qr",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        monto: total
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || "No se pudo generar el QR."
                );
            }

            console.log("Order Mercado Pago:", datos);

            console.log("QR DATA:", datos.qr_data);
            console.log("ORDER COMPLETA:", datos);

            if (!datos.qr_data) {
                throw new Error("Mercado Pago no devolvió el QR.");
            }

            // Generar QR
            contenedorQR.innerHTML = "";

            new QRCode(contenedorQR, {
                text: datos.qr_data,
                width: 250,
                height: 250
            });

            btnGenerarQR.textContent = "QR generado ✓";

        } catch (error) {

            console.error(error);

            alert(error.message);

            btnGenerarQR.textContent = "Generar QR de pago";
            btnGenerarQR.disabled = false;
        }
    });
}

const PUNTO_VIBE = {
    lat: -37.314807489279154, 
    lon: -59.11806689340413
};

const PRECIO_POR_CUADRA = 100;
const METROS_POR_CUADRA = 100;
let precioEnvio = 0;
let totalCompra = 0;

function calcularDistancia(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function actualizarPrecioEnvio(latitud, longitud) {

    const distancia = calcularDistancia(
        PUNTO_VIBE.lat,
        PUNTO_VIBE.lon,
        latitud,
        longitud
    );

    const cuadras = Math.ceil(distancia / METROS_POR_CUADRA);

    precioEnvio = cuadras * PRECIO_POR_CUADRA;

    montoEnvio.textContent =
        `$${precioEnvio.toLocaleString("es-AR")}`;

    montoFinal.textContent =
        `$${(totalCompra + precioEnvio).toLocaleString("es-AR")}`;

    console.log("Distancia:", distancia, "metros");
    console.log("Cuadras:", cuadras);
    console.log("Precio envío:", precioEnvio);
}

if(btnEnvio){

    btnEnvio.addEventListener("click", () => {
    btnEnvio.style.opacity = 1
    btnUbicacion.style.display= "flex"
    btnRetiro.style.opacity = 0.5
    formEnvio.style.display="flex"
    btnUbicacionSeleccionada.style.display= "flex"
    })

}

if(btnRetiro){

    btnRetiro.addEventListener("click", () => {
    btnRetiro.style.opacity = 1
    btnUbicacion.style.display= "none"
    btnEnvio.style.opacity = 0.5
    formEnvio.style.display="none"
    btnUbicacionSeleccionada.style.display= "none"
    })

}

if(btnUbicacion){

    btnUbicacion.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Tu navegador no permite obtener la ubicación.");
        return;
    }

    btnUbicacion.textContent = "Obteniendo ubicación...";

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            actualizarPrecioEnvio(latitud, longitud);

            try {

                const respuesta = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json&addressdetails=1`
                );

                if (!respuesta.ok) {
                    throw new Error("No se pudo obtener la dirección.");
                }

                const datos = await respuesta.json();

                const direccion = document.getElementById("direccion");
                const ciudad = document.getElementById("ciudad");
                const codigoPostal = document.getElementById("codigo-postal");

                const address = datos.address;

                direccion.value = `${address.road || ""} ${address.house_number || ""}`.trim();

                ciudad.value =
                    address.city ||
                    address.town ||
                    address.village ||
                    "";

                codigoPostal.value = address.postcode || "";

                btnUbicacion.textContent = "Ubicación obtenida";

            } catch (error) {

                console.error(error);

                alert("No pudimos obtener tu dirección.");

                btnUbicacion.textContent = "Usar mi ubicación";
            }
            
        },

        (error) => {

            console.error(error);

            if (error.code === error.PERMISSION_DENIED) {
                alert("Necesitamos permiso para acceder a tu ubicación.");
            } else {
                alert("No pudimos obtener tu ubicación.");
            }

            btnUbicacion.textContent = "Usar mi ubicación";
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
});

}

if (btnUbicacionSeleccionada) {

    btnUbicacionSeleccionada.addEventListener("click", async () => {

        const direccion = document.getElementById("direccion").value.trim();
        const ciudad = document.getElementById("ciudad").value.trim();
        const codigoPostal = document.getElementById("codigo-postal").value.trim();

        if (!direccion || !ciudad || !codigoPostal) {
            alert("Completá la dirección, ciudad y código postal.");
            return;
        }

        try {

            btnUbicacionSeleccionada.textContent = "...";

            const consulta = encodeURIComponent(
                `${direccion}, ${ciudad}, ${codigoPostal}, Argentina`
            );

            const respuesta = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${consulta}`
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo encontrar la dirección.");
            }

            const datos = await respuesta.json();

            if (datos.length === 0) {
                alert("No encontramos esa dirección.");
                return;
            }

            const latitud = parseFloat(datos[0].lat);
            const longitud = parseFloat(datos[0].lon);

            console.log("Ubicación ingresada:");
            console.log("Latitud:", latitud);
            console.log("Longitud:", longitud);

            actualizarPrecioEnvio(latitud, longitud);

            btnUbicacionSeleccionada.textContent = "✓";

        } catch (error) {

            console.error(error);

            alert("No pudimos calcular el costo del envío.");

            btnUbicacionSeleccionada.textContent = "✓";
        }
    });
}

if (btnAbrirCarrito) {
    btnAbrirCarrito.addEventListener("click", () => {
        carritoAbierto.style.display = "flex";
        btnAbrirCarrito.style.display = "none";

        cargarCarrito();
    });
}

if (btnCerrarCarrito) {
    btnCerrarCarrito.addEventListener("click", () => {
        carritoAbierto.style.display = "none";
        btnAbrirCarrito.style.display = "flex";
    });
}

document.addEventListener("agregar-carrito", async (e) => {
    try {
        await agregarAlCarrito(e.detail.idProducto);
    } catch (error) {
        console.error(error);
    }
});

async function agregarAlCarrito(idProducto) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Debés iniciar sesión para agregar productos al carrito.");
        return;
    }

    const respuesta = await fetch("https://vibe-n9dy.onrender.com/carrito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            id_producto: idProducto,
            cantidad: 1
        })
    });

    if (!respuesta.ok) {
        const error = await respuesta.json();
        console.log(error);

        mensajeError.textContent = error.mensaje;
        mensajeError.style.display = "block";

        setTimeout(() => {
            mensajeError.style.display = "none";
        }, 3000);

        throw new Error(error.mensaje);
    }

    await cargarCarrito();
}

document.addEventListener("borrar-carrito", async (e) => {
    try {
        console.log("borrar-carrito", e.detail);
        // Eliminar visualmente al instante
        e.detail.elemento.remove();
        actualizarBtnCarrito();

        // Borrar en la base de datos
        await borrarDelCarrito(e.detail.idProducto);

        // Recargar vistas
        cargarCarrito();

        if (contenedorCardsCarrito) {
            await cargarProductos();
        }

    } catch (error) {
        console.error(error);

        await cargarCarrito();

        if (contenedorCardsCarrito) {
            await cargarProductos();
        }
    }
});

async function borrarDelCarrito(idProducto) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Debés iniciar sesión.");
        return;
    }

    const respuesta = await fetch(
        `https://vibe-n9dy.onrender.com/carrito/${idProducto}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.mensaje);
    }
}

async function cargarCarrito(){

    const token = localStorage.getItem("token");

    if (!token) return;

    const respuesta = await fetch("https://vibe-n9dy.onrender.com/carrito",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if (respuesta.status === 401) {
        localStorage.removeItem("token");

        alert("Tu sesión expiró. Iniciá sesión nuevamente.");

        window.location.href = "/login.html";

        return;
    }

    if(!respuesta.ok){
        throw new Error("No se pudo obtener el carrito");
    }

    const productos = await respuesta.json();

    const lista = document.getElementById("lista-carrito");

    if (lista) {
        lista.innerHTML = "";

        productos.forEach(producto => {
                lista.innerHTML += `
                    <carrito-producto
                        id="${producto.id_producto}"
                        nombre="${producto.nombre}"
                        precio="${producto.precio}"
                        cantidad="${producto.cantidad}"
                        imagen="${producto.imagen_principal}">
                    </carrito-producto>
                `;
        });

        actualizarBtnCarrito();
    }

}

function actualizarBtnCarrito() {
    if (!btnIrCarrito) return;
    const cantidad = document.querySelectorAll("carrito-producto").length;
    btnIrCarrito.style.display = cantidad > 0 ? "block" : "none";
}

const cargarProductos = async () => {

    if (contenedorCardsCarrito) {
        mostrarCarga(contenedorCardsCarrito)
    }

    let total = 0;
    let cantidadTotal = 0;

    try {

        const token = localStorage.getItem("token");

        if (!token) return;

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/carrito", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.mensaje);
        }

        const productos = await respuesta.json();

        if (btnContinuar) {
            
            btnContinuar.addEventListener("click", () => {

                if (productos.length === 0) {
                    mostrarError("Tu carrito está vacío.");
                    return;
                }

                window.location.href = "checkout.html";
            });

        }

        if (contenedorCardsCarrito) contenedorCardsCarrito.innerHTML = "";

        productos.forEach(producto => {

            const precio = parseFloat(producto.precio);
            const cantidad = parseInt(producto.cantidad, 10);

            total += precio * cantidad;
            cantidadTotal += cantidad;

            totalCompra = total;

            if (contenedorCardsCarrito) {
                
                contenedorCardsCarrito.innerHTML += `
                    <carrito-card-comp 
                    data-id="${producto.id_producto}"
                    imagen="${producto.imagen_principal}"
                    nombre="${producto.nombre}"
                    precio="${producto.precio}"
                    cantidad="${producto.cantidad}"
                    >
                    </carrito-card-comp>
                `;  

            }

        })

    } catch (error) { 

        console.error(error);

        mensajeError.textContent = error.message;
        mensajeError.style.display = "block";

        setTimeout(() => {
            mensajeError.style.display = "none";
        }, 3000);

    }

    cantProductos.textContent = `Productos (${cantidadTotal})`;
    montoProductos.textContent = `$${total.toLocaleString("es-AR")}`;
    montoFinal.textContent = `$${total.toLocaleString("es-AR")}`;

}

cargarProductos();
