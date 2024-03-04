import jwt from 'jsonwebtoken';

import User from '../user/user.model.js';

export const validarJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        
        return res.status(400).json({

            msg: "Token not found"

        });

    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            
            return res.status(401).json({

                msg: 'User not found in DataBase'

            })

        }

        if (!user.state) {
            
            return res.status(401).json({

                msg: 'Invalid Token | User State: False'

            })

        }

        req.usuario = user;

        req.usuarioId = await User.findById(uid);

        next();

    } catch (e) {
        
        console.log(e),
            res.status(401).json({

                msg: "Invalid Token"

            });

    }

}