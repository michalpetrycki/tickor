import { Model, DataTypes } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

const sequelize = connection;

class IssueStatusModel extends Model { }

IssueStatusModel.init({
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
    sequelize,
    freezeTableName: true,
    modelName: 'IssueStatus',
    timestamps: false
});

// IssueModel.hasOne(CategoryModel, { foreignKey: 'idCategory', foreignKeyConstraint: true });
// IssueModel.hasOne(IssueStatus, { foreignKey: 'idStatus', foreignKeyConstraint: true });

export default IssueStatusModel;
