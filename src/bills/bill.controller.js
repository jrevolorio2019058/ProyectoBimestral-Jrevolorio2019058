import ShoppingCar from "../shoppingCar/shoppingCar.model.js";

import Bill from './bill.model.js';

import bcryptjs from 'bcryptjs';

import { format } from "date-fns";


export const makePurchase = async (req, res) => {

    const {purchaserNIT, paymentMethod, paymentCard, deliverAddress} = req.body;

    const shoppingCar = await ShoppingCar.findOne({idCliente: req.usuario._id});

    console.log(shoppingCar);

    const products = shoppingCar.prizeProduct;

    console.log(products);

    const total = shoppingCar.total * 1.21;

    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const isoDate = `${formattedDate}T${formattedTime}.000Z`;

    const bill = new Bill({

        purchaserName: req.usuario.userName,
        purchaserNIT,
        products,
        subTotal: shoppingCar.total,
        total,
        paymentMethod,
        paymentCard,
        deliverAddress,
        sellDate: isoDate

    })

    const salt = bcryptjs.genSaltSync();

    bill.paymentCard = bcryptjs.hashSync(paymentCard, salt);

    const procutDelete = await ShoppingCar.findOneAndDelete({idCliente: req.usuario._id});

    await bill.save();

    res.status(200).json({

        msg: `${req.usuario.userName} gracias por tu compra`

    });

}

export const showBill = async (req, res = response) =>{

    const {limite, desde} = req.query;

    const query = {purchaserName: req.usuario.userName};

    const [total, bill] = await Promise.all([

        Bill.countDocuments(query),
        Bill.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        
    ]);

    res.status(200).json({

        msg: `${req.usuario.userName} tus facturas:`,
        total,
        bill

    })

}

export const showBillUser = async (req, res = response) =>{

    const {userName} = req.body;

    const {limite, desde} = req.query;

    const query = {purchaserName: userName};

    const [total, bill] = await Promise.all([

        Bill.countDocuments(query),
        Bill.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        
    ]);

    res.status(200).json({

        msg: `La facturas de ${userName} son:`,
        total,
        bill

    })

}