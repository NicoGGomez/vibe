const linkCompras =
    document.getElementById("link-compras");

const nombreUsuario =
    document.getElementById("nombre-usuario");

const rolUsuario =
    document.getElementById("rol-usuario");


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