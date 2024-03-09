import ShoppingCar from "../shoppingCar/shoppingCar.model.js";

import Bill from './bill.model.js';

import bcryptjs from 'bcryptjs';


export const makePurchase = async (req, res) => {

    const {purchaserNIT, paymentMethod, paymentCard, deliverAddress} = req.body;

    const shoppingCar = await ShoppingCar.findOne({idCliente: req.usuario._id, sellDone: false});

    const products = shoppingCar.prizeProduct;

    console.log(products);

    const total = shoppingCar.total * 1.21;

    const bill = new Bill({

        purchaserName: req.usuario.userName,
        purchaserNIT,
        products,
        subTotal: shoppingCar.total,
        total,
        paymentMethod,
        paymentCard,
        deliverAddress

    })

    const salt = bcryptjs.genSaltSync();

    bill.paymentCard = bcryptjs.hashSync(paymentCard, salt);

    const productSave = await ShoppingCar.findOneAndUpdate(
        { idCliente: req.usuario._id, sellDone: false},
        {$set: {sellDone: true}},
        { new: true }
    )

    await bill.save();

    res.status(200).json({

        msg: `${req.usuario.userName} gracias por tu compra`

    });

}