import {Router} from 'express';

import {check} from 'express-validator';

import {validarCampos} from '../middlewares/validar-campos.js';

import{

    categoryPost,
    categoryGet,
    categoryPut,
    categoryDelete

} from '../categories/category.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

import { tieneRole } from '../middlewares/validar-roles.js';

const router = Router();

router.post(

    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("categoryName", "Nombre categoria es obligatorio escribir").not().isEmpty(),
        check("categoryDescription", "Es muy largo su descripción").isLength({max: 2000}),
        validarCampos
    ], categoryPost
);

router.get("/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        validarCampos
    ], categoryGet
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        validarCampos
    ], categoryPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        validarCampos
    ], categoryDelete
);

export default router;