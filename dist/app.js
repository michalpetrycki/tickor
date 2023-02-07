"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// import config from './config/config';
const morgan_1 = __importDefault(require("morgan"));
const passport_2 = __importDefault(require("./utils/config/passport"));
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
const person_service_1 = __importDefault(require("@/resources/person/person.service"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.updateAdminAccount();
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
        passport_1.default.use('jwt', passport_2.default);
        // morgan - logging requested endpoint
        this.express.use((0, morgan_1.default)('tiny'));
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
    initializeErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initializeDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
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
    updateAdminAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const personService = new person_service_1.default();
            personService.updateAdminPassword();
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map