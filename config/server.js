'user strict'

import express from 'express';

import cors from 'cors';

import helmet from 'helmet';

import morgan from 'morgan';

import { dbConnection } from './mongo.js';

import userRoutes from '../src/user/user.routes.js';

import authRoutes from '../src/auth/auth.routes.js';

import categoryRoutes from '../src/categories/category.routes.js';

import productRoutes from '../src/products/product.routes.js';

import shoppingCarRoutes from '../src/shoppingCar/schoppingCar.routes.js';

import billRoutes from '../src/bills/bill.routes.js';
class Server{

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.usuarioPath = '/proyectoFinal/v2/user';

        this.authPath = '/proyectoFinal/v2/auth';

        this.categoryPath = '/proyectoFinal/v2/category';

        this.productPath = '/proyectoFinal/v2/product';

        this.shoppingCarPath = '/proyectoFinal/v2/shoppingCar';

        this.billPath = '/proyectoFinal/v2/bill';

        this.middlewares();
        this.conectarDB();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        this.app.use(express.urlencoded({
            extended: false
        }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    routes() {

        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.shoppingCarPath, shoppingCarRoutes);
        this.app.use(this.billPath, billRoutes);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVER ONLINE | ON PORT: ', this.port);
        });
    }

}

export default Server;