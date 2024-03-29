import Product from './product.model.js';

import { response } from 'express';
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

export const productById = async(req, res) =>{

    const {id} = req.params;

    const product = await Product.findOne({_id: id});

    res.status(200).json({

        msg: `${req.usuario.userName} el producto que buscas:`,
        product
        
    })

}

export const productGetFiltro = async(req, res = response) => {

    const {category, increase, decrease, productEmpty, mostSells, nameProduct} = req.body;

    if (req.body.hasOwnProperty("category") != "") {
      const { limite, desde } = req.query;
      const query = { category: category, productState: true };

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).skip(Number(desde)).limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    } else if (req.body.hasOwnProperty("increase") == true) {
      const { limite, desde } = req.query;
      const query = { productState: true };

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
          .sort({ productName: 1 })
          .skip(Number(desde))
          .limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    } else if (req.body.hasOwnProperty("decrease") == true) {
      const { limite, desde } = req.query;
      const query = { productState: true };

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
          .sort({ productName: -1 })
          .skip(Number(desde))
          .limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    } else if (req.body.hasOwnProperty("productEmpty") == true) {
      const { limite, desde } = req.query;
      const query = { productState: true, stock: 0 };

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).skip(Number(desde)).limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    } else if (req.body.hasOwnProperty("mostSells") == true) {
        const { limite, desde } = req.query;

      const query = { productState: true};

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
          .sort({ sells: -1 })
          .skip(Number(desde))
          .limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    }else if (req.body.hasOwnProperty("nameProduct") == true) {
        const { limite, desde } = req.query;

      const query = { productState: true, productName: nameProduct};

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
          .sort({ sells: -1 })
          .skip(Number(desde))
          .limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    } else {
      //Falta por corregir

      const { limite, desde } = req.query;
      const query = { productState: true };

      const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).skip(Number(desde)).limit(Number(limite)),
      ]);

      res.status(200).json({
        total,
        product,
      });
    }

}


export const productPut = async(req, res) =>{

    const {id} = req.params;

    const {_id, productState, ...resto} = req.body;

    const categoriaAnterior = await Product.findOne({_id: id});

    await Product.findByIdAndUpdate(id, resto);

    const product = await Product.findOne({_id: id});

    console.log(categoriaAnterior.category);
    console.log(product.category);

    const categoriesUpdate = await Category.findOneAndUpdate(
        { categoryName: resto.category, idProduct: { $ne: id } },
        { $addToSet: { idProduct: id } },
        { new: true }
    )

    const categoriesDelete = await Category.findOneAndUpdate(
        { categoryName: categoriaAnterior.category },
        { $pull: { idProduct: categoriaAnterior._id } },
        { new: true }
    )

    res.status(200).json({
        msg: `${req.usuario.userName} haz actualizado correctamente los datos del producto ${product.productName}`
    });

}

export const productDelete = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { productState: false });

    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: `${req.usuario.userName} haz eliminado exitosamente el producto ${product.productName}`,
    });
}