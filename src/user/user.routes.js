import { Router } from 'express';

import { check } from 'express-validator';

import { validarCampos, verificacionRolAdmin } from "../middlewares/validar-campos.js";

import { existeUsuarioById, existenEmail } from '../helpers/db-validator.js';

import {
    register,
    userAdminPut,
    userClientPut,
    userDelete,
    userGet,
    userPost
} from '../user/user.controller.js';

import { validarJWT } from "../middlewares/validar-jwt.js";

import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        validarCampos
    ], userGet
);

router.post(
    "/register",
    [
        check("userName", "Nombre obligatorio").not().isEmpty(),
        check("password", "Contraseña debe de contener minimo 6 caracteres").isLength({ min: 6, }),
        check("email", "No es un correo valido").isEmail(),
        check("email").custom(existenEmail),
        validarCampos,
    ], register
);

router.post(
    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("userName", "Nombre obligatorio").not().isEmpty(),
        check("password", "Contraseña debe de contener minimo 6 caracteres").isLength({ min: 6, }),
        check("email", "No es un correo valido").isEmail(),
        check("email").custom(existenEmail),
        validarCampos,
    ], userPost
);

router.put(
    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        validarCampos
    ], userClientPut
);

router.put(
    "/:id",
    [
        validarJWT,
        verificacionRolAdmin,
        tieneRole('ADMIN_ROLE'),
        check("id", "El formato del ID no es compatible con MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], userAdminPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        verificacionRolAdmin,
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], userDelete
)

export default router;