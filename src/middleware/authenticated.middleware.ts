import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';
import Person from '@/resources/person/person.model';

async function authenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void>{

    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')){
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();

    try {
        
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);    

        if (payload instanceof jwt.JsonWebTokenError){
            return next(new HttpException(401, 'Unauthorized'));
        }
        
        const p = await Person.findByPk(payload.id + '');
        const pp = p?.getDataValue('-password');


        // const user = await UserModel.findById(payload.id)
        //                             .select('-password')
        //                             .exec();

        if (!p){
            return next(new HttpException(401, 'Unauthorized'));
        }

        req.user = p;

        return next();

    } 
    catch (error) {
        return next(new HttpException(401, 'Unauthorized'));
    }

}

export default authenticatedMiddleware;
