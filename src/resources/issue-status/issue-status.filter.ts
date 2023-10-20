import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllIssueStatusesFilters {
    name?: string;
};

export interface GetIssueStatusesPaginatedFilters extends GetAllIssueStatusesFilters, PaginationFilters { };
