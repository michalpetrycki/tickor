import ClientModel from "@/resources/client/client.model";
import ClientService from "@/resources/client/client.service";

let id: number;
let name: string;
let kind: string;
let logo: string;
let client: ClientModel | Error;
let clientService: ClientService;

beforeAll(async () => {
    clientService = new ClientService();
});

// Give time to any async operation to complete after each test
afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
});

describe('create', () => {



    it('should create client and return object with correct id and name', async () => {

        name = 'Example name';
        kind = 'person';
        logo = 'https://localhost:9999/test-logo.png';

        client = <ClientModel>await clientService.createClient(name, kind, logo);

        expect(typeof client).toBe('object');

        expect(typeof client.dataValues.name).toBe('string');
        expect(client.dataValues.name).toBe(name);

        expect(typeof client.dataValues.kind).toBe('string');
        expect(client.dataValues.kind).toBe(kind);

        expect(typeof client.dataValues.logo).toBe('string');
        expect(client.dataValues.logo).toBe(logo);

    });

});

// describe('get by', () => {

//     it('should return client object with correct id', async () => {

//         client = <ClientModel>await clientService.createClient('example', 'person');
//         id = client.dataValues.id;
//         client = <ClientModel>await clientService.getById(id);

//         expect(typeof client).toBe('object');
//         expect(client.dataValues.id).toBe(id);

//     });

//     it('should return client object with correct name', async () => {

//         name = 'Example';
//         kind = 'company';

//         client = <ClientModel>await clientService.createClient(name, kind);
//         client = <ClientModel>await clientService.getByName(name);

//         expect(typeof client).toBe('object');
//         expect(client.dataValues.name).toBe(name);

//     });

//     it('should return client object with correct kind', async () => {

//         name = 'Example';
//         kind = 'company';

//         client = <ClientModel>await clientService.createClient(name, kind);
//         client = <ClientModel>await clientService.getByName(name);

//         expect(typeof client).toBe('object');
//         expect(client.dataValues.kind).toBe(kind);

//     });

//     it('should return list of all clients', async () => {

//         kind = 'person';
//         let clients: ClientModel[] = [];
//         ['First', 'Second', 'Third'].forEach(async (nextName: string) => {

//             client = <ClientModel>await clientService.createClient(nextName + ' example', kind);
//             clients.push(client);

//         });

//         const fetchClients: ClientModel[] = <ClientModel[]>await clientService.listClients();

//         let containsAll = true;
//         clients.forEach((client: ClientModel) => {
//             containsAll = fetchClients.includes(client);
//         });

//         expect(containsAll).toBe(true);

//     });

// });

// describe('update', () => {

//     it('should edit existing client and return object with updated fields', async () => {

//         name = 'Example';
//         kind = 'person';

//         client = <ClientModel>(await clientService.createClient(name, kind));

//         id = client.dataValues.id;

//         const updatedName = name + ' updated';
//         const updatedKind = 'company';

//         client = <ClientModel>await clientService.editClient(id, updatedName, updatedKind);

//         expect(typeof client).toBe('object');

//         expect(typeof client.dataValues.id).toBe('number');
//         expect(client.dataValues.id).toBe(id);

//         expect(typeof client.dataValues.name).toBe('string');
//         expect(client.dataValues.name).toBe(updatedName);

//         expect(typeof client.dataValues.kind).toBe('string');
//         expect(client.dataValues.kind).toBe(updatedKind);

//     });

// });

// describe('delete', () => {

//     it('should remove client and return updated number of rows', async () => {

//         name = 'example';
//         kind = 'person';

//         client = <ClientModel>await clientService.createClient(name, kind);
//         id = client.dataValues.id;

//         const itemsCountBeforeDeletion = (await ClientModel.findAndCountAll()).count;
//         const clientDeleted = await clientService.deleteClient(id);
//         const itemsCountAfterDeletion = (await ClientModel.findAndCountAll()).count;

//         expect(typeof clientDeleted).toBe('boolean');
//         expect(clientDeleted).toBe(true);
//         expect(itemsCountBeforeDeletion - itemsCountAfterDeletion).toBe(1);

//     });

// });
