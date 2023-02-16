import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/password-hash-db/password-hash.database.connection';

const sequelize = connection;

class PasswordHashModel extends Model { }

PasswordHashModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: { msg: 'username is required' },
            max: { args: [40], msg: 'username exceeds maximum (40) length '}
        }
    },
    password_hash: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notNull: { msg: 'password hash is required' },
            max: { args: [40], msg: 'password hash exceeds maximum (40) length' }
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'UserPasswordSalt',
    timestamps: false
});

export default PasswordHashModel;
