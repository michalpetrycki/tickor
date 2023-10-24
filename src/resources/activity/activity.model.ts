import { Model, DataTypes, Optional } from 'sequelize';
import { connection } from '@/utils/databaseConnection';
import Issue from '@/resources/issue/issue.model';

interface ActivityAttributes {
    id: number;
    clientID?: number;
    personID?: number;
    projectID?: number;
    issueID?: number;
    issueCategoryID?: number;
    issueStatusID?: number;
    activityDate: Date;
    updated?: Date;
    activityType: string;
    activityDetails?: string;
}

export interface ActivityInput extends Optional<ActivityAttributes, 'id'> { };
export interface ActivityOutput extends Required<ActivityAttributes> { };

class Activity extends Model<ActivityAttributes, ActivityInput> implements ActivityAttributes {
    public id!: number;
    public clientID!: number;
    public personID!: number;
    public projectID!: number;
    public issueID!: number;
    public issueCategoryID!: number;
    public issueStatusID!: number;
    public activityDate!: Date;
    public updated!: Date;
    public activityType!: string;
    public activityDetails!: string;
}

Activity.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    clientID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'clientID must not be negative' }
        }
    },
    personID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'personID must not be negative' }
        }
    },
    projectID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'projectID must not be negative' }
        }
    },
    issueID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'issueID must not be negative' }
        }
    },
    issueCategoryID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'issueCategoryID must not be negative' }
        }
    },
    issueStatusID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'issueStatusID must not be negative' }
        }
    },
    activityDate: {
        type: DataTypes.DATE,
        validate: {
            isDate: { msg: 'activityDate must be a valid date', args: true }
        }
    },
    updated: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: { msg: 'updated must be a valid date', args: true }
        }
    },
    activityType: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'subject cannot be an empty string' },
            max: {
                args: [40],
                msg: 'activityType exceeds maximum length (40)'
            }
        }
    },
    activityDetails: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'subject cannot be an empty string' },
            max: {
                args: [4000],
                msg: 'activityDetails exceeds maximum length (4000)'
            }
        }
    }
}, {
    sequelize: connection,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Activity'
});

export default Activity;
