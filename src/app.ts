import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import xXssProtection from 'x-xss-protection';
import passport from 'passport';
import httpStatus from 'http-status';
// import config from './config/config';
import morgan from 'morgan';
import jwtStrategy from './utils/config/passport';
// import authLimiter from './middleware/rateLimiter';
import tedious from 'tedious';
import { Sequelize } from 'sequelize';
import Controller from '@/utils/interfaces/Controller.interface';
import { dbName, dbConfig } from './utils/config/config.json';
import PersonModel from '@/resources/person/person.model';
import connection from '@/utils/databaseConnection';
import ErrorMiddleware from '@/middleware/error.middleware';
import PersonService from '@/resources/person/person.service';

class App {

    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {

        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.updateAdminAccount();
        // this.initializeDatabaseConnection();

    }

    private initializeMiddleware(): void{

        // set security HTTP headers
        this.express.use(helmet());

        // parse json request body
        this.express.use(express.json());

        // parse urlencoded request body
        this.express.use(express.urlencoded({ extended: true }));

        // sanitize request data
        this.express.use(xXssProtection());

        // gzip compression
        this.express.use(compression());

        // enable cors
        this.express.use(cors());
        // this.express.options('*', cors());

        // jwt authentication
        this.express.use(passport.initialize());
        passport.use('jwt', jwtStrategy);

        // morgan - logging requested endpoint
        this.express.use(morgan('tiny'));

        // if (config.env === 'production') {
        //     this.express.use('/v1/auth', authLimiter);
        // }

        // // v1 api routes
        // this.express.use('/v1', routes);
        
    }

    private initializeControllers(controllers: Controller[]): void{

        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });

    }

    private initializeErrorHandling(): void{

        this.express.use(ErrorMiddleware);

    }

    private async initializeDatabaseConnection(): Promise<void> {

        // const dialect = 'mssql';
        // const host = dbConfig.server;
        // const { username, password } = dbConfig.authentication.options;

        // // if database doesn't exist - create one
        // await this.ensureDbExists(dbName);

        // // connect to db
        // const sequelize = new Sequelize(dbName, username, password, { host, dialect });

        // // init models and add them to the exported db object
        // const models = {
        //     Person: PersonModel(sequelize, Sequelize.DataTypes)
        // };

        // await sequelize.sync({ alter: true });


    }

    // private async ensureDbExists(dbName: string): Promise <void | string> {

    //     return new Promise((resolve, reject) => {

    //         const connection = new tedious.Connection(dbConfig);

    //         connection.connect((err) => {
    //             if (err) {
    //                 console.log(err);
    //                 reject(`Connection failed: ${err.message}`);
    //             }

    //             const createDbQuery = `IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = ${dbName})`;
    //             const request = new tedious.Request(createDbQuery, (err) => {
    //                 if (err) {
    //                     console.log(err);
    //                     reject(`Create DB Query Failed: ${err.message}`);
    //                 }

    //                 // query executed succesffuly
    //                 resolve();

    //             });
    //         });

    //     });

    // }

    public async updateAdminAccount(): Promise<void> {

        const personService = new PersonService();
        personService.updateAdminPassword();

    }

    public listen(): void{

        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });

    }

}

export default App;
