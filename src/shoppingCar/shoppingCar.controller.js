import ShoppingCar from './shoppingCar.model.js';

import Product from '../products/product.model.js';

export const addCar = async(req, res) => {

    const {_id, total, idCliente, sellDone, ...resto} = req.body;

    const car = await ShoppingCar.findOne({idCliente: req.usuario._id});

    const product = await Product.findOne({productName: resto.productName});

    const cantidadActual = car.quantityProducts + resto.quantityProducts;

    const subTotal =  product.price * resto.quantityProducts;

    const finalTotal = car.total + subTotal;

    const shoppingCar = await ShoppingCar.findOneAndUpdate(
        { idCliente: req.usuario._id, sellDone: false},
        { $addToSet: { productName: resto.productName},
          $push: {prizeProduct: `Q.${product.price * resto.quantityProducts} | ${resto.productName} -> ${resto.quantityProducts}`},
          $set: {quantityProducts: cantidadActual, total: finalTotal}
        },
        { new: true }
    )

    res.status(200).json({
        msg: `${req.usuario.userName} haz agregado ${resto.productName} al carrito exitosamente`
    });

}