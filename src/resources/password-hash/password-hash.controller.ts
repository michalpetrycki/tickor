import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import PasswordHashService from '@/resources/password-hash/password-hash.service';
import hasRoleMiddleware from '@/middleware/role.middleware';
import status from 'http-status';
import PasswordHashModel from '@/resources/password-hash/password-hash.model';

class PasswordHashController implements Controller {

    public path = '/password-hash';
    public router = Router();
    private PasswordHashService = new PasswordHashService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/register`,
            // hasRoleMiddleware(['administrator']),
            this.register
        );

        this.router.post(
            `${this.path}/username`,
            // hasRoleMiddleware(['administrator']),
            this.fetch
        );

        this.router.post(
            `${this.path}/edit`,
            // hasRoleMiddleware(['administrator']),
            this.edit
        );

        this.router.post(
            `${this.path}/delete`,
            // hasRoleMiddleware(['administrator']),
            this.delete
        );

    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, username, password_hash } = req.body;
            const user_hash = await this.PasswordHashService.registerPasswordHashForUsername(id, username, password_hash);

            // 201 if something is created
            res.status(201).json({ user_hash });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private fetch = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username } = req.body;

            const user_hash = await this.PasswordHashService.getPasswordHashForUsername(username);

            // Status is ok 200 as nothing has been created
            res.status(200).json({ user_hash });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { username, hash } = req.body;

            const passwordHash = await this.PasswordHashService.editPasswordHashForUsername(username, hash);

            if (passwordHash instanceof PasswordHashModel) {

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

            const passwordHash = await this.PasswordHashService.deleteUsernameAndPassowrdHash(username);

            if (passwordHash) {

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

export default PasswordHashController;
