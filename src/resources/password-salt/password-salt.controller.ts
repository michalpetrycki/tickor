import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import PasswordSaltService from '@/resources/password-salt/password-salt.service';
import hasRoleMiddleware from '@/middleware/role.middleware';
import status from 'http-status';
import PasswordSaltModel from '@/resources/password-salt/password-salt.model';

class PasswordSaltController implements Controller {

    public path = '/password-salt';
    public router = Router();
    private PasswordSaltService = new PasswordSaltService();

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
            this.fetch
        );

        this.router.post(
            `${this.path}/edit`,
            hasRoleMiddleware(['administrator']),
            this.edit
        );

        this.router.post(
            `${this.path}/delete`,
            hasRoleMiddleware(['administrator']),
            this.delete
        );

    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username, salt } = req.body;

            const token = await this.PasswordSaltService.registerPasswordSaltForUsername(username, salt);

            // 201 if something is created
            res.status(201).json({ token });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private fetch = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { email } = req.body;

            const salt = await this.PasswordSaltService.getPasswordSaltForUsername(email);

            // Status is ok 200 as nothing has been created
            res.status(200).json({ salt });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username, salt } = req.body;

            const passwordSalt = await this.PasswordSaltService.editPasswordSaltForUsername(username, salt);

            if (passwordSalt instanceof PasswordSaltModel) {

                // Status is ok 200 as nothing has been created
                res.status(200).json({ message: status[200] });

            }
            else {
                res.status(400).json({ message: status[400] });
            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username } = req.body;

            const passwordSalt = await this.PasswordSaltService.deleteUsernameAndPassowrdSalt(username);

            if (passwordSalt) {

                // Status is ok 200 as nothing has been created
                res.status(204).json({ message: status[204] });

            }
            else {
                res.status(400).json({ message: status[400] });
            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };


}

export default PasswordSaltController;
