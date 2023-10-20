import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllIssueCategoriesFilters {
    name?: string;
};

export interface GetIssueCategoriesPaginatedFilters extends GetAllIssueCategoriesFilters, PaginationFilters { };
