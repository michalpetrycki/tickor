import * as mapper from '@/resources/client/client.mapper';
import { Client } from '@/resources/client/client.interface';
import validate from '@/resources/company/company.validation';
import ClientService from '@/resources/client/client.service';
import Controller from '@/utils/interfaces/Controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import { CreateClientDTO, FilterClientsDTO, FilterClientsPaginatedDTO, UpdateClientDTO } from '@/resources/client/client.dto';

// Controller has to be added in index.ts in Controller array in constructor
class ClientController implements Controller {

    public path = '/client';
    public router = Router();
    private clientService = new ClientService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create)],
            this.createClient
        );

        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validate.edit),
            this.updateClient
        );

        this.router.delete(
            `${this.path}/delete`,
            validationMiddleware(validate.deleteCompany),
            this.deleteClient
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

    private createClient = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const payload: CreateClientDTO = req.body;
        const result = await this.create(payload);
        return res.status(200).json({ result });
    }

    private updateClient = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const payload: UpdateClientDTO = req.body;
        const result = await this.update(id, payload);
        return res.status(201).json({ result });
    }

    private deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.body;
        const result = await this.delete(id);
        return res.status(204).json({ success: result });
    }

    private list = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterClientsDTO = req.body;
        const results = await this.getAll(filters);
        return res.status(200).json({ results });
    }

    private listPaginated = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const filters: FilterClientsPaginatedDTO = req.body;
        const results = await this.getPaginated(filters);
        return res.status(200).json({ results });
    }

    private create = async (payload: CreateClientDTO): Promise<Client> => {
        return mapper.toClient(await this.clientService.createClient(payload));
    }

    private update = async (id: number, payload: UpdateClientDTO): Promise<Client> => {
        return mapper.toClient(await this.clientService.updateClient(id, payload))
    }

    private delete = async (id: number): Promise<boolean> => {
        return await this.clientService.deleteClient(id);
    }

    private getAll = async (filters: FilterClientsDTO): Promise<Client[]> => {
        return (await this.clientService.listClients(filters)).map(mapper.toClient);
    }

    private getPaginated = async (filters: FilterClientsPaginatedDTO): Promise<Client[]> => {
        return (await this.clientService.listPaginated(filters)).map(mapper.toClient);
    }

}

export default ClientController;
