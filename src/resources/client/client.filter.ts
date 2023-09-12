import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllClientsFilters {
    name?: string;
    kind?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface GetClientsPaginatedFilters extends GetAllClientsFilters, PaginationFilters { };
