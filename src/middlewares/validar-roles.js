import { request, response } from 'express';

export const tieneRole = (...roles) => {
    
    return (req = request, res = response, next) => {
        
        if (!req.usuario) {
            
            return res
                .status(500)
                .json({

                    msg: 'We need a token to verify a Role'

                })

        };

        if (!roles.includes(req.usuario.role)) {
            
            return res
                .status(401)
                .json({
                    msg: `The service requires one of the following authorized roles ${roles}`
                });

        }

        next();

    }

}