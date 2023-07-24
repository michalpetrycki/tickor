import IssueCategoryModel from "@/resources/issue-category/issue-category.model";
import IssueCategoryService from "@/resources/issue-category/issue-category.service";
import adze from 'adze';

let issueCategoryService: IssueCategoryService;
let issueCategory: IssueCategoryModel | Error;
let id: number;
let name: string;

beforeAll(async () => {
    issueCategoryService = new IssueCategoryService();
});

// describe.each(Array(637).fill(null))('create issue category', () => {
describe('create issue category', () => {

    // it('should create issue category and return object with correct id and name', async () => {

    //     id = Number(await IssueCategoryModel.max('id')) + 1;
    //     name = 'Example name';

    //     issueCategory = await issueCategoryService.createIssueCategory(name);

    //     expect(typeof issueCategory).toBe('object');
    //     expect(issueCategory instanceof IssueCategoryModel).toBe(true);

    //     issueCategory = <IssueCategoryModel>issueCategory;

    //     const newCategoryID = issueCategory.getDataValue('id');
    //     const newCategoryName = issueCategory.getDataValue('name');

    //     expect(typeof newCategoryID).toBe('number');
    //     expect(typeof newCategoryName).toBe('string');
    //     expect(newCategoryID).toEqual(id);
    //     expect(newCategoryName).toBe(name);
    //     expect(issueCategory.dataValues).toEqual({ id, name });

    // });

    // it('should edit existing issue category and return object with updated fields', async () => {

    //     const lastIssueCategory = await IssueCategoryModel.findOne({
    //         order: [['id', 'DESC']]
    //     });
    //     const lastIssueCategoryId = lastIssueCategory?.getDataValue('id');
    //     let issueCategory = await issueCategoryService.getById(lastIssueCategoryId);
    //     const updatedName = 'another test name';
    //     issueCategory = await issueCategoryService.editIssueCategory(issueCategory?.getDataValue('id'), updatedName);

    //     const updatedCategoryName = issueCategory?.getDataValue('name');  
    //     const updatedCategoryId = issueCategory?.getDataValue('id');

    //     expect(typeof issueCategory).toBe('object');
    //     expect(issueCategory instanceof IssueCategoryModel).toBe(true);
    //     expect(typeof updatedCategoryName).toBe('string');
    //     expect(typeof updatedCategoryId).toBe('number');
    //     expect(updatedCategoryName).toBe(updatedName);
    //     expect(updatedCategoryId).toBe(lastIssueCategoryId);

    // });

    it('should remove issue category and return updated number of rows', async () => {

        const testIssueCategory = await issueCategoryService.createIssueCategory('example');
        const itemsCountBeforeDeletion = await IssueCategoryModel.count();
        const lastIssueCategory = await IssueCategoryModel.findOne({
            order: [['id', 'DESC']]
        });
        const lastIssueCategoryId = lastIssueCategory?.getDataValue('id');
        const categoryDeleted = await issueCategoryService.deleteIssueCategory(lastIssueCategoryId);
        const itemsCountAfterDeletion = await IssueCategoryModel.count();

        expect(typeof categoryDeleted).toBe('boolean');
        expect(categoryDeleted).toBe(true);
        expect(itemsCountBeforeDeletion - itemsCountAfterDeletion).toBe(1);

    });

    // it('should throw an error and display valid error message for name exceeding max length', async () => {

    //     // name = 'abcd'.repeat(11);

    //     // issueCategory = await issueCategoryService.createIssueCategory(name);

    //     //     adze().info('===============================================================' + typeof issueCategory);

    //     // expect(await issueCategoryService.createIssueCategory(name)).toThrow(`ERROR - error during creation of issue category. Reason => SequelizeDatabaseError: String or binary data would be truncated in table 'Tickor.dbo.IssueCategory', column 'name'. Truncated value: 'abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd'.`);

    //     const t = () => {
    //         throw new TypeError("UNKNOWN ERROR");
    //     };
    //     expect(issueCategoryService.createIssueCategory(name)).toThrow(Error);
    //     expect(t).toThrow("UNKNOWN ERROR");

    //     adze().info('it should throw');

    // });

});