const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { existenEmail, existeUsuarioById} = require('../helpers/db-validator');

const { usuarioPost, usuarioGet, getUsuarioById, usuariosPut, usuariosDelete} = require('../controllers/user.controller');

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

router.get(
    "/:id",
    [
        check("id", "El formato del ID no es compatible con MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById
);

router.put(
    "/:id",
    [
        check("id", "El formato del ID no es compatible con MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosPut
);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete
)

module.exports = router;