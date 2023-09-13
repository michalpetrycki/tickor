import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

interface IssueAttributes {
    id: number;
    statusID: number;
    subject: string;
    name: string;
    categoryID: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IssueInput extends Optional<IssueAttributes, 'id'> { };
export interface IssueOutput extends Required<IssueAttributes> { };

class Issue extends Model<IssueAttributes, IssueInput> implements IssueAttributes {
    public id!: number;
    public statusID!: number;
    public subject!: string;
    public name!: string;
    public categoryID!: number;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Issue.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: { args: [0], msg: 'statusID must not be negative' }
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'subject cannot be an empty string' }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'name cannot be an empty string' }
        }
    },
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: { args: [0], msg: 'categoryID must not be negative' }
        }
    },
}, {
    sequelize: connection,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Issue'
});

// Issue.hasOne(IssueCategory, { foreignKey: 'idCategory', foreignKeyConstraint: true });
// Issue.hasOne(IssueStatus, { foreignKey: 'idStatus', foreignKeyConstraint: true });

export default Issue;
