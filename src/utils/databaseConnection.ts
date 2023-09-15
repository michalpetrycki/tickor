import { Sequelize } from 'sequelize';
import { dbName, testDbName, dbConfig } from './config/config.json';
import adze from 'adze';

const dialect = 'mssql';
const host = dbConfig.server;
const { username, password } = dbConfig.authentication.options;
const { port } = dbConfig.options;

let connection: Sequelize;

adze().info('SETUP - Connecting database');

const databaseName = process.env.USE_TEST_DATABASE === '' ? testDbName : dbName;
connection = new Sequelize(databaseName, username, password, { host, dialect, port });

setTimeout(() => {
    connection.authenticate()
        .then(() => {
            adze().info('INFO - database connected to ' + connection.getDatabaseName());
        })
        .catch((err) => {
            adze().error('ERROR - Unable to connect to the database', err);
        });
}, 120000);

let dropDatabase = async () => {
    return await connection.sync({ force: true });
};

export { dropDatabase, connection };
