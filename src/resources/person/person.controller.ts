import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/person/person.validation';
import PersonService from '@/resources/person/person.service';
import authenticated from '@/middleware//authenticated.middleware';
import status from 'http-status';

// Controller has to be added in index.ts in Controller array in constructor
class PersonController implements Controller {

    public path = '/person';
    public router = Router();
    private PersonService = new PersonService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );

        this.router.get(`${this.path}/current`, authenticated, this.getPerson);
        this.router.get(`${this.path}`, authenticated, this.getAll);

    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username, email, password, kind } = req.body;

            const token = await this.PersonService.register(username, email, password, kind);

            // 201 if something is created
            res.status(201).json({ token });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { email, password } = req.body;

            const token = await this.PersonService.login(email, password);

            // Status is ok 200 as nothing has been created
            res.status(200).json({ token });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private getPerson = (req: Request, res: Response, next: NextFunction): Response | void => {

        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).json({ user: req.user });

    };

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const users = await this.PersonService.getPersons();

            res.status(200).json({ message: 'elko' });

            // if (Array.isArray(users) && users.length > 0){

            //     // Status is ok 200 as nothing has been created
            //     res.status(200).json({ users });

            // }
            // else if (Array.isArray(users) && users.length === 0){

            //     // Status 204 - No content
            //     res.status(204).json()

            // }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    // private getWszystko = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    //     try {

    //         const wszystko = await this.PersonService.getWszystko();

    //         if (Array.isArray(wszystko) && wszystko.length > 0) {
    //             const responseStatus = 200;
    //             res.status(responseStatus).json({ status: responseStatus, message: status[responseStatus], results: wszystko });
    //         }
    //         else {
    //             const responseStatus = 204;
    //             res.status(responseStatus).json({ status: responseStatus, message: status[responseStatus]});
    //         }
                

    //     }
    //     catch (error: any) { 
    //         next(new HttpException(400, error.message));
    //     }

    // };

}

export default PersonController;
