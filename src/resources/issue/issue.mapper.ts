import { Issue } from "@/resources/issue/issue.interface"
import { IssueOutput } from "@/resources/issue/issue.model"


export const toIssue = (issue: IssueOutput): Issue => {
    return {
        id: issue.id,
        statusID: issue.statusID,
        subject: issue.subject,
        name: issue.name,
        categoryID: issue.categoryID,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt
    }
}