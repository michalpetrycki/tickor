import { Sequelize } from 'sequelize';
import { passwordSaltDbName, passwordSaltDbConfig } from './config/config.json';

const dialect = 'mssql';
const host = passwordSaltDbConfig.server;
const { username, password } = passwordSaltDbConfig.authentication.options;
const { port } = passwordSaltDbConfig.options;


const passwordSaltConnection = new Sequelize(passwordSaltDbName, username, password, { host, dialect, port });

console.info('SETUP - Connecting password salt database');

passwordSaltConnection?.authenticate()
    .then(() => {
        console.info('INFO - password salt database connected')
    })
    .catch((err) => {
        console.error('ERROR - Unable to connect to the password salt database', err);
    });

export default passwordSaltConnection;
