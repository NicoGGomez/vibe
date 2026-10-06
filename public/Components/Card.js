import { agregarFavorito, quitarFavorito, esFavorito } from "../Scripts/Favorito.js";

class Card extends HTMLElement {

    connectedCallback() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const imagen = this.getAttribute("imagen");
        const stock = Number(this.getAttribute("stock"));

        this.innerHTML = `
            <div class="cont card" data-id="${id}">

                <i
                    class="fa-regular fa-heart btn-favorito"
                    title="Agregar a favoritos">
                </i>

                <a href="producto.html?id=${id}">

                    <img src="${imagen}" alt="">

                    <div class="cont info-card-comp">

                        <div class="cont info-card">
                            <p class="texto">${nombre}</p>
                            <p class="precio">$${precio}</p>
                        </div>

                </a>

                        <i
                            id="btn-agregar-carrito"
                            class="fa-solid fa-cart-shopping btn-carrito">
                        </i>

                    </div>

                ${
                    stock === 0
                    ? `<div class="sin-stock">Sin stock</div>`
                    : ""
                }

            </div>
        `;

        // Si no hay stock
        if (stock === 0) {

            const card = this.querySelector(".card");

            card.classList.add("sin-stock-card");
        }

        // ==========================
        // FAVORITOS
        // ==========================

        const btnFavorito = this.querySelector(".btn-favorito");

        if (btnFavorito) {

            // Verificar si ya está en favoritos
            esFavorito(id).then((favorito) => {

                if (favorito) {

                    btnFavorito.classList.remove("fa-regular");
                    btnFavorito.classList.add("fa-solid");
                    btnFavorito.classList.add("favorito-activo");

                    btnFavorito.title = "Quitar de favoritos";
                }

            });


            // Click en favorito
            btnFavorito.addEventListener("click", async (e) => {

                e.preventDefault();
                e.stopPropagation();

                const estaActivo =
                    btnFavorito.classList.contains("favorito-activo");


                // ==========================
                // QUITAR
                // ==========================

                if (estaActivo) {

                    const eliminado = await quitarFavorito(id);

                    if (!eliminado) {
                        return;
                    }

                    btnFavorito.classList.remove("fa-solid");
                    btnFavorito.classList.add("fa-regular");

                    btnFavorito.classList.remove("favorito-activo");

                    btnFavorito.title = "Agregar a favoritos";

                    return;
                }


                // ==========================
                // AGREGAR
                // ==========================

                const agregado = await agregarFavorito(id);

                if (!agregado) {
                    return;
                }

                btnFavorito.classList.remove("fa-regular");
                btnFavorito.classList.add("fa-solid");

                btnFavorito.classList.add("favorito-activo");

                btnFavorito.title = "Quitar de favoritos";


                // Animación
                btnFavorito.classList.remove("animar-favorito");

                void btnFavorito.offsetWidth;

                btnFavorito.classList.add("animar-favorito");

            });

        }

        const btnCarrito = this.querySelector(".btn-carrito");

        if (stock === 0) {
            btnCarrito.style.display = "none";
        }

        if (btnCarrito) {

            btnCarrito.addEventListener("click", (e) => {

                e.preventDefault();
                e.stopPropagation();

                // Animación de la Card
                btnCarrito.classList.remove("animar-carrito");

                void btnCarrito.offsetWidth;

                btnCarrito.classList.add("animar-carrito");

                // Avisar que se quiere agregar
                this.dispatchEvent(
                    new CustomEvent("agregar-carrito", {
                        bubbles: true,
                        detail: {
                            idProducto: id
                        }
                    })
                );
            });
        }
    }

    marcarEnCarrito() {
        const btnCarrito = this.querySelector(".btn-carrito");

        if (btnCarrito) {
                btnCarrito.classList.add("en-carrito");
        }
    }

    desmarcarEnCarrito() {
        const btnCarrito = this.querySelector(".btn-carrito");

        if (btnCarrito) {
            btnCarrito.classList.remove("en-carrito");
        }
    }

}

customElements.define("card-comp", Card);