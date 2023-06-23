import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/project/project.validation';
import status from 'http-status';
import ProjectService from '@/resources/project/project.service';

// Controller has to be added in index.ts in Controller array in constructor
class ProjectController implements Controller {

    public path = '/project';
    public router = Router();
    private ProjectService = new ProjectService();

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
            validationMiddleware(validate.remove),
            this.delete
        );

        this.router.get(
            `${this.path}/list`,
            // validationMiddleware(validate.list),
            this.list
        );

    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, name, active, clientID, logo } = req.body;

            const newProject = await this.ProjectService.createProject(id, name, active, clientID, logo);

            // 201 if something is created
            res.status(201).json({ status: 201, message: status[201], result: newProject });

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

    public edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const { id, name, kind, logo } = req.body;

            const result = await this.ProjectService.editProject(id, name, kind, logo);

            if (!result) {
                res.status(400).json({ message: 'id does not specify a valid project id' });
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

            const success = await this.ProjectService.deleteProject(id);

            if (!success) {
                res.status(400).json({ message: 'id does not specify a valid project id' });
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

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

        try {

            const projects = await this.ProjectService.listProjects();

            if (Array.isArray(projects) && projects.length > 0) {

                // Status is ok 200 as nothing has been created
                res.json({ status: 200, message: status[200], results: projects });

            }
            else if (Array.isArray(projects) && projects.length === 0) {

                // Status 204 - No content
                res.json({ status: 204, message: status[204] });

            }

        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };

}

export default ProjectController;
