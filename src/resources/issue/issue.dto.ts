import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateIssueDTO = {
    statusID: number;
    subject: string;
    name: string;
    categoryID: number;
}

export type UpdateIssueDTO = Optional<CreateIssueDTO, 'statusID' | 'subject' | 'name' | 'categoryID'>

export type FilterIssuesDTO = {
    statusID?: number;
    subject?: string;
    name?: string;
    categoryID?: number;
}

export type FilterIssuesPaginatedDTO = FilterIssuesDTO & PaginationFiltersDTO;
