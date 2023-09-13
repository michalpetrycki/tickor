import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateIssueCategoryDTO = {
    name: string;
}

export type UpdateIssueCategoryDTO = Optional<CreateIssueCategoryDTO, 'name'>

export type FilterIssueCategoriesDTO = {
    name?: string;
}

export type FilterIssueCategoriesPaginatedDTO = FilterIssueCategoriesDTO & PaginationFiltersDTO;
