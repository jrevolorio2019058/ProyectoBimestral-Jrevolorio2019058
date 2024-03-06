import mongoose from "mongoose";

const CategotySchema = mongoose.Schema({

    categoryName: {

        type: String,
        required: [true, 'Es requerido un nombre de categoria']

    },

    categoryDescription: {

        type: String,
        required: [true, 'Es requerida una descripción de categoria']

    },

    idProduct: {

        type: [String],
        default: []

    },

    categoryState: {

        type: Boolean,
        default: true

    }

})

export default mongoose.model('Category', CategotySchema);