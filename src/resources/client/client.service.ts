import ClientModel from '@/resources/client/client.model';
import adze from 'adze';

class ClientService {

    private clientModel = ClientModel;

    public async getById(id: number): Promise<ClientModel | null> {
        return await this.clientModel.findByPk(id);
    }

    public async getByName(name: string): Promise<ClientModel | Error> {

        try {

            const issue = await this.clientModel.findOne({ where: { name } });

            if (!issue) {
                throw new Error(`Unable to find client with name ${name}.`);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no client with given name found.');
        }

    }

    public async getByKind(kind: string): Promise<ClientModel | Error> {

        try {

            const issue = await this.clientModel.findOne({ where: { kind } });

            if (!issue) {
                throw new Error(`Unable to find client with kind ${kind}.`);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no client with given kind found.');
        }

    }

    public async createClient(name: string, kind: string, logo?: string): Promise<ClientModel | Error> {
        try {

            adze().info('CLIENT SERVICE - create client');
            const newClient = await this.clientModel.create({ name, kind, logo });
            adze().info('INFO - new client successfully created');
            return newClient;

        }
        catch (error) {
            throw new Error('ERROR - error during creation of client. Reason => ' + error);
        }

    }

    public async editClient(id: number, name: string, kind: string): Promise<ClientModel | null> {

        const clientToEdit = await this.getById(id);

        if (!!clientToEdit) {

            try {
                clientToEdit.set({
                    name: name ?? clientToEdit.getDataValue('name'),
                    kind: kind ?? clientToEdit.getDataValue('kind')
                });
                await clientToEdit.save();
                adze().info(`INFO - client edited successfully`);
            }
            catch (error: any) {
                throw new Error('ERROR - during updating the client. Reason => ' + error.message);
            }

        }

        return clientToEdit;

    }

    public async deleteClient(id: number): Promise<boolean> {
        try {

            let success = false;
            const clientToDelete = await this.getById(id);

            if (!!clientToDelete) {
                await clientToDelete.destroy();
                success = true;
                adze().info(`INFO - client with id {${id}} successfully deleted`);
            }

            return new Promise((resolve) => {
                resolve(success);
            });

        }
        catch (error) {
            throw new Error('ERROR - error during deleting the client. Reason => ' + error);
        }

    }

    public async listClients(): Promise<ClientModel[] | null> {

        try {
            const clients = await this.clientModel.findAll();
            adze().info('INFO - listClients - success');
            return clients;

        }
        catch (error) {
            throw new Error('ERROR - error during fetchig all clients. Reason => ' + error);
        }

    }

}

export default ClientService;
