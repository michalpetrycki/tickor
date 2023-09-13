import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllIssueCategoriesFilters {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface GetIssueCategoriesPaginatedFilters extends GetAllIssueCategoriesFilters, PaginationFilters { };
