// Middleware para proteger rutas verificando que el usuario tenga un JWT válido

// Importación de clases

const jwt = require("jsonwebtoken");

// Función para verificar que exista un usuario

const verificarToken = (req,res,next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader){

        return res.status(401).json({
            error:"Token requerido."
        });

    }

    const token = authHeader.split(" ")[1];

    try { 

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch {

        return res.status(401).json({
            error:"Token inválido."
        });

    }

}

// Exportación de Función

module.exports = verificarToken;