// perfil

// Importación de función de "getToken(), getUsuario()" de "auth.js"

import { getUsuario, getToken } from "./auth.js";

// Obtención de elementos del DOM

const linkCompras =
    document.getElementById("link-compras");

const nombreUsuario =
    document.getElementById("nombre-usuario");

const rolUsuario =
    document.getElementById("rol-usuario");

const listaFavoritos =
    document.getElementById("lista-favoritos");

const mensajeFavoritos =
    document.getElementById("mensaje-favoritos");

const listaMasSolicitados =
    document.getElementById("lista-mas-solicitados");

const mensajeMasSolicitados =
    document.getElementById("mensaje-mas-solicitados");

const seccionMasSolicitados =
    document.getElementById("seccion-mas-solicitados");

const token =
    localStorage.getItem("token");

const usuarioGuardado =
    localStorage.getItem("usuario");


if (!token || !usuarioGuardado) {

    window.location.href = "login.html";

} else {

    try {

        const usuario =
            JSON.parse(usuarioGuardado);

        console.log("Usuario:", usuario);

        // Nombre

        nombreUsuario.textContent =
            `${usuario.nombre} ${usuario.apellido}`;

        // Rol

        if (usuario.rol === "admin") {

            rolUsuario.textContent =
                "Administrador";

            linkCompras.href =
                "compras.html";

            linkCompras.querySelector("span")
                .textContent = "Compras";

            linkCompras.querySelector("i")
                .className =
                "fa-solid fa-box";

            // Mostrar sección de productos más solicitados
            seccionMasSolicitados.style.display = "block";

            cargarMasSolicitados();

        } else {

            rolUsuario.textContent =
                "Usuario";

            linkCompras.href =
                "misCompras.html";

            linkCompras.querySelector("span")
                .textContent = "Mis compras";

            linkCompras.querySelector("i")
                .className =
                "fa-solid fa-bag-shopping";
        }

        cargarFavoritos();

    } catch (error) {

        console.error(
            "Error obteniendo usuario:",
            error
        );

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        window.location.href =
            "login.html";
    }
}

// Función para cargar cargar los productos favoritos

async function cargarFavoritos() {

    const token = getToken();

    if (!token) return;

    try {

        const respuesta = await fetch(
            "https://vibe-n9dy.onrender.com/favoritos",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const favoritos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                favoritos.mensaje ||
                "No se pudieron obtener los favoritos."
            );
        }

        listaFavoritos.innerHTML = "";

        // No tiene favoritos
        if (favoritos.length === 0) {

            mensajeFavoritos.textContent =
                "Todavía no tenés productos favoritos.";

            return;
        }

        mensajeFavoritos.textContent =
            `${favoritos.length} producto${favoritos.length !== 1 ? "s" : ""}`;


        favoritos.forEach(producto => {

            listaFavoritos.innerHTML += `

                <card-comp
                    data-id="${producto.id_producto}"
                    nombre="${producto.nombre}"
                    precio="${producto.precio}"
                    imagen="${producto.imagen_principal}"
                    stock="${producto.stock}"
                >
                </card-comp>

            `;

        });

    } catch (error) {

        console.error(
            "Error al cargar favoritos:",
            error
        );

        mensajeFavoritos.textContent =
            "No se pudieron cargar tus favoritos.";
    }
}

// Función para cargar los productos más solicitados

async function cargarMasSolicitados() {

    const token = getToken();

    if (!token) return;

    try {

        const respuesta = await fetch(
            "https://vibe-n9dy.onrender.com/favoritos/mas-solicitados",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const productos =
            await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                productos.mensaje ||
                "No se pudieron obtener los productos más solicitados."
            );
        }

        listaMasSolicitados.innerHTML = "";

        if (productos.length === 0) {

            mensajeMasSolicitados.textContent =
                "Todavía no hay productos solicitados.";

            return;
        }

        mensajeMasSolicitados.textContent =
            `${productos.length} producto${productos.length !== 1 ? "s" : ""}`;

        productos.forEach(producto => {

            const contenedor =
                document.createElement("div");

            contenedor.classList.add(
                "producto-mas-solicitado"
            );

            contenedor.innerHTML = `

                <card-comp
                    data-id="${producto.id_producto}"
                    nombre="${producto.nombre}"
                    precio="${producto.precio}"
                    imagen="${producto.imagen_principal}"
                    stock="${producto.stock}"
                >
                </card-comp>

                <div class="cantidad-solicitudes">

                    <i class="fa-solid fa-heart"></i>

                    <span>
                        ${producto.cantidad_favoritos}
                        ${Number(producto.cantidad_favoritos) === 1
                            ? "persona lo desea"
                            : "personas lo desean"}
                    </span>

                </div>

            `;

            listaMasSolicitados.appendChild(
                contenedor
            );
        });

    } catch (error) {

        console.error(
            "Error al cargar productos más solicitados:",
            error
        );

        mensajeMasSolicitados.textContent =
            "No se pudieron cargar los productos más solicitados.";
    }
}