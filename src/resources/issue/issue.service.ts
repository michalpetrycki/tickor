import Issue from '@/resources/issue/issue.model';
import IssueModel from '@/resources/issue/issue.model';
import IssueCategory from '@/resources/issue-category/issue-category.model';
import IssueStatus from '@/resources/issue-status/issue-status.model';
import adze from 'adze';
import { CreateOptions, WhereOptions } from 'sequelize';

class IssueService {

    private issueModel = IssueModel;

    public async getById(id: number): Promise<IssueModel | null> {
        return this.issueModel.findByPk(id);
    }

    public async getByStatusID(statusID: number): Promise<IssueModel[] | null> {
        return this.issueModel.findAll({
            where: {
                statusID
            }
        });
    }

    public async getByCategoryID(categoryID: number): Promise<IssueModel[] | null> {
        return this.issueModel.findAll({
            where: {
                categoryID
            }
        });
    }

    public async getBySubject(subject: string): Promise<IssueModel[] | null> {
        return this.issueModel.findAll({
            where: {
                subject
            }
        });
    }

    public async getByUpdated(updated: string): Promise<IssueModel[] | null> {
        return this.issueModel.findAll({
            where: {
                updated
            }
        });
    }

    public async getByName(name: string): Promise<IssueModel[] | null> {
        return this.issueModel.findAll({
            where: {
                name
            }
        });
    }

    public async lookupStatus(statusID: number): Promise<IssueStatus | null> {
        return IssueStatus.findByPk(statusID);
    }

    public async lookupCategory(categoryID: number): Promise<IssueCategory | null> {
        return IssueCategory.findByPk(categoryID);
    }

    // public async createIssue(subject: string, updated: string, name: string, categoryID: number): Promise<Error | IssueModel> {
    //     try {

    //         let issue: CreateOptions<any> = {
    //             fields: [
    //                 1
    //             ]
    //         };

    //         // if (subject) {
    //         //     issue.subject = subject;
    //         // }
    //         // if (updated) {
    //         //     issue.updated = updated;
    //         // }
    //         // if (name) {
    //         //     issue.name = name;
    //         // }
    //         // if (categoryID) {
    //         //     issue.categoryID = categoryID;
    //         // }

    //         const newIssue = await this.issueModel.create(issue);
    //         adze().info('INFO - new issue successfully created');
    //         return newIssue;

    //     }
    //     catch (error) {
    //         throw new Error('ERROR - error during creation of issue. Reason => ' + error);
    //     }
    // }


    public async getIssues(filter?: WhereOptions): Promise<Error | Issue[]> {

        try {

            let whereStatement: any = {};

            // if (filter?.id) {
            //     whereStatement.id = filter.id;
            // }
            // if (filter?.categoryID) {
            //     whereStatement.categoryID = filter.categoryID;
            // }
            // if (filter?.name) {
            //     whereStatement.name = filter.name;
            // }
            // if (filter?.statusID) {
            //     whereStatement.statusID = filter.statusID;
            // }
            // if (filter?.subject) {
            //     whereStatement.subject = filter.subject;
            // }
            // if (filter?.updated) {
            //     whereStatement.updated = filter.updated;
            // }

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

    public async createIssue(subject: string, updated: string, name: string, categoryID: number): Promise<Error | IssueModel> {
        try {

            let issue: any = {
                statusID: 1
            };

            if (subject) {
                issue.subject = subject;
            }
            if (updated) {
                issue.updated = updated;
            }
            if (name) {
                issue.name = name;
            }
            if (categoryID) {
                issue.categoryID = categoryID;
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