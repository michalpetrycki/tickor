import { GetAllClientsFilters, GetClientsPaginatedFilters } from "@/resources/client/client.filter";
import Client, { ClientInput, ClientOutput } from "@/resources/client/client.model";
import { Op, Sequelize } from "sequelize";

export const createClient = async (payload: ClientInput): Promise<ClientOutput> => {
    const client = await Client.create(payload);
    return client;
}

export const updateClient = async (id: number, payload: Partial<ClientInput>): Promise<ClientOutput> => {
    const client = await Client.findByPk(id);

    if (!client) {
        throw new Error('id does not speciy a valid client id');
    }

    const updatedClient = await client.update(payload);
    return updatedClient;
}

export const deleteClient = async (id: number): Promise<boolean> => {
    const deletedClientCount = await Client.destroy({ where: { id } });
    return !!deletedClientCount;
}

export const listClients = async (filters?: GetAllClientsFilters): Promise<ClientOutput[]> => {
    return Client.findAll({ where: { ...filters } });
}

export const listPaginated = async (filters?: GetClientsPaginatedFilters): Promise<ClientOutput[]> => {
    const whereClause = buildWhereClause(filters?.filter);

    return Client.findAll({
        where: {
            [Op.or]: whereClause
        },
        limit: filters?.limit,
        offset: filters?.offset,
        order: [filters?.order || 'id'],
        // order: [filters?.order || 'id', filters?.sort || 'ASC'],
    });

}

export const getById = async (id: number): Promise<Client> => {
    const client = await Client.findByPk(id);

    if (!client) {
        throw new Error('id does not specify a valid client id');
    }
    return client;
}

export const getByName = async (name: string): Promise<Client[]> => {
    const clients = await Client.findAll({ where: { name } });

    if (!clients) {
        throw new Error('clients with name not found');
    }

    return clients;

}

export const getByKind = async (kind: string): Promise<Client[]> => {
    const clients = await Client.findAll({ where: { kind } });

    if (!clients) {
        throw new Error('clients with kind not found');
    }

    return clients;

}

const buildWhereClause = (filter: string | undefined) => {

    if (!filter) {
        return;
    }

    let filterClause = [];

    for (const key in Client.getAttributes()) {
        console.log(key);
        filterClause.push(Sequelize.where(
            Sequelize.cast(Sequelize.col(key), 'varchar'),
            { [Op.substring]: `${filter}` }
        ));
    }

    return filterClause;

};