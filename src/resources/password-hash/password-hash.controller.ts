import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/person/person.validation';
import authenticated from '@/middleware//authenticated.middleware';
import status from 'http-status';
import PasswordHashModel from '@/resources/password-hash/password-hash.model';
import PasswordHashService from '@/resources/password-hash/password-hash.service';
import hasRoleMiddleware from '@/middleware/role.middleware';

class PasswordHashController implements Controller {

    public path = '/persopassword-hash';
    public router = Router();
    private PasswordHashService = new PasswordHashService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/register`,
            hasRoleMiddleware(['administrator']),
            this.register
        );

        this.router.post(
            `${this.path}/username`,
            hasRoleMiddleware(['administrator']),
            this.fetchHashForUsername
        );

    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username, email } = req.body;

            const token = await this.PasswordHashService.registerPasswordHashForUsername(username, email);

            // 201 if something is created
            res.status(201).json({ token });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private fetchHashForUsername = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { email } = req.body;

            const token = await this.PasswordHashService.getPasswordHashForUsername(email);

            // Status is ok 200 as nothing has been created
            res.status(200).json({ token });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private editPerson = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id } = req.body;
            const personToEdit = await this.PasswordHashService.getById(id);

            if (!personToEdit || personToEdit instanceof Error) {

                // Status 204 - No content
                res.status(204).json('id does not specify a valid person');


            }
            else {

                personToEdit.set({
                    username: req.body.username ?? personToEdit.getDataValue('username'),
                    email: req.body.email ?? personToEdit.getDataValue('email'),
                    kind: req.body.kind ?? personToEdit.getDataValue('kind')
                });
                personToEdit.save();

                // Status is ok 200 as nothing has been created
                res.status(200).json({ personToEdit });

            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

}

export default PasswordHashController;
