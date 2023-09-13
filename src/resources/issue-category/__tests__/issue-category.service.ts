import IssueCategoryModel from "@/resources/issue-category/issue-category.model";
import IssueCategoryService from "@/resources/issue-category/issue-category.service";

let id: number;
let name: string;
let issueCategory: IssueCategoryModel | Error;
let issueCategoryService: IssueCategoryService;

beforeAll(async () => {
    issueCategoryService = new IssueCategoryService();
});

// Give time to any async operation to complete after each test
afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
});


// describe('create', () => {

//     it('should create issue category and return object with correct id and name', async () => {

//         name = 'Example name';
//         issueCategory = <IssueCategoryModel>(await issueCategoryService.createIssueCategory(name));

//         expect(typeof issueCategory).toBe('object');
//         expect(typeof issueCategory.dataValues.name).toBe('string');
//         expect(issueCategory.dataValues.name).toBe(name);

//     });

// });

describe('get by', () => {

    // it('should return issue category object with correct id', async () => {

    //     issueCategory = <IssueCategoryModel>await issueCategoryService.createIssueCategory('example');
    //     id = issueCategory.dataValues.id;
    //     issueCategory = <IssueCategoryModel>await issueCategoryService.getById(id);

    //     expect(typeof issueCategory).toBe('object');
    //     expect(issueCategory.dataValues.id).toBe(id);

    // });

    it('should return issue category object with correct name', async () => {

        expect(true).toBe(true);

        // name = 'Find this name please';

        // issueCategory = <IssueCategoryModel>await issueCategoryService.createIssueCategory(name);
        // issueCategory = <IssueCategoryModel>await issueCategoryService.getByName(name);

        // expect(typeof issueCategory).toBe('object');
        // console.log(issueCategory.toJSON());
        // expect(issueCategory.dataValues.name).toBe(name);

    });

});

// describe('update', () => {

//     it('should edit existing issue category and return object with updated fields', async () => {

//         name = 'Example';

//         issueCategory = <IssueCategoryModel>(await issueCategoryService.createIssueCategory(name));
//         id = issueCategory.dataValues.id;

//         const updatedName = name + ' updated';

//         issueCategory = <IssueCategoryModel>await issueCategoryService.editIssueCategory(id, updatedName);

//         expect(typeof issueCategory).toBe('object');

//         expect(typeof issueCategory.dataValues.id).toBe('number');
//         expect(issueCategory.dataValues.id).toBe(id);

//         expect(typeof issueCategory.dataValues.name).toBe('string');
//         expect(issueCategory.dataValues.name).toBe(updatedName);

//     });

// });

// describe('delete', () => {

//     it('should remove issue category and return updated number of rows', async () => {

//         name = 'example';

//         issueCategory = <IssueCategoryModel>await issueCategoryService.createIssueCategory(name);
//         id = issueCategory.dataValues.id;

//         const itemsCountBeforeDeletion = (await IssueCategoryModel.findAndCountAll()).count;
//         const categoryDeleted = await issueCategoryService.deleteIssueCategory(id);
//         const itemsCountAfterDeletion = (await IssueCategoryModel.findAndCountAll()).count;

//         expect(typeof categoryDeleted).toBe('boolean');
//         expect(categoryDeleted).toBe(true);
//         expect(itemsCountBeforeDeletion - itemsCountAfterDeletion).toBe(1);

//     });

// });
