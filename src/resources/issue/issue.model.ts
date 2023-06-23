import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/databaseConnection';

const sequelize = connection;

class IssueModel extends Model { }

IssueModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            negative: { msg: 'statusID must not be negative' }
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'subject cannot be an empty string' }
        }
    },
    updated: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'updated cannot be an empty string' }
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
        allowNull: true,
        validate: {
            negative: { msg: 'categoryID cannot be negative' }
        }
    },
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Issue',
    timestamps: false
});

// IssueModel.hasOne(IssueCategoryModel, { foreignKey: 'idCategory', foreignKeyConstraint: true });
// IssueModel.hasOne(IssueStatus, { foreignKey: 'idStatus', foreignKeyConstraint: true });

export default IssueModel;
