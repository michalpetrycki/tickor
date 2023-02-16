import { Sequelize } from 'sequelize';
import { passwordHashDbName, passwordHashDbConfig } from '../config/config.json';

const dialect = 'mssql';
const host = passwordHashDbConfig.server;
const { username, password } = passwordHashDbConfig.authentication.options;
const { port } = passwordHashDbConfig.options;


const passwordHashConnection = new Sequelize(passwordHashDbName, username, password, { host, dialect, port });

console.info('SETUP - Connecting password hash database');

passwordHashConnection?.authenticate()
    .then(() => {
        console.info('INFO - password hash database connected')
    })
    .catch((err) => {
        console.error('ERROR - Unable to connect to the password hash database', err);
    });

export default passwordHashConnection;
