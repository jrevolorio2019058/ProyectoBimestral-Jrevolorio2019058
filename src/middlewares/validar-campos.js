import { validationResult } from "express-validator";

import User from '../user/user.model.js';

export const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    next();
}

export const verificacionRolAdmin = async (req, res, next) => {
    
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (user.role == "ADMIN_ROLE") {
        
        return res.status(400).json({

            msg: `${req.usuario.userName} no puedes actualizar/eliminar los datos de otro Admin`

        })

    }

    next();

}

export const verificacionDeleteClient = async (req, res, next) => {
    
    const { confirmationDelete } = req.body;

    if (confirmationDelete != "ELIMINAR MI PERFIL") {
        
        return res.status(400).json({

            msg: `${req.usuario.userName}, Escribe ELIMINAR MI PERFIL para poder eliminar tu perfil.`

        })

    }

    next();

}