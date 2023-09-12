import { Project } from "@/resources/project/project.interface";
import { ProjectOutput } from "@/resources/project/project.model";

export const toProject = (project: ProjectOutput): Project => {
    return {
        id: project.id,
        name: project.name,
        active: project.active,
        clientID: project.clientID,
        logo: project.logo,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
    }
}
