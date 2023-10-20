import * as mapper from '@/resources/activity/activity.mapper';
import validate from '@/resources/activity/activity.validation';
import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import { Activity } from '@/resources/activity/activity.interface';
import ActivityService from '@/resources/activity/activity.service';
import validationMiddleware from '@/middleware/validation.middleware';
import { CreateActivityDTO, FilterActivitiesDTO, FilterActivitiesPaginatedDTO, UpdateActivityDTO } from '@/resources/activity/activity.dto';

// Controller has to be added in index.ts in Controller array in constructor
class ActivityController implements Controller {

    public path = '/activity';
    public router = Router();
    private activityService = new ActivityService();

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
            this.createActivity
        );

        this.router.post(
            `${this.path}/update`,
            [validationMiddleware(validate.edit)],
            // [validationMiddleware(validate.edit), authenticated],
            this.updateActivity
        );

        this.router.delete(
            `${this.path}/delete`,
            // [validationMiddleware(validate.deleteActivity), authenticated],
            this.deleteActivity
        );

    }

    private createActivity = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {

        const payload: CreateActivityDTO = req.body;
        try {
            const result = await this.create(payload);
            return res.status(200).json({ result });
        }
        catch (error: any) {
            next(error);
        }

    }

    private updateActivity = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const payload: UpdateActivityDTO = req.body;
        const result = await this.update(id, payload);
        return res.status(201).json({ result });
    }

    private deleteActivity = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const result = await this.delete(id);
        return res.status(204).json({ success: result });
    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterActivitiesDTO = req.body;
        const results = await this.getAll(filters);
        return res.status(200).json({ results });
    }

    private listPaginated = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterActivitiesPaginatedDTO = req.body;
        const results = await this.getPaginated(filters);
        return res.status(200).json({ results });
    }

    private create = async (payload: CreateActivityDTO): Promise<Activity> => {
        return mapper.toActivity(await this.activityService.createActivity(payload));
    }

    private update = async (id: number, payload: UpdateActivityDTO): Promise<Activity> => {
        return mapper.toActivity(await this.activityService.updateActivity(id, payload))
    }

    private delete = async (id: number): Promise<boolean> => {
        return await this.activityService.deleteActivity(id);
    }

    private getAll = async (filters: FilterActivitiesDTO): Promise<Activity[]> => {
        return (await this.activityService.listActivity(filters)).map(mapper.toActivity);
    }

    private getPaginated = async (filters: FilterActivitiesPaginatedDTO): Promise<Activity[]> => {
        return (await this.activityService.listPaginated(filters)).map(mapper.toActivity);
    }

}

export default ActivityController;
