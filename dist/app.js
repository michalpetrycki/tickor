"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const x_xss_protection_1 = __importDefault(require("x-xss-protection"));
const passport_1 = __importDefault(require("passport"));
// import { dbName, dbConfig } from '../config.json';
// import Controller from 'src/utils/interfaces/Controller.interface';
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        console.log('jabko');
        // this.initializeDatabaseConnection();
    }
    initializeMiddleware() {
        // set security HTTP headers
        this.express.use((0, helmet_1.default)());
        // parse json request body
        this.express.use(express_1.default.json());
        // parse urlencoded request body
        this.express.use(express_1.default.urlencoded({ extended: true }));
        // sanitize request data
        this.express.use((0, x_xss_protection_1.default)());
        // gzip compression
        this.express.use((0, compression_1.default)());
        // enable cors
        this.express.use((0, cors_1.default)());
        // this.express.options('*', cors());
        // jwt authentication
        this.express.use(passport_1.default.initialize());
        // passport.use('jwt', jwtStrategy);
        // if (config.env === 'production') {
        //     this.express.use('/v1/auth', authLimiter);
        // }
        // // v1 api routes
        // this.express.use('/v1', routes);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    // private initializeErrorHandling(): void{
    //     this.express.use(ErrorMiddleware);
    // }
    // private async initializeDatabaseConnection(): Promise<void> {
    //     const dialect = 'mssql';
    //     const host = dbConfig.server;
    //     const { username, password } = dbConfig.authentication.options;
    //     // if database doesn't exist - create one
    //     await this.ensureDbExists(dbName);
    //     // connect to db
    //     const sequelize = new Sequelize(dbName, username, password, { host, dialect });
    //     // init models and add them to the exported db object
    //     db.User = require('')(sequelize);
    //     await sequelize.sync({ alter: true });
    // }
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
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = App;
