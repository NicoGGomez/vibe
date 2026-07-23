// class NavBar extends HTMLElement {
//     connectedCallback() {
//         this.innerHTML = `
//             <nav class="cont">
//                 <ul>
//                     <a href=""><img src="Imgs/logo-vibe.png" alt=""></a>
//                     <li><a href="index.html">Home</a></li>
//                     <li><a href="Productos.html">Productos</a></li>
//                     <li><a href="Nosotros.html">Nosotros</a></li>
//                 </ul>
//             </nav>
//         `;
//     }
// }

// customElements.define("nav-bar", NavBar);

import { getUsuario } from "./auth.js";

const usuario = getUsuario();

class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="cont">
                <ul>
                    <a href=""><img src="Imgs/logo-vibe.png" alt=""></a>

                    <li><a href="index.html">Home</a></li>
                    <li><a href="Productos.html">Productos</a></li>
                    <li><a href="Nosotros.html">Nosotros</a></li>

                    ${
                        !usuario
                            ? `<li><a href="login.html">Login</a></li>`
                            : `<li><a href="perfil.html">Perfil</a></li>`
                    }

                    <li id="btnAdmin">
                        <a href="cargarProducto.html">Cargar producto</a>
                    </li>

                </ul>
            </nav>
        `;

        const btnAdmin = this.querySelector("#btnAdmin");

        if (usuario?.rol !== "admin") {
            btnAdmin.style.display = "none";
        }
    }
}

customElements.define("nav-bar", NavBar);