import mongoose from 'mongoose';

const ShoppingCarSchema = mongoose.Schema({

    productName: {

        type: [String],
        default: []

    },

    quantityProducts: {

        type: Number,
        default: 0

    },

    prizeProduct: {

        type: [String]

    },

    total: {

        type: Number,
        default: 0.00

    },

    idCliente: {

        type: String,
        required: [true, 'El id del comprador es necesario']

    },

    sellDone: {

        type: Boolean,
        default: false

    }

})

export default mongoose.model('ShoppingCar', ShoppingCarSchema);