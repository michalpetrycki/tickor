import { IssueStatus } from "@/resources/issue-status/issue-status.interface";
import { IssueStatusOutput } from "@/resources/issue-status/issue-status.model";

export const toIssueStatus = (issueStatus: IssueStatusOutput): IssueStatus => {
    return {
        id: issueStatus.id,
        name: issueStatus.name,
        createdAt: issueStatus.createdAt,
        updatedAt: issueStatus.updatedAt
    }
}
