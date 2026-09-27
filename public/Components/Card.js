class Card extends HTMLElement {
    connectedCallback() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const imagen = this.getAttribute("imagen");
        const stock = Number(this.getAttribute("stock"));

        this.innerHTML = `
            <div class="cont card" data-id="${id}">
                <a href="producto.html?id=${id}">
                    <img src="${imagen}" alt="">
                

                <div class="cont info-card-comp">
                    <div class="cont info-card">
                        <p class="texto">${nombre}</p>
                        <p class="precio">$${precio}</p>
                    </div>

                </a>    

                    <i id="btn-agregar-carrito" class="fa-solid fa-cart-shopping btn-carrito"></i>
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

        const btnCarrito = this.querySelector(".btn-carrito");

        if (stock === 0) {
            btnCarrito.style.display = "none";
        }

        if (btnCarrito) {
            btnCarrito.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

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
}

customElements.define("card-comp", Card);