import { PaginationFilters } from "@/resources/shared/filters/pagination.filters";

export interface GetAllActivityFilters {
    clientID?: number;
    personID?: number;
    projectID?: number;
    issueID?: number;
    issueCategoryID?: number;
    issueStatusID?: number;
    activityDate?: Date;
    updated?: Date;
    activityType?: string;
    activityDetails?: string;
};

export interface GetActivityPaginatedFilters extends GetAllActivityFilters, PaginationFilters { };
