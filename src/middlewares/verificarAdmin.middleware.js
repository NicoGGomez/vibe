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

module.exports = verificarRol;