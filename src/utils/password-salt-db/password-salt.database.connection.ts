import { Sequelize } from 'sequelize';
import { passwordSaltDbName, passwordSaltDbConfig } from '../config/config.json';
import adze from 'adze';

const dialect = 'mssql';
const host = passwordSaltDbConfig.server;
const { username, password } = passwordSaltDbConfig.authentication.options;
const { port } = passwordSaltDbConfig.options;
const passwordSaltConnection = new Sequelize(passwordSaltDbName, username, password, { host, dialect, port });

adze().info('SETUP - Connecting password salt database');

setTimeout(() => {
    passwordSaltConnection?.authenticate()
        .then(() => {
            adze().info('INFO - password salt database connected')
        })
        .catch((err) => {
            adze().error('ERROR - Unable to connect to the password salt database', err);
        });
}, 120000);

export default passwordSaltConnection;
