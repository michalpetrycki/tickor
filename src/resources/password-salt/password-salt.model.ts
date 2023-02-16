import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/password-salt-db/password-salt.database.connection';

const sequelize = connection;

class PasswordSaltModel extends Model { }

PasswordSaltModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false,
        validate: {
            notNull: { msg: 'username is required' },
            max: { args: [40], msg: 'username exceeds maximum (40) length' }
        }
    },
    salt: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            notNull: { msg: 'password salt is required' },
            max: { args: [32], msg: 'password salt exceeds maximum (32) length' }
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'UserPasswordSalt',
    timestamps: false
});

export default PasswordSaltModel;
