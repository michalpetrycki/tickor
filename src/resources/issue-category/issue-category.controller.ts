import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import * as mapper from '@/resources/issue-category/issue-category.mapper';
import IssueCategoryService from '@/resources/issue-category/issue-category.service';
import { IssueCategory } from '@/resources/issue-category/issue-category.interface';
import { CreateIssueCategoryDTO, FilterIssueCategoriesDTO, FilterIssueCategoriesPaginatedDTO, UpdateIssueCategoryDTO } from '@/resources/issue-category/issue-category.dto';

// Controller has to be added in index.ts in Controller array in constructor
class IssueCategoryController implements Controller {

    public path = '/issue-category';
    public router = Router();
    private issueCategoryService = new IssueCategoryService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/create`,
            // [validationMiddleware(validate.create)],
            this.createIssueCategory
        );

        this.router.post(
            `${this.path}/update`,
            // validationMiddleware(validate.edit),
            this.updateIssueCategory
        );

        this.router.delete(
            `${this.path}/delete`,
            // validationMiddleware(validate.deleteCompany),
            this.delete
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

    private createIssueCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const payload: CreateIssueCategoryDTO = req.body;
        const result = await this.create(payload);
        return res.status(200).json({ result });
    }

    private updateIssueCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const payload: UpdateIssueCategoryDTO = req.body;
        const result = await this.update(id, payload);
        return res.status(201).json({ result });
    }

    private deleteIssueCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const result = await this.delete(id);
        return res.status(204).json({ success: result });
    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterIssueCategoriesDTO = req.body;
        const results = await this.getAll(filters);
        return res.status(200).json({ results });
    }

    private listPaginated = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterIssueCategoriesPaginatedDTO = req.body;
        const results = await this.getPaginated(filters);
        return res.status(200).json({ results });
    }

    private create = async (payload: CreateIssueCategoryDTO): Promise<IssueCategory> => {
        return mapper.toIssueCategory(await this.issueCategoryService.createIssueCategory(payload));
    }

    private update = async (id: number, payload: UpdateIssueCategoryDTO): Promise<IssueCategory> => {
        return mapper.toIssueCategory(await this.issueCategoryService.updateIssueCategory(id, payload))
    }

    private delete = async (id: number): Promise<boolean> => {
        return await this.issueCategoryService.deleteIssueCategory(id);
    }

    private getAll = async (filters: FilterIssueCategoriesDTO): Promise<IssueCategory[]> => {
        return (await this.issueCategoryService.listIssueCategories(filters)).map(mapper.toIssueCategory);
    }

    private getPaginated = async (filters: FilterIssueCategoriesPaginatedDTO): Promise<IssueCategory[]> => {
        return (await this.issueCategoryService.listPaginated(filters)).map(mapper.toIssueCategory);
    }

}

export default IssueCategoryController;
