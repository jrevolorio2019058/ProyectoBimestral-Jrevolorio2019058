import { Router } from 'express';

import { check } from 'express-validator';

import { validarCampos } from "../middlewares/validar-campos.js";

import { existeUsuarioById, existenEmail } from '../helpers/db-validator.js';

import {
    getUserById,
    userDelete,
    userGet,
    userPost,
    userAdminPut
} from '../user/user.controller.js';

const router = Router();

router.get("/", userGet);

router.post(
    "/",
    [
        check("userName", "Nombre obligatorio").not().isEmpty(),
        check("password", "Contraseña debe de contener minimo 6 caracteres").isLength({ min: 6, }),
        check("email", "No es un correo valido").isEmail(),
        check("email").custom(existenEmail),
        validarCampos,
    ], userPost
);

router.get(
    "/:id",
    [
        check("id", "El formato del ID no es compatible con MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUserById
);

router.put(
    "/:id",
    [
        check("id", "El formato del ID no es compatible con MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], userAdminPut
);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], userDelete
)

export default router;