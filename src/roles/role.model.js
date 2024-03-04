import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
   
    role: {
        type: String,
        required: [true, "El nombre del role es obligatorio"]
    }

});

export default mongoose.model('Role', RoleSchema
);