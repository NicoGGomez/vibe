import { logout } from "./auth.js";

const btnCerrarSesion = document.getElementById("btn-logout");

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        logout()
        window.location.href = "login.html";
    });
}

