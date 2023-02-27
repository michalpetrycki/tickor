import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/databaseConnection';

const sequelize = connection;

class CompanyModel extends Model { }

CompanyModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'name is required' },
            notEmpty: { msg: 'name cannot be an empty string' }
        }
    },
    kind: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'kind is required' },
            notEmpty: { msg: 'kind cannot be an empty string' },
            isIn: { args: [['company', 'contractor', 'customer']], msg: 'Kind should be one of [`company`, `contractor` or `customer`]' }
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Company',
    timestamps: false
});

export default CompanyModel;
