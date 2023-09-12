import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateClientDTO = {
    name: string;
    kind: string;
    logo: string;
}

export type UpdateClientDTO = Optional<CreateClientDTO, 'name' | 'kind' | 'logo'>

export type FilterClientDTO = {
    name?: string;
    kind?: string;
    logo?: string;
}

export type FilterClientPaginatedDTO = FilterClientDTO & PaginationFiltersDTO;
