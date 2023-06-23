import IssueCategoryModel from '@/resources/issue-category/issue-category.model';
import Issue from '@/resources/issue/issue.model';
import IssueModel from '@/resources/issue/issue.model';

class IssueCategoryService {

    private issueCategoryModel = IssueCategoryModel;

    public async getIssues(): Promise<Error | Issue[]> {

        try {
            return Issue.findAll({});
        }
        catch (error) {
            throw new Error('Unable to get issues');
        }

    }

    public async getById(id: number): Promise<IssueModel | null> {
        return await this.issueCategoryModel.findByPk(id);
    }

    public async getByStatusID(statusID: number): Promise<Error | IssueCategoryModel> {

        try {

            const issue = await this.issueCategoryModel.findOne({ where: { statusID } });

            if (!issue) {
                throw new Error(`Unable to find issue with statusID = ${statusID} `);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no issue with given statusID found');
        }

    }

    public async getBySubject(subject: string): Promise<Error | IssueModel> {

        try {

            const issue = await this.issueCategoryModel.findOne({ where: { subject } });

            if (!issue) {
                throw new Error(`Unable to find issue with subject = ${subject} `);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no issue with given subject found');
        }

    }

    public async getByUpdated(updated: string): Promise<Error | IssueModel> {

        try {

            const issue = await this.issueCategoryModel.findOne({ where: { updated } });

            if (!issue) {
                throw new Error(`Unable to find issue with updated = ${updated} `);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no issue with given updated found');
        }

    }

    public async getByName(name: string): Promise<Error | IssueModel> {

        try {

            const issue = await this.issueCategoryModel.findOne({ where: { name } });

            if (!issue) {
                throw new Error(`Unable to find issue with name = ${name} `);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no issue with given name found');
        }

    }

    public async getByCategoryID(categoryID: number): Promise<Error | IssueModel> {

        try {

            const issue = await this.issueCategoryModel.findOne({ where: { categoryID } });

            if (!issue) {
                throw new Error(`Unable to find issue with categoryID = ${categoryID} `);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no issue with given categoryID found');
        }

    }

    public async createIssue(id: number, statusID: number, subject: string, updated: string, name: string, categoryID: number): Promise<Error | IssueModel> {
        try {

            const newIssue = await this.issueCategoryModel.create({ id, statusID, subject, updated, name, categoryID });
            console.log('INFO - new issue successfully created');
            return newIssue;

        }
        catch (error) {
            throw new Error('ERROR - error during creation of issue. Reason => ' + error);
        }

    }

    public async editIssue(id: number, statusID: number, subject: string, updated: string, name: string, categoryID: number): Promise<IssueModel | null> {

        const issueToEdit = await this.getById(id);

        if (!!issueToEdit) {
            issueToEdit.set({
                statusID: statusID ?? issueToEdit.getDataValue('statusID'),
                subject: subject ?? issueToEdit.getDataValue('subject'),
                updated: subject ?? issueToEdit.getDataValue('updated'),
                name: name ?? issueToEdit.getDataValue('name'),
                categoryID: categoryID ?? issueToEdit.getDataValue('categoryID')
            });
            issueToEdit.save();
        }

        return issueToEdit;

    }

    public async deleteIssue(id: number): Promise<boolean> {
        try {

            let success = false;
            const issueToDelete = await this.getById(id);

            if (!!issueToDelete) {
                issueToDelete.destroy();
                success = true;
                console.log(`INFO - issue with id {${id}} successfully deleted`);
            }

            return success;

        }
        catch (error) {
            throw new Error('ERROR - error during deleting issue. Reason => ' + error);
        }

    }

}

export default IssueCategoryService;
