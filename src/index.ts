// import dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';
import PersonController from '@/resources/person/person.controller';
import HealthCheckController from '@/resources/health-check/health-check.controller';

// validateEnv();

// dotenv.config();

// const app = new App([new UserController(), new HealthCheckController()], Number(process.env.PORT));
const app = new App([ new HealthCheckController(), new PersonController()], 3000);

app.listen();
