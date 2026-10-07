// Compras 

// api de la página

const API_URL = "https://vibe-n9dy.onrender.com";

// Importación de función de "getUsuario()" de "auth.js"

import { mostrarError } from "./mostrarInfo.js";

// Obtención de elementos del DOM

const contenedorCompras =
    document.getElementById("contenedor-compras");

const cargandoCompras =
    document.getElementById("cargando-compras");

const sinCompras =
    document.getElementById("sin-compras");

const msgError =
    document.getElementById("msg-error");

// Función para mostrar el error

function mostrarError(mensaje) {

    msgError.textContent = mensaje;
    msgError.style.display = "block";
}

// Función carga de compras de usuario

async function cargarCompras() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "login.html";
        return;
    }

    try {

        const respuesta = await fetch(
            `${API_URL}/pedidos/admin`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                datos.mensaje ||
                "No se pudieron cargar las compras."
            );
        }


        cargandoCompras.style.display = "none";

        // No hay compras

        if (datos.length === 0) {

            sinCompras.style.display = "block";
            return;
        }

        // Mostrar pedidos

        contenedorCompras.innerHTML = "";

        datos.forEach(pedido => {

            const tarjeta =
                crearTarjetaPedido(pedido);

            contenedorCompras.appendChild(tarjeta);

        });

    } catch (error) {

        console.error(
            "Error cargando compras:",
            error
        );

        cargandoCompras.style.display = "none";

        mostrarError(
            error.message ||
            "No se pudieron cargar las compras."
        );
    }
}

// Función de creación de tarjeta de pedido

function crearTarjetaPedido(pedido) {

    const tarjeta =
        document.createElement("article");

    tarjeta.classList.add(
        "pedido-admin"
    );


    /* Fecha */

    const fecha =
        new Date(
            pedido.fecha
        ).toLocaleDateString(
            "es-AR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    /* Total */

    const total =
        Number(
            pedido.total
        ).toLocaleString(
            "es-AR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


    /* Productos */

    const productosHTML =
        pedido.productos
            .map(producto => {

                const precio =
                    Number(
                        producto.precio_unidad
                    ).toLocaleString(
                        "es-AR",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    );

                return `
                    <div class="producto-pedido-admin">

                        <img
                            src="${producto.imagen_principal}"
                            alt="${producto.nombre}"
                        >

                        <div>

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

            })
            .join("");


    /* Entrega */

    let entregaHTML = "";

    if (pedido.tipo_entrega === "envio") {

        entregaHTML = `
            <div class="dato-pedido-admin">

                <i class="fa-solid fa-truck"></i>

                <div>

                    <strong>
                        Envío
                    </strong>

                    <p>
                        ${pedido.direccion}
                    </p>

                    <p>
                        ${pedido.ciudad}
                        -
                        CP ${pedido.codigo_postal}
                    </p>

                </div>

            </div>
        `;

    } else {

        entregaHTML = `
            <div class="dato-pedido-admin">

                <i class="fa-solid fa-store"></i>

                <div>

                    <strong>
                        Retiro en el local
                    </strong>

                </div>

            </div>
        `;
    }

    // HTML de la tarjeta

    tarjeta.innerHTML = `

        <div class="pedido-admin-header">

            <div>

                <h2>
                    Pedido #${pedido.id_pedido}
                </h2>

                <p>
                    ${fecha}
                </p>

            </div>

            <span class="estado-pedido estado-pagado">
                PAGADO
            </span>

        </div>


        <div class="cliente-pedido-admin">

            <h3>
                <i class="fa-solid fa-user"></i>
                Cliente
            </h3>

            <p>
                ${pedido.nombre_apellido}
            </p>

            <p>
                <i class="fa-solid fa-phone"></i>
                ${pedido.telefono}
            </p>

        </div>


        <div class="pedido-productos-admin">

            <h3>
                <i class="fa-solid fa-box"></i>
                Productos
            </h3>

            ${productosHTML}

        </div>


        <div class="pedido-entrega-admin">

            ${entregaHTML}

        </div>


        <div class="pedido-admin-footer">

            <div class="total-pedido-admin">

                <span>
                    Total
                </span>

                <strong>
                    $${total}
                </strong>

            </div>

            <button
                class="btn-marcar-enviado"
                data-id="${pedido.id_pedido}"
            >

                <i class="fa-solid fa-truck"></i>

                Marcar como enviado

            </button>

        </div>

    `;

    const boton =
        tarjeta.querySelector(
            ".btn-marcar-enviado"
        );

    boton.addEventListener(
        "click",
        () => marcarComoEnviado(
            pedido.id_pedido,
            tarjeta,
            boton
        )
    );


    return tarjeta;
}

// Función para marcar como enviado

async function marcarComoEnviado(
    idPedido,
    tarjeta,
    boton
) {

    const token =
        localStorage.getItem("token");

    if (!token) {

        window.location.href =
            "login.html";

        return;
    }


    const confirmar =
        confirm(
            `¿Querés marcar el pedido #${idPedido} como enviado?`
        );

    if (!confirmar) {
        return;
    }


    try {

        boton.disabled = true;

        boton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Actualizando...
        `;


        const respuesta =
            await fetch(
                `${API_URL}/pedidos/${idPedido}/enviado`,
                {
                    method: "PATCH",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                datos.mensaje ||
                "No se pudo actualizar el pedido."
            );
        }

        // Cambiar estado de la tarjeta

        tarjeta
            .querySelector(
                ".estado-pedido"
            )
            .textContent = "ENVIADO";

        tarjeta
            .querySelector(
                ".estado-pedido"
            )
            .className =
                "estado-pedido estado-enviado";


        boton.remove();


    } catch (error) {

        console.error(
            "Error marcando pedido:",
            error
        );

        mostrarError("No se pudo marcar el pedido como enviado.")

        boton.disabled = false;

        boton.innerHTML = `
            <i class="fa-solid fa-truck"></i>
            Marcar como enviado
        `;
    }
}

// Inciar

cargarCompras();