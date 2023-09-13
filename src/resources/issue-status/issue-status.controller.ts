import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import * as mapper from '@/resources/issue-status/issue-status.mapper';
import { IssueStatus } from '@/resources/issue-status/issue-status.interface';
import IssueStatusService from '@/resources/issue-status/issue-status.service';
import { FilterClientsDTO, FilterClientsPaginatedDTO } from '@/resources/client/client.dto';
import { CreateIssueStatusDTO, FilterIssueStatusesDTO, FilterIssueStatusesPaginatedDTO, UpdateIssueStatusDTO } from '@/resources/issue-status/issue-status.dto';

// Controller has to be added in index.ts in Controller array in constructor
class IssueStatusController implements Controller {

    public path = '/issue-status';
    public router = Router();
    private issueStatusService = new IssueStatusService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/create`,
            // [validationMiddleware(validate.create)],
            this.createIssueStatus
        );

        this.router.post(
            `${this.path}/update`,
            // validationMiddleware(validate.edit),
            this.updateIssueStatus
        );

        this.router.delete(
            `${this.path}/delete`,
            // validationMiddleware(validate.deleteCompany),
            this.deleteIssueStatus
        );

        this.router.post(
            `${this.path}/list`,
            // validationMiddleware(validate.list),
            this.list
        );

        this.router.post(
            `${this.path}/listPaginated`,
            // validationMiddleware(validate.listPagindated),
            this.listPaginated
        );

    }

    private createIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const payload: CreateIssueStatusDTO = req.body;
        const result = await this.create(payload);
        return res.status(200).json({ result });
    }

    private updateIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const payload: UpdateIssueStatusDTO = req.body;
        const result = await this.update(id, payload);
        return res.status(201).json({ result });
    }

    private deleteIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const result = await this.delete(id);
        return res.status(204).json({ success: result });
    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterIssueStatusesDTO = req.body;
        const results = await this.getAll(filters);
        return res.status(200).json({ results });
    }

    private listPaginated = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterIssueStatusesPaginatedDTO = req.body;
        const results = await this.getPaginated(filters);
        return res.status(200).json({ results });
    }

    private create = async (payload: CreateIssueStatusDTO): Promise<IssueStatus> => {
        return mapper.toIssueStatus(await this.issueStatusService.createIssueStatus(payload));
    }

    private update = async (id: number, payload: UpdateIssueStatusDTO): Promise<IssueStatus> => {
        return mapper.toIssueStatus(await this.issueStatusService.updateIssueStatus(id, payload))
    }

    private delete = async (id: number): Promise<boolean> => {
        return await this.issueStatusService.deleteIssueStatus(id);
    }

    private getAll = async (filters: FilterClientsDTO): Promise<IssueStatus[]> => {
        return (await this.issueStatusService.listIssueStatuses(filters)).map(mapper.toIssueStatus);
    }

    private getPaginated = async (filters: FilterClientsPaginatedDTO): Promise<IssueStatus[]> => {
        return (await this.issueStatusService.listPaginated(filters)).map(mapper.toIssueStatus);
    }

}

export default IssueStatusController;
