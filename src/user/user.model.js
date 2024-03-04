import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    userName: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },

    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },

    img: {
        type:String
    },

    role: {
        type: String,
        required: true,
        enum: ["ADMINISTRATOR_ROLE", "CLIENTE_ROLE"]
    },

    state: {
        type: Boolean,
        default: true
    }

});

/*UserSchema.methods.toJSON = function () {
    
    const { _v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario;

}*/

export default mongoose.model('User', UserSchema);