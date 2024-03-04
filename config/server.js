'user strict'

import express from 'express';

import cors from 'cors';

import helmet from 'helmet';

import morgan from 'morgan';

import { dbConnection } from './mongo.js';

import userRoutes from '../src/user/user.routes.js';

class Server{

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.usuarioPath = '/proyectoFinal/v2/user';

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

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVER ONLINE | ON PORT: ', this.port);
        });
    }

}

export default Server;