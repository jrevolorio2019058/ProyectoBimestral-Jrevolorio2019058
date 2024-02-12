const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { existenEmail } = require('../helpers/db-validator');

const { usuarioPost, usuarioGet} = require('../controllers/user.controller');

const router = Router();

router.get("/", usuarioGet);

router.post(
    "/",
    [
        check("nombre", "Nombre obligatorio").not().isEmpty(),
        check("password", "Contraseña debe de contener minimo 6 caracteres").isLength({ min: 6, }),
        check("correo", "No es un correo valido").isEmail(),
        check("correo").custom(existenEmail),
        validarCampos,
    ], usuarioPost
);

module.exports = router;