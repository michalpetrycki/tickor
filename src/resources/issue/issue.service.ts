import Issue from '@/resources/issue/issue.model';
import IssueModel from '@/resources/issue/issue.model';
import IssueCategory from '@/resources/issue-category/issue-category.model';
import IssueStatus from '@/resources/issue-status/issue-status.model';
import adze from 'adze';

class IssueService {

    private issueModel = IssueModel;

    public async lookupStatus(statusID: number): Promise<IssueStatus | null> {
        return IssueStatus.findByPk(statusID);
    }

    public async lookupCategory(categoryID: number): Promise<IssueCategory | null> {
        return IssueCategory.findByPk(categoryID);
    }

    public async getIssues(filter?: IssueListFilter): Promise<Error | Issue[]> {

        try {

            let whereStatement: any = {};

            if (filter?.id) {
                whereStatement.id = filter.id;
            }
            if (filter?.categoryID) {
                whereStatement.categoryID = filter.categoryID;
            }
            if (filter?.name) {
                whereStatement.name = filter.name;
            }
            if (filter?.statusID) {
                whereStatement.statusID = filter.statusID;
            }
            if (filter?.subject) {
                whereStatement.subject = filter.subject;
            }
            if (filter?.updated) {
                whereStatement.updated = filter.updated;
            }

            if (whereStatement) {
                return Issue.findAll({
                    where: whereStatement
                });
            }
            else {
                return Issue.findAll({});
            }

        }
        catch (error) {
            throw new Error('Unable to get issues');
        }

    }

    public async getById(id: number): Promise<IssueModel | null> {
        return await this.issueModel.findByPk(id);
    }

    public async getByStatusID(statusID: number): Promise<Error | IssueModel> {

        try {

            const issue = await this.issueModel.findOne({ where: { statusID } });

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

            const issue = await this.issueModel.findOne({ where: { subject } });

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

            const issue = await this.issueModel.findOne({ where: { updated } });

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

            const issue = await this.issueModel.findOne({ where: { name } });

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

            const issue = await this.issueModel.findOne({ where: { categoryID } });

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

    public async createIssue(subject: string, updated: string, name: string, categoryID: number): Promise<Error | IssueModel> {
        try {

            let issue: any = {
                id: 5,
                statusID: 1
            };

            if (subject) {
                issue.id = subject;
            }
            if (updated) {
                issue.categoryID = updated;
            }
            if (name) {
                issue.name = name;
            }
            if (categoryID) {
                issue.statusID = categoryID;
            }

            const newIssue = await this.issueModel.create(issue);
            adze().info('INFO - new issue successfully created');
            return newIssue;

        }
        catch (error) {
            throw new Error('ERROR - error during creation of issue. Reason => ' + error);
        }
    }

    public async editIssue(id: number, statusID: number, subject: string, updated: string, name: string, categoryID: number): Promise<IssueModel | null> {

        let issueToEdit = await this.getById(id);

        if (!!issueToEdit) {
            issueToEdit.set({
                statusID: statusID ?? issueToEdit.getDataValue('statusID'),
                subject: subject ?? issueToEdit.getDataValue('subject'),
                updated: updated ?? issueToEdit.getDataValue('updated'),
                name: name ?? issueToEdit.getDataValue('name'),
                categoryID: categoryID ?? issueToEdit.getDataValue('categoryID')
            });
            issueToEdit = await issueToEdit.save();
        }

        return issueToEdit;

    }

    public async deleteIssue(id: number): Promise<boolean> {
        try {

            let success = false;
            const issueToDelete = await this.getById(id);

            if (!!issueToDelete) {
                await issueToDelete.destroy();
                success = true;
                adze().info(`INFO - issue with id {${id}} successfully deleted`);
            }

            return new Promise((resolve) => {
                resolve(success);
            });

        }
        catch (error) {
            throw new Error('ERROR - error during deleting issue. Reason => ' + error);
        }

    }

}

export default IssueService;

export type IssueListFilter = {
    id?: number;
    statusID?: number;
    subject?: string;
    updated?: string;
    name?: string;
    categoryID?: number;
};