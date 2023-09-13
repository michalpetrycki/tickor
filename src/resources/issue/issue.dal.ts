import { GetAllIssuesFilters, GetIssuesPaginatedFilters } from "@/resources/issue/issue.filter";
import Issue, { IssueInput, IssueOutput } from "@/resources/issue/issue.model";
import { Op, Sequelize } from "sequelize";

export const createIssue = async (payload: IssueInput): Promise<IssueOutput> => {
    const issue = await Issue.create(payload);
    return issue;
}

export const updateIssue = async (id: number, payload: Partial<IssueInput>): Promise<IssueOutput> => {
    const issue = await Issue.findByPk(id);

    if (!issue) {
        throw new Error('id does not speciy a valid issue id');
    }

    const updatedIssue = await issue.update(payload);
    return updatedIssue;
}

export const deleteIssue = async (id: number): Promise<boolean> => {
    const deletedIssueCount = await Issue.destroy({ where: { id } });
    return !!deletedIssueCount;
}

export const listIssues = async (filters?: GetAllIssuesFilters): Promise<IssueOutput[]> => {
    return Issue.findAll({ where: { ...filters } });
}

export const listPaginated = async (filters?: GetIssuesPaginatedFilters): Promise<IssueOutput[]> => {
    const whereClause = buildWhereClause(filters?.filter);

    return Issue.findAll({
        where: {
            [Op.or]: whereClause
        },
        limit: filters?.limit,
        offset: filters?.offset,
        order: [filters?.order || 'id'],
        // order: [filters?.order || 'id', filters?.sort || 'ASC'],
    });

}

export const getById = async (id: number): Promise<Issue> => {
    const issue = await Issue.findByPk(id);

    if (!issue) {
        throw new Error('id does not specify a valid issue id');
    }
    return issue;
}

export const getByStatusID = async (statusID: number): Promise<Issue[]> => {
    
    const issues = await Issue.findAll({ where: { statusID } });
    const issue = await Issue.findByPk(statusID);

    if(!issue) {
        throw new Error('statusID does not specify a valid status id');
    }

    if (!issues) {
        throw new Error('issues with statusID not found');
    }

    return issues;

}

export const getByCategoryID = async (categoryID: number): Promise<Issue[]> => {
    
    const issues = await Issue.findAll({ where: { categoryID } });
    const issue = await Issue.findByPk(categoryID);

    if(!issue) {
        throw new Error('categoryID does not specify a valid category id');
    }

    if (!issues) {
        throw new Error('issues with categoryID not found');
    }

    return issues;

}


export const getByName = async (name: string): Promise<Issue[]> => {
    const issues = await Issue.findAll({ where: { name } });

    if (!issues) {
        throw new Error('issues with name not found');
    }

    return issues;

}

export const getBySubject = async (subject: string): Promise<Issue[]> => {
    const issues = await Issue.findAll({ where: { subject } });

    if (!issues) {
        throw new Error('issues with subject not found');
    }

    return issues;

}

const buildWhereClause = (filter: string | undefined) => {

    if (!filter) {
        return;
    }

    let filterClause = [];

    for (const key in Issue.getAttributes()) {
        console.log(key);
        filterClause.push(Sequelize.where(
            Sequelize.cast(Sequelize.col(key), 'varchar'),
            { [Op.substring]: `${filter}` }
        ));
    }

    return filterClause;

};
