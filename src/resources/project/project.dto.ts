import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateProjectDTO = {
    name: string;
    active: boolean;
    clientID: number;
    logo: string;
}

export type UpdateProjectDTO = Optional<CreateProjectDTO, 'name' | 'active' | 'clientID' | 'logo'>

export type FilterProjectDTO = {
    name?: string;
    active?: boolean;
    clientID?: number;
    logo?: string;
}

export type FilterProjectPaginatedDTO = FilterProjectDTO & PaginationFiltersDTO;
