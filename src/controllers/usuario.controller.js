const usuarioService = require("../services/usuario.service");


const getUsuarios = async (req,res)=>{

    try {

        const usuarios = await usuarioService.listarUsuarios();

        res.json(usuarios);

    } catch(error){

        res.status(500).json({
            error:"Error del servidor"
        });

    }

};

const registrarUsuario = async (req, res) => {

    try {

        const {
            nombreUsuario,
            apellidoUsuario,
            emailUsuario,
            passwordUsuario
        } = req.body;

        if(
            !nombreUsuario ||
            !apellidoUsuario ||
            !emailUsuario ||
            !passwordUsuario
        ){
            return res.status(400).json({
                error:"Complete todos los campos."
            });
        }

        const usuario = await usuarioService.cargarUsuario(
            nombreUsuario,
            apellidoUsuario,
            emailUsuario,
            passwordUsuario
        );

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario
        });

    } catch(error) {

            if (error.code === "23505") {
                return res.status(409).json({
                    error: "Ese email ya está registrado."
                });
            }
            
            console.log(error);

            res.status(500).json({
                error: error.message
            });
    }

};



module.exports = {
    getUsuarios,
    registrarUsuario
};