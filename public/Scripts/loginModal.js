
import { getUsuario, getToken } from "./auth.js";

let accionPendiente = null;

function crearModal() {
    if (document.getElementById("modal-login-vibe")) return;

    const modal = document.createElement("div");
    modal.id = "modal-login-vibe";

    modal.innerHTML = `
        <div class="login-modal-fondo">
            <div class="login-modal-contenido">
                <button type="button" class="login-modal-cerrar"
                    aria-label="Cerrar">&times;</button>

                <h2>Iniciá sesión</h2>
                <p>Ingresá a tu cuenta para continuar.</p>

                <form id="form-login-modal">
                    <label for="login-modal-email">Email</label>
                    <input
                        type="email"
                        id="login-modal-email"
                        placeholder="Tu email"
                        required
                    >

                    <label for="login-modal-password">Contraseña</label>
                    <input
                        type="password"
                        id="login-modal-password"
                        placeholder="Tu contraseña"
                        required
                    >

                    <p id="login-modal-error"></p>

                    <button type="submit" id="login-modal-submit">
                        Iniciar sesión
                    </button>
                </form>

                <p class="login-modal-registro">
                    ¿No tenés cuenta?
                    <a href="registro.html">Registrate</a>
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const cerrar = () => {
        modal.remove();
        accionPendiente = null;
    };

    modal.querySelector(".login-modal-cerrar")
        .addEventListener("click", cerrar);

    modal.querySelector(".login-modal-fondo")
        .addEventListener("click", (e) => {
            if (e.target.classList.contains("login-modal-fondo")) {
                cerrar();
            }
        });

    modal.querySelector("#form-login-modal")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = modal.querySelector("#login-modal-email").value;
            const password = modal.querySelector("#login-modal-password").value;
            const error = modal.querySelector("#login-modal-error");
            const boton = modal.querySelector("#login-modal-submit");

            error.style.display = "none";
            boton.disabled = true;
            boton.textContent = "Ingresando...";

            try {
                const respuesta = await fetch(
                    "https://vibe-n9dy.onrender.com/usuarios/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            emailUsuario: email,
                            passwordUsuario: password
                        })
                    }
                );

                const data = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(
                        data.error || "No se pudo iniciar sesión."
                    );
                }

                localStorage.setItem("token", data.token);
                localStorage.setItem(
                    "usuario",
                    JSON.stringify(data.usuario)
                );

                const accion = accionPendiente;

                modal.remove();
                accionPendiente = null;

                if (accion) {
                    await accion();
                }
            } catch (err) {
                error.textContent =
                    err.message || "Ocurrió un error al iniciar sesión.";
                error.style.display = "block";
            } finally {
                if (document.body.contains(modal)) {
                    boton.disabled = false;
                    boton.textContent = "Iniciar sesión";
                }
            }
        });
}

export function requerirLogin(accion) {
    const usuario = getUsuario();
    const token = getToken();

    if (usuario && token) {
        accion?.();
        return true;
    }

    accionPendiente = accion || null;

    crearModal();

    const modal = document.getElementById("modal-login-vibe");
    modal.style.display = "block";

    return false;
}
