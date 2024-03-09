/*purchaserNIT, paymentMethod, paymentCard, deliverAddress*/

import {Router} from 'express';

import {check} from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';

import {existProductName} from '../helpers/db-validator.js';

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
        check("paymentMethod", "Necesita un metodo de pago").not().isEmpty(),
        check("paymentCard", "Necesita una tarjeta de pago").not().isEmpty(),
        check("deliverAddress", "Necesita una dirección de envio").not().isEmpty(),
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

export default router;