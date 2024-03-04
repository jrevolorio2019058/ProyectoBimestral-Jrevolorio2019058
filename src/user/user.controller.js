import bcryptjs from 'bcryptjs';

import User from './user.model.js';

import Role from '../roles/role.model.js';

export const userPost = async (req, res) => {

    const { userName, email, password, role } = req.body;

    const user = new User({ userName, email, password, role });

    const existeRole = await Role.findOne({ role: "ADMIN_ROLE" });

    if (!existeRole) {

        const roleAdmin = new Role({

            role: "ADMIN_ROLE",

        });

        const roleCliente = new Role({

            role: "CLIENT_ROLE",

        });

        await roleAdmin.save();
        await roleCliente.save();
    }

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    
    res.status(200).json({

        user

    });

}

export const userGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        user
    });

}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        user
    });
}

export const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id,state, ...resto } = req.body;
    await User.findByIdAndUpdate(id, resto);
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msd: 'Actualización de Usuario Exitosamente',
        user
    });

}

export const userDelete = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { state: false });

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario Eliminado',
        user
    });
}