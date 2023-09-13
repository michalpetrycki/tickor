import * as issueCategoryDal from '@/resources/issue-category/issue-category.dal';
import { GetAllIssueCategoriesFilters, GetIssueCategoriesPaginatedFilters } from '@/resources/issue-category/issue-category.filter';
import IssueCategory, { IssueCategoryInput, IssueCategoryOutput } from '@/resources/issue-category/issue-category.model';


class IssueCategoryService {

    public async getById(id: number): Promise<IssueCategory> {
        return issueCategoryDal.getById(id);
    }

    public async getByName(name: string): Promise<IssueCategory[]> {
        return issueCategoryDal.getByName(name);
    }

    public async createIssueCategory(payload: IssueCategoryInput): Promise<IssueCategoryOutput> {
        return issueCategoryDal.createIssueCategory(payload);
    }

    public async updateIssueCategory(id: number, editProperties: Partial<IssueCategoryInput>): Promise<IssueCategoryOutput> {
        return issueCategoryDal.updateIssueCategory(id, editProperties);
    }

    public async deleteIssueCategory(id: number): Promise<boolean> {
        return issueCategoryDal.deleteIssueCategory(id);
    }

    public async listIssueCategories(filters?: GetAllIssueCategoriesFilters): Promise<IssueCategoryOutput[]> {
        return issueCategoryDal.listIssueCategories(filters);
    }

    public async listPaginated(filters?: GetIssueCategoriesPaginatedFilters): Promise<IssueCategoryOutput[]> {
        return issueCategoryDal.listPaginated(filters);
    }

}

export default IssueCategoryService;
