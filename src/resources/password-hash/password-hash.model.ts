import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/password-hash-db/password-hash.database.connection';

const sequelize = connection;

class PasswordHashModel extends Model { }

PasswordHashModel.init({
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
    password_hash: {
        type: DataTypes.STRING(105),
        allowNull: false,
        validate: {
            notNull: { msg: 'password_hash is required' },
            notEmpty: { msg: 'password_hash cannot be an empty string' },
            len: { args: [0, 105], msg: 'password_hash exceeds maximum (60) length' }
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'UserPasswordHash'
});

export default PasswordHashModel;
