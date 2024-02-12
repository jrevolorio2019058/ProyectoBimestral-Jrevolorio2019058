const Usuario = require('../models/usuario');

const existeUsuarioById = async (id = '') => {

    const existeUsuario = await Usuario.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`)
    }

}

const existenEmail = async (correo = '') => {
    
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Email: ${correo}, ya fue utilizado`);
    }

}

module.exports = {
    existenEmail,
    existeUsuarioById
}