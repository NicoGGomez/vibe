const db = require("../config/database");


const obtenerProductos = async () => {

    const resultado = await db.query(
        "SELECT * FROM producto"
    );

    return resultado.rows;
};

const cargarProductos = async (nombre, precio, descr, imgP, img1, img2, img3, stock, categoria) => {
    const resultado = await db.query(
        `INSERT INTO producto
        (
            nombre,
            precio,
            descripcion,
            imagen_principal,
            imagen_extra_uno,
            imagen_extra_dos,
            imagen_extra_tres,
            stock,
            id_categoria
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *
        `,
        [nombre,precio,descr,imgP,img1,img2,img3,stock,categoria]
    );

    return resultado.rows[0];
};


module.exports = {
    obtenerProductos,
    cargarProductos
};