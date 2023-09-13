import * as issueStatusDal from '@/resources/issue-status/issue-status.dal';
import { GetAllClientsFilters, GetClientsPaginatedFilters } from "@/resources/client/client.filter";
import IssueStatus, { IssueStatusInput, IssueStatusOutput } from "@/resources/issue-status/issue-status.model";

class IssueStatusService {

    public async getById(id: number): Promise<IssueStatus> {
        return issueStatusDal.getById(id);
    }

    public async getByName(name: string): Promise<IssueStatus[]> {
        return issueStatusDal.getByName(name);
    }

    public async createIssueStatus(payload: IssueStatusInput): Promise<IssueStatusOutput> {
        return issueStatusDal.createIssueStatus(payload);
    }

    public async updateIssueStatus(id: number, editProperties: Partial<IssueStatusInput>): Promise<IssueStatusOutput> {
        return issueStatusDal.updateIssueStatus(id, editProperties);
    }

    public async deleteIssueStatus(id: number): Promise<boolean> {
        return issueStatusDal.deleteIssueStatus(id);
    }

    public async listIssueStatuses(filters?: GetAllClientsFilters): Promise<IssueStatusOutput[]> {
        return issueStatusDal.listIssueStatuses(filters);
    }

    public async listPaginated(filters?: GetClientsPaginatedFilters): Promise<IssueStatusOutput[]> {
        return issueStatusDal.listPaginated(filters);
    }

}

export default IssueStatusService;
