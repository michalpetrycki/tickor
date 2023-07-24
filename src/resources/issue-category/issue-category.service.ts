import IssueCategoryModel from '@/resources/issue-category/issue-category.model';
import adze from 'adze';

class IssueCategoryService {

    private issueCategoryModel = IssueCategoryModel;

    public async getIssueCategories(): Promise<Error | IssueCategoryModel[]> {

        try {
            return IssueCategoryModel.findAll({});
        }
        catch (error) {
            throw new Error('Unable to get issue categories');
        }

    }

    public async getById(id: number): Promise<IssueCategoryModel | null> {
        return await this.issueCategoryModel.findByPk(id);
    }

    public async getByName(name: string): Promise<IssueCategoryModel | Error> {

        try {

            const issue = await this.issueCategoryModel.findOne({ where: { name } });

            if (!issue) {
                throw new Error(`Unable to find issue category with name ${name}.`);
            }
            else {
                return issue;
            }

        }
        catch (error) {
            throw new Error('ERROR - no issue category with given name found.');
        }

    }

    public async createIssueCategory(name: string): Promise<IssueCategoryModel | Error> {
        try {

            adze().info('CATEGORY ISSUE SERVICE - create issue category');
            const newIssueCategory = await this.issueCategoryModel.create({ name });
            adze().info('INFO - new issue category successfully created');
            adze().info('new category id: ', newIssueCategory.getDataValue('id'));
            return newIssueCategory;

        }
        catch (error) {
            throw new Error('ERROR - error during creation of issue category. Reason => ' + error);
        }

    }

    public async editIssueCategory(id: number, name: string): Promise<IssueCategoryModel | null> {

        const issueCategoryToEdit = await this.getById(id);

        if (!!issueCategoryToEdit) {
            issueCategoryToEdit.set({ name });
            issueCategoryToEdit.save();
        }

        return issueCategoryToEdit;

    }

    public async deleteIssueCategory(id: number): Promise<boolean> {
        try {

            let success = false;
            const issueCategoryToDelete = await this.getById(id);

            if (!!issueCategoryToDelete) {
                issueCategoryToDelete.destroy();
                success = true;
                adze().info(`INFO - issue category with id {${id}} successfully deleted`);
            }

            return success;

        }
        catch (error) {
            throw new Error('ERROR - error during deleting issue category. Reason => ' + error);
        }

    }

}

export default IssueCategoryService;
