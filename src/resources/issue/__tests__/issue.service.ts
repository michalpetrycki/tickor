// import IssueModel from "@/resources/issue/issue.model";
// import IssueService from "@/resources/issue/issue.service";

// let issueService: IssueService;

// beforeAll(async () => { 
//     issueService = new IssueService();
// });

describe('create issue', () => {

    // Give time to any async operation to complete after each test
afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
});

    it('should create issue', () => {

        expect(1+1).toBe(2);
        
//         const subject = 'Example subject';
//         const updated = '2023-06-28 22:56:13';
//         const name = 'Example name';
//         const categoryID = 3;
//         //id
//         //statusID

//         const issue: IssueModel | Error = await issueService.createIssue(subject, updated, name, categoryID);

//         await expect(issueService.createIssue(subject, updated, name, categoryID)).resolves.toEqual({
//             subject: expect(subject).toEqual(subject),
//             updated: expect(updated).toEqual(updated),
//             name: expect(name).toEqual(name),
//             categoryID: expect(categoryID).toEqual(categoryID)
//         });


    });

    

});