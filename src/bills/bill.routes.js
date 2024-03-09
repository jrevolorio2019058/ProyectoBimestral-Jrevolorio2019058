/*purchaserNIT, paymentMethod, paymentCard, deliverAddress*/

import {Router} from 'express';

import {check} from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';

import {existUserName, existPaymentMethod} from '../helpers/db-validator.js';

import{
    makePurchase,
    showBill
} from './bill.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

import {tieneRole} from '../middlewares/validar-roles.js';

const router = Router();

router.post(

    "/finishPurchase",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        check("purchaserNIT", "Su nit es obligatorio").not().isEmpty(),
        check("purchaserNIT", "El NIT debe de contener 9 caracteres").isLength({ min: 9,max:9 }),
        check("paymentMethod", "Necesita un metodo de pago").not().isEmpty(),
        check("paymentMethod").custom(existPaymentMethod),
        check("paymentCard", "Necesita una tarjeta de pago").not().isEmpty(),
        check("deliverAddress", "Necesita una dirección de envio").not().isEmpty(),
        check("deliverAddress", "El lugar de envio debe contener maximo 200 caracteres").isLength({ max:200 }),
        validarCampos
    ],makePurchase

)

router.get(

    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        validarCampos
    ],showBill

)

router.get(

    "/ADMIN",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("userName", "Es obligatorio el nombre de busqueda").not().isEmpty(),
        check("userName").custom(existUserName),
        validarCampos
    ],showBill

)

export default router;