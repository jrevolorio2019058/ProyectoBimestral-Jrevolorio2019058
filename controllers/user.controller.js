const { response } = require('express');

const bcryptsjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioPost = async (req, res) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcryptsjs.genSaltSync();
    usuario.password = bcryptsjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({

        usuario

    });

}

module.exports = {

    usuarioPost

}