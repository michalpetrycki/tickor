import { PaginationFiltersDTO } from "@/resources/shared/filters/pagination.filters";
import { Optional } from "sequelize";

export type CreateActivityDTO = {
    clientID: number;
    personID: number;
    projectID: number;
    issueID: number;
    issueCategoryID: number;
    issueStatusID: number;
    activityDate: Date;
    updated: Date;
    activityType: string;
}

export type UpdateActivityDTO = Optional<CreateActivityDTO,
    'clientID' | 'personID' | 'projectID' | 'issueID' | 'issueCategoryID' | 'issueStatusID' | 'activityDate' | 'updated' | 'activityType'>

export type FilterActivitiesDTO = {
    statusID?: number;
    subject?: string;
    name?: string;
    categoryID?: number;
    projectID?: number;
}

export type FilterActivitiesPaginatedDTO = FilterActivitiesDTO & PaginationFiltersDTO;
