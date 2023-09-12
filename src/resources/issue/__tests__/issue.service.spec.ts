import IssueModel from "@/resources/issue/issue.model";
import IssueService from "@/resources/issue/issue.service";
import IssueCategoryModel from '@/resources/issue-category/issue-category.model';
import IssueCategoryService from "@/resources/issue-category/issue-category.service";
import IssueStatusService from "@/resources/issue-status/issue-status.service";
import IssueStatusModel from "@/resources/issue-status/issue-status.model";

let id: number;
let subject: string;
let updated: string;
let name: string;
let categoryID: number;
let issue: IssueModel | Error;
let issueCategory: IssueCategoryModel | Error;
let issueService: IssueService;
let issueCategoryService: IssueCategoryService;
let issueStatus: IssueStatusModel | Error;
let issueStatusService: IssueStatusService

beforeEach(async () => {
    issueService = new IssueService();

    await new Promise(resolve => setTimeout(resolve)).then(async() => {
        IssueModel.destroy({ truncate: true, restartIdentity: true });
    });

});

describe('create', () => {

    it('should create issue and return object with correct id and name', async () => {

        

        // issueStatusService = new IssueStatusService();
        // issueStatus = <IssueStatusModel> await issueStatusService.createIssue();

        // issueCategoryService = new IssueCategoryService();
        // issueCategory = <IssueCategoryModel> await issueCategoryService.createIssueCategory('Example category');

        // subject = 'Example subject';
        // updated = 'Example updated';
        // name = 'Example name';
        // categoryID = issueCategory.getDataValue('id');

        // issue = <IssueModel>await issueService.createIssue(subject, updated, name, categoryID);

        // expect(typeof issue).toBe('object');

        // expect(typeof issue.dataValues.subject).toBe('string');
        // expect(issue.dataValues.subject).toBe(subject);

        // expect(typeof issue.dataValues.updated).toBe('string');
        // expect(issue.dataValues.updated).toBe(updated);

        // expect(typeof issue.dataValues.name).toBe('string');
        // expect(issue.dataValues.name).toBe(name);

        // expect(typeof issue.dataValues.categoryID).toBe('string');
        // expect(issue.dataValues.categoryID).toBe(categoryID);

    });

});

// describe('get by', async () => {

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
        
//         Promise.all([
//             clientService.createClient('First example', kind),
//             clientService.createClient('Second example', kind),
//             clientService.createClient('Third example', kind),
//         ]).then(async(clients) => {

//             const fetchClients: ClientModel[] = <ClientModel[]>await clientService.listClients();
//             const fetchClientsIds: number[] = fetchClients.map((client: ClientModel) => client.getDataValue('id'));

//             let containsAll = true;


//             clients.forEach((client: ClientModel | Error) => {

//                 if (client instanceof ClientModel) {
//                     containsAll = fetchClientsIds.includes(client.getDataValue('id'));
//                 }

//             });

//             expect(containsAll).toBe(true);

//         });

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
//         expect(true).toBe(true);
//         expect(clientDeleted).toBe(true);
//         expect(itemsCountBeforeDeletion - itemsCountAfterDeletion).toBe(1);

//     });

// });
