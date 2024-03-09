import mongoose from "mongoose";

const BillSchema = mongoose.Schema({

    purchaserName: {

        type: String

    },

    purchaserNIT: {

        type: String,
        required: [true, 'Es requerido el nit del comprador']

    },

    sellerName: {

        type: String,
        default: "Productos Chapines C.A"

    },

    sellerNIT: {
    
        type: String,
        default: "198763248"

    },

    products: {

        type: [String],

    },

    subTotal: {

        type: Number,
        default: 0.00

    },

    total: {

        type: Number,
        default: 0.00

    },

    paymentMethod: {

        type: String,
        required: [true, 'Se requiere un metodo de pago']

    },

    paymentCard: {

        type: String,
        required: [true, 'Se requiere una tarjeta de pago']

    },

    sellDate: {

        type: Date

    },

    deliverAddress: {

        type: String,
        required: [true, 'Se requiere una dirección de entrega']

    }

})

export default mongoose.model('Bill', BillSchema);