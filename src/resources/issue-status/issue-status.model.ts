import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

interface IssueStatusAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IssueStatusInput extends Optional<IssueStatusAttributes, 'id'> { };
export interface IssueStatusOutput extends Required<IssueStatusAttributes> { };

class IssueStatus extends Model<IssueStatusAttributes, IssueStatusInput> implements IssueStatusAttributes {
    public id!: number;
    public name!: string;
    
    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

IssueStatus.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'name cannot be an empty string' }
        }
    }
}, {
    sequelize: connection,
    timestamps: true,
    freezeTableName: true,
    modelName: 'IssueStatus'    
});

// IssueModel.hasOne(CategoryModel, { foreignKey: 'idCategory', foreignKeyConstraint: true });
// IssueModel.hasOne(IssueStatus, { foreignKey: 'idStatus', foreignKeyConstraint: true });

export default IssueStatus;
