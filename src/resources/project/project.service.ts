import { GetAllProjectsFilters, GetProjectsPaginatedFilters } from '@/resources/project/project.filter';
import { ProjectInput, ProjectOutput } from '@/resources/project/project.model';
import * as projectDal from '@/resources/project/project.dal';
import Project from '@/resources/project/project.model';

class ProjectService {

    public async getById(id: number): Promise<Project> {
        return projectDal.getById(id);
    }

    public async getByName(name: string): Promise<Project[]> {
        return projectDal.getByName(name);
    }

    public async getByActive(active: boolean): Promise<Project[] | null> {
        return projectDal.getByActive(active);
    }

    public async getByClientID(clientID: number): Promise<Project[] | null> {
        return projectDal.getByClientID(clientID);
    }

    public async createProject(payload: ProjectInput): Promise<ProjectOutput> {
        return projectDal.createProject(payload);
    }

    public async updateProject(id: number, editProperties: Partial<ProjectInput>): Promise<ProjectOutput> {
        return projectDal.updateProject(id, editProperties);
    }

    public async deleteProject(id: number): Promise<boolean> {
        return projectDal.deleteProject(id);
    }

    public async listProjects(filters?: GetAllProjectsFilters): Promise<ProjectOutput[]> {
        return projectDal.listProjects(filters);
    }

    public async listPaginated(filters?: GetProjectsPaginatedFilters): Promise<ProjectOutput[]> {
        return projectDal.listPaginated(filters);
    }

}

export default ProjectService;
