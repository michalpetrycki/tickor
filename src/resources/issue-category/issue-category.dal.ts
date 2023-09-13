import { Op, Sequelize } from "sequelize";
import IssueCategory, { IssueCategoryInput, IssueCategoryOutput } from "@/resources/issue-category/issue-category.model";
import { GetAllIssueCategoriesFilters, GetIssueCategoriesPaginatedFilters } from "@/resources/issue-category/issue-category.filter";

export const createIssueCategory = async (payload: IssueCategoryInput): Promise<IssueCategoryOutput> => {
    const category = await IssueCategory.create(payload);
    return category;
}

export const updateIssueCategory = async (id: number, payload: Partial<IssueCategoryInput>): Promise<IssueCategoryOutput> => {
    const category = await IssueCategory.findByPk(id);

    if (!category) {
        throw new Error('id does not speciy a valid issue category id');
    }

    const updatedIssueCategory = await category.update(payload);
    return updatedIssueCategory;
}

export const deleteIssueCategory = async (id: number): Promise<boolean> => {
    const deletedIssueCategoryCount = await IssueCategory.destroy({ where: { id } });
    return !!deletedIssueCategoryCount;
}

export const listIssueCategories = async (filters?: GetAllIssueCategoriesFilters): Promise<IssueCategoryOutput[]> => {
    return IssueCategory.findAll({ where: { ...filters } });
}

export const listPaginated = async (filters?: GetIssueCategoriesPaginatedFilters): Promise<IssueCategoryOutput[]> => {
    const whereClause = buildWhereClause(filters?.filter);

    return IssueCategory.findAll({
        where: {
            [Op.or]: whereClause
        },
        limit: filters?.limit,
        offset: filters?.offset,
        order: [filters?.order || 'id'],
        // order: [filters?.order || 'id', filters?.sort || 'ASC'],
    });

}

export const getById = async (id: number): Promise<IssueCategory> => {
    const category = await IssueCategory.findByPk(id);

    if (!category) {
        throw new Error('id does not specify a valid category id');
    }
    return category;
}

export const getByName = async (name: string): Promise<IssueCategory[]> => {
    const categories = await IssueCategory.findAll({ where: { name } });

    if (!categories) {
        throw new Error('categories with name not found');
    }

    return categories;

}

const buildWhereClause = (filter: string | undefined) => {

    if (!filter) {
        return;
    }

    let filterClause = [];

    for (const key in IssueCategory.getAttributes()) {
        filterClause.push(Sequelize.where(
            Sequelize.cast(Sequelize.col(key), 'varchar'),
            { [Op.substring]: `${filter}` }
        ));
    }

    return filterClause;

};
