import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/password-salt-db/password-salt.database.connection';

const sequelize = connection;

class PasswordSaltModel extends Model { }

PasswordSaltModel.init({
    id: {
        type: DataTypes.INTEGER,
        // autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'username is required' },
            notEmpty: { msg: 'username cannot be an empty string' },
            len: { args: [0, 40], msg: 'username exceeds maximum (40) length' }
        }
    },
    password_salt: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            notNull: { msg: 'password_salt is required' },
            notEmpty: { msg: 'password_salt cannot be an empty string' },
            len: { args: [0, 32], msg: 'password_salt exceeds maximum (32) length' }
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'UserPasswordSalt',
    timestamps: false
});

export default PasswordSaltModel;
