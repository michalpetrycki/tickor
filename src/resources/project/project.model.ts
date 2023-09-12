import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

interface ProjectAttributes {
    id: number;
    name: string;
    active: boolean;
    clientID: number;
    logo: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProjectInput extends Optional<ProjectAttributes, 'id'> { };
export interface ProjectOutput extends Required<ProjectAttributes> { };

class Project extends Model<ProjectAttributes, ProjectInput> implements ProjectAttributes {
    public id!: number;
    public name!: string;
    public active!: boolean;
    public clientID!: number;
    public logo!: string;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Project.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    clientID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection,
    timestamps: true,
    freezeTableName: true,
    modelName: 'Project'
});

export default Project;
