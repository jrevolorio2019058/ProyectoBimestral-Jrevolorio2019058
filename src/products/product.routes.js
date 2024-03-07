import {Router} from 'express';

import {check} from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';

import {existCategory} from '../helpers/db-validator.js';

import{
    productPost
} from '../products/product.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

import {tieneRole} from '../middlewares/validar-roles.js';

const router = Router();

router.post(

    "/",
    [

        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("productName", "El nombre del producto es obligatorio").not().isEmpty(),
        check("price", "El precio del producto es obligatorio").not().isEmpty(),
        check("stock", "La cantidad del producto es obligatorio").not().isEmpty(),
        check("category", "La categoria del producto es obligatorio").not().isEmpty(),
        check("category").custom(existCategory),
        validarCampos
    ], productPost
)

export default router;