import bcryptjs from 'bcryptjs';

import User from './user.model.js';

export const userPost = async (req, res) => {

    const { userName, email, password, role } = req.body;
    const user = new User({ userName, email, password, role });

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

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