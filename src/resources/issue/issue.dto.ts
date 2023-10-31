import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateIssueDTO = {
    statusID: number;
    subject: string;
    name: string;
    categoryID: number;
    projectID: number;
    activity: any;
}

export type UpdateIssueDTO = Optional<CreateIssueDTO, 'statusID' | 'subject' | 'name' | 'categoryID' | 'projectID' | 'activity'>

export type FilterIssuesDTO = {
    statusID?: number;
    subject?: string;
    name?: string;
    categoryID?: number;
    projectID?: number;
}

export type FilterIssuesPaginatedDTO = FilterIssuesDTO & PaginationFiltersDTO;
