export interface Project {
    id: number;
    name: string;
    active: boolean;
    clientID: number;
    logo: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
