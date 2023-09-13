import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllIssueStatusesFilters {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface GetIssueStatusesPaginatedFilters extends GetAllIssueStatusesFilters, PaginationFilters { };
