import { OrderItem } from "sequelize";

export interface PaginationFilters {
    filter: string;
    offset: number;
    limit: number;
    sort: 'ASC' | 'DESC';
    order: OrderItem;
};

export type PaginationFiltersDTO = {
    filter: string;
    offset: number;
    limit: number;
    sort: 'ASC' | 'DESC';
    order: OrderItem;
};
