import { GetAllClientsFilters, GetClientsPaginatedFilters } from '@/resources/client/client.filter';
import ClientModel, { ClientInput, ClientOutput } from '@/resources/client/client.model';
import * as clientDal from '@/resources/client/client.dal';
import Client from '@/resources/client/client.model';

class ClientService {

    private clientModel = ClientModel;

    public async getById(id: number): Promise<Client> {
        return clientDal.getById(id);
    }

    public async getByName(name: string): Promise<Client[]> {
        return clientDal.getByName(name);
    }

    public async getByKind(kind: string): Promise<Client[] | null> {
        return clientDal.getByKind(kind);
    }

    public async createClient(payload: ClientInput): Promise<ClientOutput> {
        return clientDal.createClient(payload);
    }

    public async updateClient(id: number, editProperties: Partial<ClientInput>): Promise<ClientOutput> {
        return clientDal.updateClient(id, editProperties);
    }

    public async deleteClient(id: number): Promise<boolean> {
        return clientDal.deleteClient(id);
    }

    public async listClients(filters?: GetAllClientsFilters): Promise<ClientOutput[]> {
        return clientDal.listClients(filters);
    }

    public async listPaginated(filters?: GetClientsPaginatedFilters): Promise<ClientOutput[]> {
        return clientDal.listPaginated(filters);
    }

}

export default ClientService;
