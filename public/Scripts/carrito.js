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

    mostrarCarga(contenedorCardsCarrito)

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

        if (contenedorCardsCarrito) contenedorCardsCarrito.innerHTML = "";

        productos.forEach(producto => {

            const precio = parseFloat(producto.precio);
            const cantidad = parseInt(producto.cantidad, 10);

            total += precio * cantidad;
            cantidadTotal += cantidad;

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
    const totalCompra = document.querySelector(".monto p:last-child");
    totalCompra.textContent = `$${total.toLocaleString("es-AR")}`;

}

if (contenedorCardsCarrito) {
    cargarProductos();
}