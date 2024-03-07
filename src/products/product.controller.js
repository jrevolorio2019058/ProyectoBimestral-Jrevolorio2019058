import Product from './product.model.js';

import Category from '../categories/category.model.js';

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