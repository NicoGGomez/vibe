const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const carritoAbierto = document.getElementById("carrito-abierto");
const mensajeError = document.getElementById("msg-error");
const btnIrCarrito = document.getElementById("btn-ir-carrito");

btnAbrirCarrito.addEventListener("click", () => {
    carritoAbierto.style.display = "flex";
    btnAbrirCarrito.style.display = "none";

    cargarCarrito();
});

btnCerrarCarrito.addEventListener("click", () => {
    carritoAbierto.style.display = "none";
    btnAbrirCarrito.style.display = "flex";
});

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

    cargarCarrito();
}

document.addEventListener("borrar-carrito", async (e) => {
    try {
        // Eliminar visualmente al instante
        e.detail.elemento.remove();
        actualizarBtnCarrito();

        // Borrar en la base de datos
        await borrarDelCarrito(e.detail.idProducto);

    } catch (error) {
        console.error(error);

        await cargarCarrito();
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

    lista.innerHTML = "";

    productos.forEach(producto=>{

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

function actualizarBtnCarrito() {
    const cantidad = document.querySelectorAll("carrito-producto").length;
    btnIrCarrito.style.display = cantidad > 0 ? "block" : "none";
}