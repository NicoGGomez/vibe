// Middleware verificador de rol de usuario

// Función para verificar el rol de administrador 

const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                error: "No tenés permisos para realizar esta acción."
            });
        }

        next();
    };

};

// Exportación de función

module.exports = verificarRol;