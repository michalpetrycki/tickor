import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

interface IssueCategoryAttributes {
    id: number;
    name: string;
}

export interface IssueCategoryInput extends Optional<IssueCategoryAttributes, 'id'> { };
export interface IssueCategoryOutput extends Required<IssueCategoryAttributes> { };

class IssueCategory extends Model<IssueCategoryAttributes, IssueCategoryInput> implements IssueCategoryAttributes {
    public id!: number;
    public name!: string;
}

IssueCategory.init({
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
    modelName: 'IssueCategory'
});

export default IssueCategory;
