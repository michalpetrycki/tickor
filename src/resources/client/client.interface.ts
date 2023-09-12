export interface Client {
    id: number;
    name: string;
    kind: string;
    logo: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
