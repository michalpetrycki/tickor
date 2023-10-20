import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllProjectsFilters {
    name?: string;
    active?: boolean;
    clientID?: number;
};

export interface GetProjectsPaginatedFilters extends GetAllProjectsFilters, PaginationFilters { };
