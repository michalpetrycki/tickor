import { Op, Sequelize } from "sequelize";
import IssueStatus, { IssueStatusInput, IssueStatusOutput } from "@/resources/issue-status/issue-status.model";
import { GetAllIssueStatusesFilters, GetIssueStatusesPaginatedFilters } from "@/resources/issue-status/issue-status.filter";

export const createIssueStatus = async (payload: IssueStatusInput): Promise<IssueStatusOutput> => {
    const status = await IssueStatus.create(payload);
    return status;
}

export const updateIssueStatus = async (id: number, payload: Partial<IssueStatusInput>): Promise<IssueStatusOutput> => {
    const status = await IssueStatus.findByPk(id);

    if (!status) {
        throw new Error('id does not speciy a valid issue status id');
    }

    const updatedIssueStatus = await status.update(payload);
    return updatedIssueStatus;
}

export const deleteIssueStatus = async (id: number): Promise<boolean> => {
    const deletedIssueStatusCount = await IssueStatus.destroy({ where: { id } });
    return !!deletedIssueStatusCount;
}

export const listIssueStatuses = async (filters?: GetAllIssueStatusesFilters): Promise<IssueStatusOutput[]> => {
    return IssueStatus.findAll({ where: { ...filters } });
}

export const listPaginated = async (filters?: GetIssueStatusesPaginatedFilters): Promise<IssueStatusOutput[]> => {
    const whereClause = buildWhereClause(filters?.filter);

    return IssueStatus.findAll({
        where: {
            [Op.or]: whereClause
        },
        limit: filters?.limit,
        offset: filters?.offset,
        order: [filters?.order || 'id'],
        // order: [filters?.order || 'id', filters?.sort || 'ASC'],
    });

}

export const getById = async (id: number): Promise<IssueStatus> => {
    const status = await IssueStatus.findByPk(id);

    if (!status) {
        throw new Error('id does not specify a valid status id');
    }
    return status;
}

export const getByName = async (name: string): Promise<IssueStatus[]> => {
    const statuses = await IssueStatus.findAll({ where: { name } });

    if (!statuses) {
        throw new Error('statuses with name not found');
    }

    return statuses;

}

const buildWhereClause = (filter: string | undefined) => {

    if (!filter) {
        return;
    }

    let filterClause = [];

    for (const key in IssueStatus.getAttributes()) {
        filterClause.push(Sequelize.where(
            Sequelize.cast(Sequelize.col(key), 'varchar'),
            { [Op.substring]: `${filter}` }
        ));
    }

    return filterClause;

};
