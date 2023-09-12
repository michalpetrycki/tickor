import Client from "@/resources/client/client.model";
import { GetAllProjectsFilters, GetProjectsPaginatedFilters } from "@/resources/project/project.filter";
import Project, { ProjectInput, ProjectOutput } from "@/resources/project/project.model";
import { Op, Sequelize } from "sequelize";

export const createProject = async (payload: ProjectInput): Promise<ProjectOutput> => {
    const project = await Project.create(payload);
    return project;
}

export const updateProject = async (id: number, payload: Partial<ProjectInput>): Promise<ProjectOutput> => {
    const project = await Project.findByPk(id);

    if (!project) {
        throw new Error('id does not speciy a valid project id');
    }

    const updatedProject = await project.update(payload);
    return updatedProject;
}

export const deleteProject = async (id: number): Promise<boolean> => {
    const deletedProjectCount = await Project.destroy({ where: { id } });
    return !!deletedProjectCount;
}

export const listProjects = async (filters?: GetAllProjectsFilters): Promise<ProjectOutput[]> => {
    return Project.findAll({ where: { ...filters } });
}

export const listPaginated = async (filters?: GetProjectsPaginatedFilters): Promise<ProjectOutput[]> => {
    const whereClause = buildWhereClause(filters?.filter);

    return Project.findAll({
        where: {
            [Op.or]: whereClause
        },
        limit: filters?.limit,
        offset: filters?.offset,
        order: [filters?.order || 'id'],
        // order: [filters?.order || 'id', filters?.sort || 'ASC'],
    });

}

export const getById = async (id: number): Promise<Project> => {
    const project = await Project.findByPk(id);

    if (!project) {
        throw new Error('id does not specify a valid project id');
    }
    return project;
}

export const getByName = async (name: string): Promise<Project[]> => {
    const projects = await Project.findAll({ where: { name } });

    if (!projects) {
        throw new Error('projects with name not found');
    }

    return projects;

}

export const getByActive = async (isActive: boolean): Promise<Project[]> => {
    const projects = await Project.findAll({ where: { active: isActive } });

    if (!projects) {
        throw new Error('projects with active status not found');
    }

    return projects;

}

export const getByClientID = async (clientID: number): Promise<Project[]> => {
    const projects = await Project.findAll({ where: { clientID } });

    const client = await Client.findByPk(clientID);

    if(!client) {
        throw new Error('clientID does not specify a valid client id');
    }

    if (!projects) {
        throw new Error('projects with clientID not found');
    }

    return projects;

}

const buildWhereClause = (filter: string | undefined) => {

    if (!filter) {
        return;
    }

    let filterClause = [];

    for (const key in Project.getAttributes()) {
        filterClause.push(Sequelize.where(
            Sequelize.cast(Sequelize.col(key), 'varchar'),
            { [Op.substring]: `${filter}` }
        ));
    }

    return filterClause;

};
