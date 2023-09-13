import * as issueDal from '@/resources/issue/issue.dal';
import Issue, { IssueInput, IssueOutput } from "@/resources/issue/issue.model";
import { GetAllIssuesFilters, GetIssuesPaginatedFilters } from "@/resources/issue/issue.filter";

class IssueService {

    public async getById(id: number): Promise<Issue> {
        return issueDal.getById(id);
    }

    public async getByName(name: string): Promise<Issue[]> {
        return issueDal.getByName(name);
    }

    public async getBySubject(subject: string): Promise<Issue[]> {
        return issueDal.getBySubject(subject);
    }

    public async getByStatusID(statusID: number): Promise<Issue[]> {
        return issueDal.getByStatusID(statusID);
    }

    public async getByCategoryID(categoryID: number): Promise<Issue[]> {
        return issueDal.getByCategoryID(categoryID);
    }

    public async createIssue(payload: IssueInput): Promise<IssueOutput> {
        return issueDal.createIssue(payload);
    }

    public async updateIssue(id: number, editProperties: Partial<IssueInput>): Promise<IssueOutput> {
        return issueDal.updateIssue(id, editProperties);
    }

    public async deleteIssue(id: number): Promise<boolean> {
        return issueDal.deleteIssue(id);
    }

    public async listIssues(filters?: GetAllIssuesFilters): Promise<IssueOutput[]> {
        return issueDal.listIssues(filters);
    }

    public async listPaginated(filters?: GetIssuesPaginatedFilters): Promise<IssueOutput[]> {
        return issueDal.listPaginated(filters);
    }

}

export default IssueService;
