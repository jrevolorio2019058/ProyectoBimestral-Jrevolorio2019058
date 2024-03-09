import mongoose from "mongoose";

const PaymentMethodSchema = mongoose.Schema({

    namePaymentMethod: {

        type: String,

    }


})

export default mongoose.model('PaymentMethod', PaymentMethodSchema);