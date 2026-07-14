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


module.exports = {
    getUsuarios
};