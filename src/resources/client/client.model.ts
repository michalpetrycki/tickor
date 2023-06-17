import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/databaseConnection';

const sequelize = connection;

class ClientModel extends Model { }

ClientModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kind: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['person', 'company']]
        }
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Client',
    timestamps: false
});

export default ClientModel;
