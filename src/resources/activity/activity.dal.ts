import { Op, Sequelize } from "sequelize";
import Issue from "@/resources/issue/issue.model";
import Client from "@/resources/client/client.model";
import IssueStatus from "@/resources/issue-status/issue-status.model";
import IssueCategory from "@/resources/issue-category/issue-category.model";
import Activity, { ActivityInput, ActivityOutput } from "@/resources/activity/activity.model";
import { GetActivityPaginatedFilters, GetAllActivityFilters } from "@/resources/activity/activity.filter";

export const createActivity = async (payload: ActivityInput): Promise<ActivityOutput> => {
    const activity = await Activity.create(payload);
    return activity;
}

export const updateActivity = async (id: number, payload: Partial<ActivityInput>): Promise<ActivityOutput> => {
    const activity = await Activity.findByPk(id);

    if (!activity) {
        throw new Error('id does not speciy a valid activity id');
    }

    const updatedActivity = await activity.update(payload);
    return updatedActivity;
}

export const deleteActivity = async (id: number): Promise<boolean> => {
    const deletedActivity = await Activity.destroy({ where: { id } });
    return !!deletedActivity;
}

export const listActivity = async (filters?: GetAllActivityFilters): Promise<ActivityOutput[]> => {
    return Activity.findAll({ where: { ...filters } });
}

export const listPaginated = async (filters?: GetActivityPaginatedFilters): Promise<ActivityOutput[]> => {
    const whereClause = buildWhereClause(filters?.filter);

    return Activity.findAll({
        where: {
            [Op.or]: whereClause
        },
        limit: filters?.limit,
        offset: filters?.offset,
        order: [filters?.order || 'id'],
        // order: [filters?.order || 'id', filters?.sort || 'ASC'],
    });

}

export const getById = async (id: number): Promise<Activity> => {
    const activity = await Activity.findByPk(id);

    if (!activity) {
        throw new Error('id does not specify a valid activity id');
    }
    return activity;
}

export const getByClientID = async (clientID: number): Promise<Activity[]> => {

    const client = await Client.findByPk(clientID);
    if (!client) {
        throw new Error('clientID does not specify a valid client');
    }

    const activities = await Activity.findAll({ where: { clientID } });
    if (!activities) {
        throw new Error('activities with clientID not found');
    }

    return activities;

}

// export const getByPersonID = async (personID: number): Promise<Activity[]> => {

//     const person = await Client.findByPk(personID);
//     if (!client) {
//         throw new Error('personID does not specify a valid client');
//     }

//     const activities = await Activity.findAll({ where: { personID } });
//     if (!activities) {
//         throw new Error('activities with clientID not found');
//     }

//     return activities;

// }

export const getByProjectID = async (projectID: number): Promise<Activity[]> => {

    const project = await Client.findByPk(projectID);
    if (!project) {
        throw new Error('projectID does not specify a valid project');
    }

    const activities = await Activity.findAll({ where: { projectID } });
    if (!activities) {
        throw new Error('activities with projectID not found');
    }

    return activities;

}

export const getByIssueID = async (issueID: number): Promise<Activity[]> => {

    const issue = await Issue.findByPk(issueID);
    if (!issue) {
        throw new Error('issueID does not specify a valid issue');
    }

    const activities = await Activity.findAll({ where: { issueID } });
    if (!activities) {
        throw new Error('activities with issueID not found');
    }

    return activities;

}

export const getByIssueCategoryID = async (issueCategoryID: number): Promise<Activity[]> => {

    const category = await IssueCategory.findByPk(issueCategoryID);
    if (!category) {
        throw new Error('categoryID does not specify a valid issue category');
    }

    const activities = await Activity.findAll({ where: { issueCategoryID } });
    if (!activities) {
        throw new Error('activities with categoryID not found');
    }

    return activities;

}

export const getByIssueStatusID = async (issueStatusID: number): Promise<Activity[]> => {

    const status = await IssueStatus.findByPk(issueStatusID);
    if (!status) {
        throw new Error('statusID does not specify a valid status');
    }

    const activities = await Activity.findAll({ where: { issueStatusID } });
    if (!activities) {
        throw new Error('activities with statusID not found');
    }

    return activities;

}

export const getByDate = async (activityDate: Date): Promise<Activity[]> => {

    const activities = await Activity.findAll({ where: { activityDate } });
    if (!activities) {
        throw new Error('activities with date not found');
    }

    return activities;

}

export const getByUpdated = async (updated: Date): Promise<Activity[]> => {

    const activities = await Activity.findAll({ where: { updated } });
    if (!activities) {
        throw new Error('activities with updated date not found');
    }

    return activities;

}

export const getByType = async (activityType: string): Promise<Activity[]> => {

    const type = await Activity.findAll({ where: { activityType } });
    if (!type) {
        throw new Error('activities with type not found');
    }

    return type;

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
