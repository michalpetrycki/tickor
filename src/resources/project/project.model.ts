import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/databaseConnection';

const sequelize = connection;

class ProjectModel extends Model { }

ProjectModel.init({
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
    sequelize,
    freezeTableName: true,
    modelName: 'Project',
    timestamps: false
});

export default ProjectModel;
