import bcryptjs from 'bcryptjs';

import User from '../user/user.model.js';

import PaymentMethod from '../paymentMethod/paymenthMehod.model.js'

import { generarJWT } from '../helpers/generar-jwt.js';

import Role from '../roles/role.model.js';

export const login = async (req, res) => {
    
    const { email, password } = req.body;

    const user = await User.findOne({
        email
    });

    if (!user) {
        
        return res.status(400).json({

            msg: "Wrong Credentials! Not found Email in DataBase"

        });

    }

    if (user.role != 'ADMIN_ROLE' && user.role != 'CLIENT_ROLE') {
        
        return res.status(401).json({

            msg: "Invalid Role, You can not Login if not are a ADMIN or CLIENT"

        });

    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
        
        return res.status(400).json({

            msg: "Wrong Password"

        })
        
    }

    const token = await generarJWT(user.id);

    const existeRole = await Role.findOne({
        role: "ADMIN_ROLE"
    });

    const existeMetodoPago = await PaymentMethod.findOne({
        namePaymentMethod: "Efectivo"
    })

    if (!existeRole) {

        const roleAdmin = new Role({

            role: "ADMIN_ROLE",

        });

        const roleCliente = new Role({

            role: "CLIENT_ROLE",

        });

        await roleAdmin.save();
        await roleCliente.save();
    }

    if(!existeMetodoPago){

        const metodoEfectivo = new PaymentMethod({

            namePaymentMethod: "Efectivo"

        });

        const metodoAmericanExpress = new PaymentMethod({

            namePaymentMethod: "American Express"

        });

        const metodoVisa = new PaymentMethod({

            namePaymentMethod: "VISA"

        });

        const metodoMasterdCard = new PaymentMethod({

            namePaymentMethod: "Masterd Card"

        });

        await metodoEfectivo.save();
        await metodoAmericanExpress.save();
        await metodoVisa.save();
        await metodoMasterdCard.save();

    }

    res.status(200).json({

        msg: "Succesful Login",
        user,
        token

    })

}