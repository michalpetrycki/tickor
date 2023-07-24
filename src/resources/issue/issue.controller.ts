import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/issue/issue.validation';
import authenticated from '@/middleware//authenticated.middleware';
import status from 'http-status';
import IssueService from '@/resources/issue/issue.service';

// Controller has to be added in index.ts in Controller array in constructor
class IssueController implements Controller {

    public path = '/issue';
    public router = Router();
    private IssueService = new IssueService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/list`,
            // authenticated,
            this.list
        );

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create)],
            // [validationMiddleware(validate.create), authenticated],
            this.create
        );

        this.router.post(
            `${this.path}/edit`,
            [validationMiddleware(validate.edit)],
            // [validationMiddleware(validate.edit), authenticated],
            this.edit
        );

        this.router.delete(
            `${this.path}/delete`,
            // [validationMiddleware(validate.deleteIssue), authenticated],
            this.delete
        );

    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, statusID, subject, updated, name, categoryID } = req.body;

            if (categoryID != null && await this.IssueService.lookupCategory(categoryID) === null) {
                next(new HttpException(400, 'categoryID does not specify a valid issue category ID'));
            }

            if (statusID != null && await this.IssueService.lookupStatus(statusID) === null) {
                next(new HttpException(400, 'statusID does not specify a valid issue status ID'));
            }

            const listFilter = Object.assign({},
                id == null ? null : { id },
                statusID == null ? null : { statusID },
                subject == null ? null : { subject },
                updated == null ? null : { updated },
                name == null ? null : { name },
                categoryID == null ? null : { categoryID },
            );

            const issues = await this.IssueService.getIssues(listFilter);

            if (issues) {
                // Status is ok 200 as nothing has been created
                res.json({ status: 200, message: status[200], results: issues });
            }
            else {
                // Status 204 - No content
                res.json({ status: 204, message: status[204] });
            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { subject, updated, name, categoryID } = req.body;

            if (name == null) {
                next(new HttpException(400, 'name should be a string'));
            }

            if (categoryID != null && await this.IssueService.lookupCategory(categoryID) === null) {
                next(new HttpException(400, 'categoryID does not specify a valid issue category ID'));
            }

            const newIssue = await this.IssueService.createIssue(subject, updated, name, categoryID);

            res.status(201).json({ status: 201, message: status[201], result: newIssue });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    private edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, statusID, subject, updated, name, categoryID } = req.body;

            if (id != null && this.IssueService.getById(id) === null) {
                next(new HttpException(400, 'id does not specify a valid issue ID'));
            }

            if (statusID != null && await this.IssueService.lookupStatus(statusID) === null) {
                next(new HttpException(400, 'statusID does not specify a valid issue status ID'));
            }

            if (name == null) {
                next(new HttpException(400, 'name should be a string'));
            }

            if (categoryID != null && await this.IssueService.lookupCategory(categoryID) === null) {
                next(new HttpException(400, 'categoryID does not specify a valid issue category ID'));
            }

            const result = await this.IssueService.editIssue(id, statusID, subject, updated, name, categoryID);

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

            if (id != null && this.IssueService.getById(id) === null) {
                next(new HttpException(400, 'id does not specify a valid issue ID'));
            }

            const success = await this.IssueService.deleteIssue(id);

            if (!success) {
                res.status(400).json({ message: 'issue deletion failed' });
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

export default IssueController;
