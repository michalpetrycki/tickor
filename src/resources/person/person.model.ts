import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize('mssql');

class Person extends Model {
    
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

Person.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set: value => (value as string).trim()
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Person',
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

export default Person;
