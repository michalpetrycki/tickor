import adze from 'adze';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import bodyParser from 'body-parser';
import compression from 'compression';
import xXssProtection from 'x-xss-protection';
import express, { Application } from 'express';
import jwtStrategy from '../utils/config/passport';
import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/Controller.interface';
import { rateLimiterMiddleware } from '@/middleware/rate-limiter.middleware';

class PasswordSaltApp {

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

        // Ddos protection
        this.express.use(rateLimiterMiddleware);

        // set the request size limit to 1 MB
        this.express.use(bodyParser.json({ limit: '1mb' }));

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
            adze().info(`Password Salt App listening on port ${this.port}`);
        });

    }

}

export default PasswordSaltApp;
