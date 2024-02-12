const Usuario = require('../models/usuario');
const Role = require('../models/role');

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

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

module.exports = {
    existenEmail,
    existeUsuarioById,
    esRolValido
}