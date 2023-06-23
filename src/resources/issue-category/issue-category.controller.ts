import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/issue-category/issue-category.validation';
import authenticated from '@/middleware//authenticated.middleware';
import status from 'http-status';
import IssueCategoryService from '@/resources/issue-category/issue-category.service';

// Controller has to be added in index.ts in Controller array in constructor
class IssueCategoryController implements Controller {

    public path = '/issue-category';
    public router = Router();
    private IssueCategoryService = new IssueCategoryService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/listIssueCategories`,
            // authenticated,
            this.list
        );

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create)],
            this.create
        );

        this.router.post(
            `${this.path}/edit`,
            authenticated,
            this.edit
        );

        this.router.delete(
            `${this.path}/delete`,
            [validationMiddleware(validate.deleteIssue), authenticated],
            this.delete
        );

    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            // const { id } = req.body;
            // const issues = await this.IssueCategoryService.getIssues(id);

            // if ((typeof issues === 'object' && issues !== null) || (Array.isArray(issues) && issues.length > 0)) {

            //     // Status is ok 200 as nothing has been created
            //     res.json({ status: 200, message: status[200], results: issues });

            // }
            // else if (Array.isArray(issues) && issues.length === 0) {

            //     // Status 204 - No content
            //     res.json({ status: 204, message: status[204] });

            // }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            // const { statusID, subject, updated, name, categoryID } = req.body;

            // const newIssue = await this.IssueCategoryService.createIssue(statusID, subject, updated, name, categoryID);

            // res.status(201).json({ status: 201, message: status[201], result: newIssue });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, statusID, subject, updated, name, categoryID } = req.body;

            const result = await this.IssueCategoryService.editIssue(id, statusID, subject, updated, name, categoryID);

            if (!result) {
                res.status(400).json({ message: 'id does not specify a valid issue id' });
            }
            else {
                res.status(200).json({ result });
            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id } = req.body;

            const success = await this.IssueCategoryService.deleteIssue(id);

            if (!success) {
                res.status(400).json({ message: 'id does not specify a valid issue id' });
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

}

export default IssueCategoryController;
