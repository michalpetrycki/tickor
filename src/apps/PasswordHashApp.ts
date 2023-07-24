import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import xXssProtection from 'x-xss-protection';
import passport from 'passport';
import morgan from 'morgan';
import jwtStrategy from '../utils/config/passport';
import Controller from '@/utils/interfaces/Controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import adze from 'adze';

class PasswordHashApp {

    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {

        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {

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
        this.express.options('*', cors());

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

    private initializeControllers(controllers: Controller[]): void {

        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });

    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    public listen(): void {

        this.express.listen(this.port, () => {
            adze().info(`Password Hash App listening on port ${this.port}`);
        });

    }

}

export default PasswordHashApp;
