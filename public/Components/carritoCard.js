

class carritoCard extends HTMLElement {
    connectedCallback() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const imagen = this.getAttribute("imagen");
        const cantidad = this.getAttribute("cantidad");

        this.innerHTML = `
            <div class="cont card" data-id="${id}">
                <a href="producto.html?id=${id}">
                    <img src="${imagen}" alt="${nombre}">
                

                <div class="cont info-card-comp">
                    <div class="cont info-card">
                        <p class="texto">${nombre}</p>
                        <p class="precio">$${precio}</p>
                        <p class="cantidad">Cantidad: ${cantidad}</p>
                    </div>

                </a>    

                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;

        const btnBorrar = this.querySelector(".fa-trash");

        btnBorrar.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log("Click borrar", id);

            this.dispatchEvent(
                new CustomEvent("borrar-carrito", {
                    bubbles: true,
                    detail: {
                        idProducto: id,
                        elemento: this
                    }
                })
            );
        });

    }
}

customElements.define("carrito-card-comp", carritoCard);