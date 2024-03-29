import Role from '../roles/role.model.js';

import User from '../user/user.model.js';

import Category from '../categories/category.model.js';

import Product from '../products/product.model.js';

import PaymentMethod from '../paymentMethod/paymenthMehod.model.js';

export const existeUsuarioById = async (id = '') => {

    const existeUsuario = await User.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`)
    }

}

export const existeProductoById = async (id = '') => {

    const existeProducto = await Product.findOne({ _id: id });
    if (!existeProducto) {
        throw new Error(`El producto con el ${id} no existe`)
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


    if (category != "") {
        
        const existeCategoria = await Category.findOne({ categoryName: category });

        if (!existeCategoria) {
        throw new Error(`La categoría ${category} no existe en la base de datos.`);
        }

    }

}

export const existProductName = async (product = "") => {
    
    if (product != "") {

        const existeProducto = await Product.findOne({ productName: product });
        
        if (!existeProducto) {
            throw new Error(`El producto ${product} no existe en la base de datos.`);
        }

    }
};

export const existUserName = async (userName = "") => {
    
    if (userName != "") {

        const existeProducto = await User.findOne({ userName: userName });
        
        if (!existeProducto) {
            throw new Error(`El producto ${userName} no existe en la base de datos.`);
        }

    }
};

export const existPaymentMethod = async (paymentMethod = "") => {
    
    if (paymentMethod != "") {

        const existeProducto = await PaymentMethod.findOne({ namePaymentMethod: paymentMethod });
        
        if (!existeProducto) {
            throw new Error(`El metodo de pago ${paymentMethod} no existe en la base de datos.`);
        }

    }
};