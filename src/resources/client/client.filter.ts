import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllClientsFilters {
    name?: string;
    kind?: string;
};

export interface GetClientsPaginatedFilters extends GetAllClientsFilters, PaginationFilters { };
