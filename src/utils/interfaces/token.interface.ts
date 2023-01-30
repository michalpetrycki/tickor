import { DataTypes } from 'sequelize';

interface Token extends Object{
    id: DataTypes.StringDataType;
    expiresIn: number;
}

export default Token;
