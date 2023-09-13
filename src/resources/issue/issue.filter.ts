import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllIssuesFilters {
    statusID?: number;
    subject?: string;
    name?: string;    
    categoryID?: number;
    createdAt?: string;
    updatedAt?: string;
};

export interface GetIssuesPaginatedFilters extends GetAllIssuesFilters, PaginationFilters { };
