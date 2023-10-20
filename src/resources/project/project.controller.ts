import * as mapper from '@/resources/project/project.mapper';
import validate from '@/resources/project/project.validation';
import { Project } from '@/resources/project/project.interface';
import ProjectService from '@/resources/project/project.service';
import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import { CreateProjectDTO, FilterProjectsDTO, FilterProjectsPaginatedDTO, UpdateProjectDTO } from '@/resources/project/project.dto';

// Controller has to be added in index.ts in Controller array in constructor
class ProjectController implements Controller {

    public path = '/project';
    public router = Router();
    private projectService = new ProjectService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create)],
            this.createProject
        );

        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validate.edit),
            this.updateProject
        );

        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.remove),
            this.deleteProject
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

    private createProject = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const payload: CreateProjectDTO = req.body;
        const result = await this.create(payload);
        return res.status(200).json({ result });
    }

    private updateProject = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const payload: UpdateProjectDTO = req.body;
        const result = await this.update(id, payload);
        return res.status(201).json({ result });
    }

    private deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const result = await this.delete(id);
        return res.status(204).json({ success: result });
    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {

        try {
            const filters: FilterProjectsDTO = req.body;
            const results = await this.getAll(filters);
            return res.status(200).json({ results });
        }
        catch (error: any) {
            next(error);
        }

    }

    private listPaginated = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterProjectsPaginatedDTO = req.body;
        const results = await this.getPaginated(filters);
        return res.status(200).json({ results });
    }

    private create = async (payload: CreateProjectDTO): Promise<Project> => {
        return mapper.toProject(await this.projectService.createProject(payload));
    }

    private update = async (id: number, payload: UpdateProjectDTO): Promise<Project> => {
        return mapper.toProject(await this.projectService.updateProject(id, payload))
    }

    private delete = async (id: number): Promise<boolean> => {
        return await this.projectService.deleteProject(id);
    }

    private getAll = async (filters: FilterProjectsDTO): Promise<Project[]> => {
        return (await this.projectService.listProjects(filters)).map(mapper.toProject);
    }

    private getPaginated = async (filters: FilterProjectsPaginatedDTO): Promise<Project[]> => {
        return (await this.projectService.listPaginated(filters)).map(mapper.toProject);
    }

}

export default ProjectController;
