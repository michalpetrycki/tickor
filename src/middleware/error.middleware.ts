import { Request, Response, NextFunction } from 'express';
import { ValidationErrorItem } from 'sequelize';

function errorMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const status = 500;
    let message = 'Something went wrong ;(';

    let errs = [];

    if (error.errors) {

        for (const err of error.errors) {

            if (err instanceof ValidationErrorItem) {
                errs.push(err.message.split('.')[1]);
            }

        }

    }

    if (error.message) {
        errs.push(error.message);
    }

    res.status(status).send({
        status, message, errs
    });
    
}

export default errorMiddleware;
