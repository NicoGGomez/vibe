

class Card extends HTMLElement {
    connectedCallback() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const imagen = this.getAttribute("imagen");

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
            </div>
        `;

        const btnCarrito = this.querySelector(".btn-carrito");

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

customElements.define("card-comp", Card);