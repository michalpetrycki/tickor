import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';
import Person from '@/resources/person/person.model';

const hasRoleMiddleware = function (roles: string[]) {

    return async function (req: Request, res: Response, next: NextFunction): Promise<Response | void> {

        const bearer = req.headers.authorization;
    
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return next(new HttpException(401, 'Unauthorized'));
        }
    
        const accessToken = bearer.split('Bearer ')[1].trim();
    
        try {
    
            const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);
    
            if (payload instanceof jwt.JsonWebTokenError) {
                return next(new HttpException(401, 'Unauthorized'));
            }
    
            const person = await Person.findByPk(payload.id + '');
            const userRole: string = person?.getDataValue('kind');
    
            if (!roles.includes(userRole)) {
                return next(new HttpException(403, 'Forbidden'));
            }
    
            req.user = person ?? {};
    
            return next();
    
        }
        catch (error) {
            return next(new HttpException(401, 'Unauthorized'));
        }
    
    }

}

export default hasRoleMiddleware;
