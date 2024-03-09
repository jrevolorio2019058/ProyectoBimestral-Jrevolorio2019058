import {Router} from 'express';

import {check} from 'express-validator';

import { validarCampos, existenciaCarrito } from '../middlewares/validar-campos.js';

import {existProductName} from '../helpers/db-validator.js';

import{
    addCar,
    showShopping
} from './shoppingCar.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

import {tieneRole} from '../middlewares/validar-roles.js';

const router = Router();

router.post(

    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        check("productName", "El nombre del producto es obligatorio").not().isEmpty(),
        check("productName").custom(existProductName),
        check("quantityProducts", "La cantidad de producto es obligatorio").not().isEmpty(),
        existenciaCarrito,
        validarCampos
    ],addCar

)

router.get(

    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        validarCampos
    ],showShopping

)

export default router;