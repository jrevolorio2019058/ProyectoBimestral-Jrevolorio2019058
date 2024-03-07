import Product from './product.model.js';

import Category from '../categories/category.model.js';
import { response } from 'express';

export const productPost = async (req, res) => {

    const { productName, price, stock, category } = req.body;

    const product = new Product({productName, price, stock, category});

    const categories = await Category.findOneAndUpdate(
        { categoryName: category, idProduct: { $ne: product._id } },
        { $addToSet: { idProduct: product._id } },
        { new: true }
    )

    await categories.save();
    await product.save();

    res.status(200).json({

        msg: `${req.usuario.userName} haz agregado exitosamente ${product.productName}`

    })

}

export const productGet = async(req, res = response) => {

    const {limite, desde} = req.query;
    const query = {productState: true};

    const [total, product] = await Promise.all([

        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        
    ]);

    res.status(200).json({
        total,
        product
    })

}

export const productById = async(req, res) =>{

    const {id} = req.params;

    const product = await Product.findOne({_id: id});

    res.status(200).json({

        msg: `${req.usuario.userName} el producto que buscas:`,
        product
        
    })

}