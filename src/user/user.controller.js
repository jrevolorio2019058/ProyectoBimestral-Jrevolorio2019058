import bcryptjs from 'bcryptjs';

import User from './user.model.js';

export const register = async (req, res) => {

    const { userName, email, password } = req.body;

    const user = new User({ userName, email, password, role: "CLIENT_ROLE" });

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    
    res.status(200).json({

        user

    });

}

export const userPost = async (req, res) => {

    const { userName, email, password, role } = req.body;

    const user = new User({ userName, email, password, role });

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    
    res.status(200).json({

        msg: `${req.usuario.userName} haz agregado correctamente a ${user.userName}`

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

export const userAdminPut = async (req, res) => {

    const { id } = req.params;
    const { _id,state, ...resto } = req.body;
    await User.findByIdAndUpdate(id, resto);
    const user = await User.findOne({ _id: id });

    const { password } = req.body;

    if (password != null) {
        
        const salt = bcryptjs.genSaltSync();
        
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

    }

    res.status(200).json({
        msg: `${req.usuario.userName} haz actualizado correctamente los datos de ${user.userName}`
    });

}

export const userClientPut = async (req, res) => {

    const id = req.usuario._id;

    const { _id,state,role, ...resto } = req.body;
    await User.findByIdAndUpdate(id, resto);
    const user = await User.findOne({ _id: id });

    const { password } = req.body;

    if (password != null) {
        
        const salt = bcryptjs.genSaltSync();
        
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

    }

    res.status(200).json({
        msg: `${req.usuario.userName} haz actualizado tus datos`
    });

}

export const userDelete = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { state: false });

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: `${req.usuario.userName} haz eliminado exitosamente a ${user.userName}`,
    });
}