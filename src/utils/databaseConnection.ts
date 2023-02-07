import { Sequelize } from 'sequelize';
import { dbName, dbConfig } from './config/config.json';

const dialect = 'mssql';
const host = dbConfig.server;
const { username, password } = dbConfig.authentication.options;
const { port } = dbConfig.options;


const connection = new Sequelize(dbName, username, password, { host, dialect, port });


console.info('SETUP - Connecting database');

connection?.authenticate()
    .then(() => {
        console.info('INFO - database connected')
    })
    .catch((err) => {
        console.error('ERROR - Unable to connect to the database', err);
    });

export default connection;
