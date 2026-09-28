// Servicios de Pedido

const db = require("../config/database");
const { randomUUID } = require("crypto");


// Crear un pedido a partir del carrito
const crearPedido = async ({
    idUsuario,
    tipoEntrega,
    direccion,
    ciudad,
    codigoPostal,
    nombreApellido,
    telefono,
    metodoPago
}) => {

    const client = await db.connect();

    try {

        // Iniciar transacción
        await client.query("BEGIN");


        // Obtener productos del carrito
        const resultado = await client.query(
            `SELECT
                cp.cantidad,
                p.id_producto,
                p.precio,
                p.stock,
                p.nombre
            FROM carrito c
            JOIN carrito_producto cp
                ON c.id_carrito = cp.id_carrito
            JOIN producto p
                ON cp.id_producto = p.id_producto
            WHERE c.id_usuario = $1`,
            [idUsuario]
        );

        const productos = resultado.rows;


        // Verificar que el carrito no esté vacío
        if (productos.length === 0) {
            throw new Error("El carrito está vacío.");
        }


        // Verificar stock
        for (const producto of productos) {

            if (producto.cantidad > producto.stock) {
                throw new Error(
                    `No hay stock suficiente para "${producto.nombre}".`
                );
            }

        }


        // Calcular subtotal
        const subtotal = productos.reduce(
            (total, producto) =>
                total + Number(producto.precio) * producto.cantidad,
            0
        );


        // Por ahora el envío se calcula en el frontend.
        // Más adelante podemos mover este cálculo al backend.
        const total = subtotal;


        // Generar referencia única para Mercado Pago
        const referenciaPago =
            `VIBE-${idUsuario}-${Date.now()}-${randomUUID()}`;


        // Crear pedido
        const pedidoResultado = await client.query(
            `INSERT INTO pedido (
                fecha,
                estado,
                total,
                id_usuario,
                tipo_entrega,
                direccion,
                ciudad,
                codigo_postal,
                nombre_apellido,
                telefono,
                metodo_pago,
                referencia_pago
            )
            VALUES (
                NOW(),
                'pendiente',
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10
            )
            RETURNING *`,
            [
                total,
                idUsuario,
                tipoEntrega,
                direccion || null,
                ciudad || null,
                codigoPostal || null,
                nombreApellido,
                telefono,
                metodoPago,
                referenciaPago
            ]
        );


        const pedido = pedidoResultado.rows[0];


        // Crear los productos del pedido
        for (const producto of productos) {

            await client.query(
                `INSERT INTO pedido_producto (
                    cantidad,
                    precio_unidad,
                    id_producto,
                    id_pedido
                )
                VALUES ($1, $2, $3, $4)`,
                [
                    producto.cantidad,
                    producto.precio,
                    producto.id_producto,
                    pedido.id_pedido
                ]
            );

        }


        // Confirmar transacción
        await client.query("COMMIT");


        return {
            pedido,
            productos
        };


    } catch (error) {

        // Deshacer todos los cambios si algo falla
        await client.query("ROLLBACK");

        throw error;

    } finally {

        // Liberar conexión
        client.release();

    }
};


module.exports = {
    crearPedido
};