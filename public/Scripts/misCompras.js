// Mis compras

// api de la página

const API_URL = "https://vibe-n9dy.onrender.com";

// Obtención de elementos del DOM

const contenedorPedidos =
    document.getElementById("contenedor-pedidos");

// Función para ver las compras 

async function cargarPedidos() {

    const token = localStorage.getItem("token");

    if (!token) {

        contenedorPedidos.innerHTML = `
            <p>Debés iniciar sesión para ver tus compras.</p>
        `;

        return;
    }


    try {

        const respuesta = await fetch(
            `${API_URL}/pedidos`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        const pedidos = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                pedidos.mensaje ||
                "No se pudieron cargar las compras."
            );

        }


        if (pedidos.length === 0) {

            contenedorPedidos.innerHTML = `
                <div class="sin-compras">

                    <i class="fa-solid fa-bag-shopping"></i>

                    <h2>Todavía no tenés compras</h2>

                    <p>
                        Cuando realices una compra,
                        aparecerá acá.
                    </p>

                </div>
            `;

            return;
        }


        contenedorPedidos.innerHTML = "";


        pedidos.forEach(pedido => {

            const fecha =
                new Date(pedido.fecha).toLocaleDateString(
                    "es-AR",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );


            const total =
                Number(pedido.total)
                    .toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });


            const productosHTML =
                pedido.productos.map(producto => {

                    const precio =
                        Number(producto.precio_unidad)
                            .toLocaleString("es-AR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });


                    return `
                        <div class="producto-pedido">

                            <img
                                src="${producto.imagen_principal}"
                                alt="${producto.nombre}"
                            >

                            <div class="producto-info">

                                <h3>
                                    ${producto.nombre}
                                </h3>

                                <p>
                                    Cantidad:
                                    ${producto.cantidad}
                                </p>

                                <span>
                                    $${precio}
                                </span>

                            </div>

                        </div>
                    `;

                }).join("");


            const entrega =
                pedido.tipo_entrega === "envio"
                    ? `
                        <div class="dato-pedido">
                            <i class="fa-solid fa-truck"></i>
                            <span>
                                Envío a
                                ${pedido.direccion},
                                ${pedido.ciudad}
                            </span>
                        </div>
                    `
                    : `
                        <div class="dato-pedido">
                            <i class="fa-solid fa-store"></i>
                            <span>
                                Retiro en el local
                            </span>
                        </div>
                    `;


            const tarjeta = document.createElement("article");

            tarjeta.classList.add("pedido-card");


            tarjeta.innerHTML = `

                <div class="pedido-header">

                    <div>

                        <h2>
                            Pedido #${pedido.id_pedido}
                        </h2>

                        <p>
                            ${fecha}
                        </p>

                    </div>


                    <span class="estado-pedido estado-${pedido.estado}">
                        ${pedido.estado}
                    </span>

                </div>


                <div class="pedido-productos">

                    ${productosHTML}

                </div>


                <div class="pedido-footer">

                    ${entrega}

                    <div class="total-pedido">

                        <span>Total</span>

                        <strong>
                            $${total}
                        </strong>

                    </div>

                </div>

            `;


            contenedorPedidos.appendChild(tarjeta);

        });


    } catch (error) {

        console.error(
            "Error cargando pedidos:",
            error
        );


        contenedorPedidos.innerHTML = `
            <div class="error-pedidos">

                <i class="fa-solid fa-circle-exclamation"></i>

                <p>
                    No se pudieron cargar tus compras.
                </p>

            </div>
        `;

    }

}

cargarPedidos();