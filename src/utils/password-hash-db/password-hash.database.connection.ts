import { Sequelize } from 'sequelize';
import { passwordHashDbName, passwordHashDbConfig } from '../config/config.json';
import adze from 'adze';

const dialect = 'mssql';
const host = passwordHashDbConfig.server;
const { username, password } = passwordHashDbConfig.authentication.options;
const { port } = passwordHashDbConfig.options;


const passwordHashConnection = new Sequelize(passwordHashDbName, username, password, { host, dialect, port });

adze().info('SETUP - Connecting password hash database');

setTimeout(() => {
    passwordHashConnection?.authenticate()
        .then(() => {
            adze().info('INFO - password hash database connected')
        })
        .catch((err) => {
            adze().error('ERROR - Unable to connect to the password hash database', err);
        });
}, 100000);

export default passwordHashConnection;
