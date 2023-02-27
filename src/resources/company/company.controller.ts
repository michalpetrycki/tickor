import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/company/company.validation';
import CompanyService from '@/resources/company/company.service';

// Controller has to be added in index.ts in Controller array in constructor
class CompanyController implements Controller {

    public path = '/company';
    public router = Router();
    private CompanyService = new CompanyService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create)],
            this.create
        );

        this.router.post(
            `${this.path}/edit`,
            validationMiddleware(validate.edit),
            this.edit
        );

        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.deleteCompany),
            this.delete
        );

        // this.router.post(
        //     `${this.path}/list`,
        //     validationMiddleware(validate.login),
        //     this.list
        // );

        // this.router.get(
        //     `${this.path}`,
        //     authenticated,
        //     this.getAll)
        //     ;

        // this.router.post(
        //     `${this.path}/edit`,
        //     authenticated,
        //     this.editPerson
        // );

    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, name, kind } = req.body;

            const newCompany = await this.CompanyService.createCompany(id, name, kind);

            // 201 if something is created
            res.status(201).json({ result: newCompany });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    public edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, name, kind } = req.body;

            const result = await this.CompanyService.editCompany(id, name, kind);

            if (!result) {
                res.status(400).json({ message: 'id does not specify a valid company id' });
            }
            else {
                // Status is ok 200 as nothing has been created
                res.status(200).json({ result });
            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id } = req.body;

            const success = await this.CompanyService.deleteCompany(id);

            if (!success) {
                res.status(400).json({ message: 'id does not specify a valid company id' });
            }
            else {
                // Status is ok 200 as nothing has been created
                res.status(200).json({ success });
            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    // private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    //     try {

    //         // const { email, password } = req.body;
    //         // const token = await this.PersonService.loginWithEmail(email, password);

    //         const { username, password } = req.body;
    //         const token = await this.PersonService.loginWithUsername(username, password);

    //         // Status is ok 200 as nothing has been created
    //         res.status(200).json({ token });

    //     }
    //     catch (error: any) {
    //         next(new HttpException(400, error.message));
    //     }

    // };

    // private getPerson = (req: Request, res: Response, next: NextFunction): Response | void => {

    //     if (!req.user) {
    //         return next(new HttpException(404, 'No logged in user'));
    //     }

    //     res.status(200).json({ user: req.user });

    // };

    // private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    //     try {

    //         const persons = await this.PersonService.getPersons();

    //         if (Array.isArray(persons) && persons.length > 0) {

    //             // Status is ok 200 as nothing has been created
    //             res.status(200).json({ persons });

    //         }
    //         else if (Array.isArray(persons) && persons.length === 0) {

    //             // Status 204 - No content
    //             res.status(204).json()

    //         }

    //     }
    //     catch (error: any) {
    //         next(new HttpException(400, error.message));
    //     }

    // };

    // private editPerson = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    //     try {

    //         const { id } = req.body;
    //         const personToEdit = await this.PersonService.getById(id);

    //         if (!personToEdit || personToEdit instanceof Error) {

    //             // Status 204 - No content
    //             res.status(204).json('id does not specify a valid person');


    //         }
    //         else {

    //             personToEdit.set({
    //                 username: req.body.username ?? personToEdit.getDataValue('username'),
    //                 email: req.body.email ?? personToEdit.getDataValue('email'),
    //                 kind: req.body.kind ?? personToEdit.getDataValue('kind')
    //             });
    //             personToEdit.save();

    //             // Status is ok 200 as nothing has been created
    //             res.status(200).json({ personToEdit });

    //         }

    //     }
    //     catch (error: any) {
    //         next(new HttpException(400, error.message));
    //     }

    // };

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

export default CompanyController;
