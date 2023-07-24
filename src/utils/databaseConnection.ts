import { Sequelize } from 'sequelize';
import { dbName, dbConfig } from './config/config.json';
import adze from 'adze';
import path from 'path';
import fs from 'fs';
import mssql from 'mssql';
import { Connection } from 'tedious';
import { Request } from 'tedious';

const dialect = 'mssql';
const host = dbConfig.server;
const { username, password } = dbConfig.authentication.options;
const { port } = dbConfig.options;

let connection: Sequelize;

const setup = async () => {
    try {

        const config = {
            user: 'sa',
            password: 'costam@711',
            server: 'localhost',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 300000
            },
        };

        
        const queries: string[] = fs.readFileSync(path.resolve(__dirname, 'setup-test-database.sql')).toString()
            .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
            .replace(/\s+/g, ' ') // excess white space
            .split(";") // split into all statements
            .map(Function.prototype.call, String.prototype.trim)
            .filter(function (el) { return el.length != 0 }); // remove any empty ones

        const connection = new Connection(config);

        connection.on('connect', (error) => {
            adze().log('Connected to server');
            createTestDatabase(queries, connection);
            connection.close();
        });

        connection.connect();

    }
    catch (err: any) {
        adze().error(err);
    }
};

const createTestDatabase = (queries: string[], connection: Connection) => {

    queries.forEach((query: string) => {

        const request = new Request(query, (err) => {
            if (err) {
                adze().error(err);
            }
        });

        request.on('done', (rowCount, more) => {

            adze().log('============================================================================================= ' + rowCount);
            adze().log('============================================================================================= ' + more);

        });

        connection.execSql(request);

    });

    connection.close();

};

adze().info('SETUP - Connecting database');

if (!process.env.MY_CUSTOM_TEST_ENV_VAR) {
    setup();
    adze().log('==================================================================================================== no no no');
    connection = new Sequelize(dbName, username, password, { host, dialect, port });
}
else {
    connection = new Sequelize(dbName, username, password, { host, dialect, port });
    adze().log('==================================================================================================== test test test');
    setup();
}

connection.authenticate()
    .then(() => {
        adze().info('INFO - database connected');
    })
    .catch((err) => {
        adze().error('ERROR - Unable to connect to the database', err);
    });

export default connection!;
