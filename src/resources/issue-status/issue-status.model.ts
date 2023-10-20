import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

interface IssueStatusAttributes {
    id: number;
    name: string;
}

export interface IssueStatusInput extends Optional<IssueStatusAttributes, 'id'> { };
export interface IssueStatusOutput extends Required<IssueStatusAttributes> { };

class IssueStatus extends Model<IssueStatusAttributes, IssueStatusInput> implements IssueStatusAttributes {
    public id!: number;
    public name!: string;
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
            notEmpty: { msg: 'name cannot be an empty string' },
            max: {
                args: [40],
                msg: 'name exceeds maximum length (40)'
            }
        }
    }
}, {
    sequelize: connection,
    timestamps: false,
    freezeTableName: true,
    modelName: 'IssueStatus'
});

// IssueModel.hasOne(CategoryModel, { foreignKey: 'idCategory', foreignKeyConstraint: true });
// IssueModel.hasOne(IssueStatus, { foreignKey: 'idStatus', foreignKeyConstraint: true });

export default IssueStatus;
