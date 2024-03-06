import Category from './category.model.js';

export const categoryPost = async (req, res) => {

    const { categoryName, categoryDescription } = req.body;

    const category = new Category({categoryName, categoryDescription});

    await category.save();

    res.status(200).json({

        msg: `${req.usuario.userName} haz creador correctamente la categoria ${category.categoryName}`,

        category

    });

}

export const categoryGet = async (req, res = response) =>{

    const {limite, desde} = req.query;

    const query = {categoryState: true};

    const [total, category] = await Promise.all([

        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        
    ]);

    res.status(200).json({

        msg: `Categorias que existen:`,
        total,
        category

    })

}

export const categoryPut = async (req, res) =>{

    const {id} = req.params;

    const {_id, idProduct, categoryState, ...resto} = req.body;

    await Category.findByIdAndUpdate(id, resto);

    const category = await Category.findOne({_id: id});

    res.status(200).json({

        msg: `${req.usuario.userName} a sido modificado exitosamente categoría ${category.categoryName}`,
        
        category

    })

}

export const categoryDelete = async (req, res) => {
    
    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { categoryState: false });

    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: `${req.usuario.userName} haz eliminado exitosamente la categoria ${category.categoryName}`,
    });
}

