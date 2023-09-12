import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';

interface ClientAttributes {
    id: number;
    name: string;
    kind: string;
    logo: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ClientInput extends Optional<ClientAttributes, 'id'> {};
export interface ClientOutput extends Required<ClientAttributes> {};

class Client extends Model<ClientAttributes, ClientInput> implements ClientAttributes {
    public id!: number;
    public name!: string;
    public kind!: string;
    public logo!: string;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Client.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
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
        allowNull: true
    },
}, {
    sequelize: connection,
    timestamps: true,
    freezeTableName: true,
    modelName: 'Client' // oterwise model name in some places is plural, eg. 'Clients'
});

export default Client;
