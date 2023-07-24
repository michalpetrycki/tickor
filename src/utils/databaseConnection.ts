import { Sequelize } from 'sequelize';
import { dbName, testDbName, dbConfig } from './config/config.json';
import adze from 'adze';

const dialect = 'mssql';
const host = dbConfig.server;
const { username, password } = dbConfig.authentication.options;
const { port } = dbConfig.options;

let connection: Sequelize;

adze().info('SETUP - Connecting database');

if (!process.env.USE_TEST_DATABASE) {
    connection = new Sequelize(testDbName, username, password, { host, dialect, port });
}
else {
    connection = new Sequelize(dbName, username, password, { host, dialect, port });
}

connection.authenticate()
    .then(() => {
        adze().info('INFO - database connected');
    })
    .catch((err) => {
        adze().error('ERROR - Unable to connect to the database', err);
    });

export default connection!;
