import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateIssueStatusDTO = {
    name: string;
}

export type UpdateIssueStatusDTO = Optional<CreateIssueStatusDTO, 'name'>

export type FilterIssueStatusesDTO = {
    name?: string;
}

export type FilterIssueStatusesPaginatedDTO = FilterIssueStatusesDTO & PaginationFiltersDTO;
