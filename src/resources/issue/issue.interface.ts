export interface Issue {
    id: number;
    statusID: number;
    name: string;
    subject: string;
    categoryID: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
