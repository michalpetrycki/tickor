import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllIssuesFilters {
    id?: number;
    statusID?: number;
    subject?: string;
    name?: string;    
    categoryID?: number;
    projectID?: number;
};

export interface GetIssuesPaginatedFilters extends GetAllIssuesFilters, PaginationFilters { };
