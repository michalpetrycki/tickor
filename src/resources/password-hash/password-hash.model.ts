import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import connection from '@/utils/password-hash-db/password-hash.database.connection';

const sequelize = connection;

class PasswordHashModel extends Model {
    
    isPasswordValid(password: string): Promise<Error | boolean> {

        try {
            return bcrypt.compare(password, this.getDataValue('password'));
        }
        catch (error) {
            console.log(error);
            throw new Error();
        }

    }

}

PasswordHashModel.init({
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
        set (value) {
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
            isIn: [[ 'administrator', 'robot', 'joe' ]]
        }
    },
    password: {
        type: DataTypes.STRING(64),
        field: 'password_hash',
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Person',
    timestamps: false,
    hooks: {
        beforeCreate: async (person, options) => {
            try {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(person.getDataValue('password'), salt);
                person.setDataValue('password', hash);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
});

export default PasswordHashModel;
