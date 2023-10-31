import * as mapper from '@/resources/issue/issue.mapper';
import validate from '@/resources/issue/issue.validation';
import { Issue } from '@/resources/issue/issue.interface';
import IssueService from '@/resources/issue/issue.service';
import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import { CreateIssueDTO, UpdateIssueDTO, FilterIssuesDTO, FilterIssuesPaginatedDTO } from '@/resources/issue/issue.dto';
import { IssueOutput } from '@/resources/issue/issue.model';

// Controller has to be added in index.ts in Controller array in constructor
class IssueController implements Controller {

    public path = '/issue';
    public router = Router();
    private issueService = new IssueService();

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
            `${this.path}/listPaginated`,
            // validationMiddleware(validate.listPagindated),
            this.listPaginated
        );

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create)],
            // [validationMiddleware(validate.create), authenticated],
            this.createIssue
        );

        this.router.put(
            `${this.path}/update`,
            [validationMiddleware(validate.edit)],
            // [validationMiddleware(validate.edit), authenticated],
            this.updateIssue
        );

        this.router.delete(
            `${this.path}/delete`,
            // [validationMiddleware(validate.deleteIssue), authenticated],
            this.deleteIssue
        );

    }

    private createIssue = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const payload: CreateIssueDTO = req.body;

        try {
            const result = await this.create(payload);
            return res.status(200).json({ result });
        }
        catch (error: any) {
            next(error);
        }

    }

    private updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const { id } = req.body;
        const payload: UpdateIssueDTO = req.body;

        try {
            const result = await this.update(id, payload);
            return res.status(201).json({ result });
        }
        catch (error: any) {
            next(error);
        }

    }

    private deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const result = await this.delete(id);
        return res.status(204).json({ success: result });
    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterIssuesDTO = req.body;
        const results = await this.getAll(filters);
        return res.status(200).json({ results });
    }

    private listPaginated = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterIssuesPaginatedDTO = req.body;
        const results = await this.getPaginated(filters);
        return res.status(200).json({ results });
    }

    private create = async (payload: CreateIssueDTO): Promise<Issue> => {
        return mapper.toIssue(await this.issueService.createIssue(payload));
    }

    private update = async (id: number, payload: UpdateIssueDTO): Promise<Issue> => {
        return mapper.toIssue(await this.issueService.updateIssue(id, payload))
    }

    private delete = async (id: number): Promise<boolean> => {
        return await this.issueService.deleteIssue(id);
    }

    private getAll = async (filters: FilterIssuesDTO): Promise<IssueOutput[]> => {
        return ((await this.issueService.listIssues(filters)).map(mapper.toIssue));
    }

    private getPaginated = async (filters: FilterIssuesPaginatedDTO): Promise<Issue[]> => {
        return (await this.issueService.listPaginated(filters)).map(mapper.toIssue);
    }

}

export default IssueController;
