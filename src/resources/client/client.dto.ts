import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateClientDTO = {
    name: string;
    kind: string;
    logo: string;
}

export type UpdateClientDTO = Optional<CreateClientDTO, 'name' | 'kind' | 'logo'>

export type FilterClientsDTO = {
    name?: string;
    kind?: string;
    logo?: string;
}

export type FilterClientsPaginatedDTO = FilterClientsDTO & PaginationFiltersDTO;
