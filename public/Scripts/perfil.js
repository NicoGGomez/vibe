import { getUsuario, getToken } from "./auth.js";

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


        // =========================
        // NOMBRE
        // =========================

        nombreUsuario.textContent =
            `${usuario.nombre} ${usuario.apellido}`;


        // =========================
        // ROL
        // =========================

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