import { Model, DataTypes } from 'sequelize';
import connection from '@/utils/databaseConnection';
import * as argon2 from 'argon2';

const sequelize = connection;

class PersonModel extends Model {

    isPasswordValid(password: string, passwordHash: string): Promise<Error | boolean> {

        try {
            return argon2.verify(passwordHash, password);
        }
        catch (error) {
            throw new Error('ERROR - Password is not valid => ' + error);
        }

    }

}

PersonModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'username is required' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', (value as string).trim());
        },
        validate: {
            isEmail: true,
            notNull: { msg: 'email is required' }
        }
    },
    kind: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['administrator', 'robot', 'joe']]
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Person',
    timestamps: false
});

export default PersonModel;
