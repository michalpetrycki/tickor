import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllProjectsFilters {
    name?: string;
    active?: boolean;
    clientID?: number;
    createdAt?: string;
    updatedAt?: string;
};

export interface GetProjectsPaginatedFilters extends GetAllProjectsFilters, PaginationFilters { };
