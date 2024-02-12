const Usuario = require('../models/usuario');

const existenEmail = async (correo = '') => {
    
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Email: ${correo}, ya fue utilizado`);
    }

}

module.exports = {
    existenEmail
}