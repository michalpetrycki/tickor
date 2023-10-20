import { IssueCategory } from "@/resources/issue-category/issue-category.interface";
import { IssueCategoryOutput } from "@/resources/issue-category/issue-category.model";

export const toIssueCategory = (issueCategory: IssueCategoryOutput): IssueCategory => {
    return {
        id: issueCategory.id,
        name: issueCategory.name
    }
}
