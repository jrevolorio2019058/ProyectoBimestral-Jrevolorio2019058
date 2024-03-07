import Role from '../roles/role.model.js';

import User from '../user/user.model.js';

import Category from '../categories/category.model.js';

export const existeUsuarioById = async (id = '') => {

    const existeUsuario = await User.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`)
    }

}

export const existenEmail = async (correo = '') => {
    
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Email: ${correo}, ya fue utilizado`);
    }

}

export const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

export const existCategory = async (category = '') =>{

    const existeCategoria = await Category.findOne({categoryName: category});

    if(!existeCategoria){
        throw new Error(`La categoría ${category} no existe en la base de datos.`)
    }

}