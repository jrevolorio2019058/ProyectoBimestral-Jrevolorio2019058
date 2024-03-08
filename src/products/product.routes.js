import {Router} from 'express';

import {check} from 'express-validator';

import { validarCampos, validacionFiltros } from '../middlewares/validar-campos.js';

import {existCategory, existeProductoById} from '../helpers/db-validator.js';

import{
    productPost,
    productGet,
    productById,
    productPut,
    productDelete,
    productGetFiltro
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

router.get("/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        validarCampos
    ], productGet
);

router.get("/filter",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        validacionFiltros,
        validarCampos
    ], productGetFiltro
);

router.get(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'CLIENT_ROLE'),
        check("id", "El id no tiene un formato de mongo Aceptable").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos
    ], productById
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("id", "El id no tiene un formato de mongo Aceptable").isMongoId(),
        check("id").custom(existeProductoById),
        check("category").custom(existCategory),
        validarCampos
    ], productPut
);


router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("id", "El id no tiene un formato de mongo Aceptable").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos
    ], productDelete
);

export default router;