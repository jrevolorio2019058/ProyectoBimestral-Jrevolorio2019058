import mongoose from "mongoose";

const ProdutSchema = mongoose.Schema({

    productName: {

        type: String,
        required: [true, 'Es necesario un nombre de producto']

    },

    price: {

        type: Number,
        required: [true, 'Es necesario un precio de producto']

    },

    stock: {

        type: Number,
        required: [true, 'Es necesario un stock de producto']

    },

    category: {

        type: String,
        required: [true, 'Es necesario una categoria de producto']

    },

    productState: {

        type: Boolean,
        default: true

    }

})

export default mongoose.model('Product', ProdutSchema);