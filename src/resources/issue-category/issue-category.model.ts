import { Model, DataTypes } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

const sequelize = connection;

class IssueCategoryModel extends Model { }

IssueCategoryModel.init({
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
    sequelize,
    freezeTableName: true,
    modelName: 'IssueCategory',
    timestamps: false,
    initialAutoIncrement: '1'
});

export default IssueCategoryModel;
