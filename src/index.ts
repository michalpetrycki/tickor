// import dotenv from 'dotenv';
import 'module-alias/register';
import TickorApp from './apps/TickorApp';
import PasswordHashApp from './apps/PasswordHashApp';
import PasswordSaltApp from './apps/PasswordSaltApp';
import PersonController from '@/resources/person/person.controller';
import HealthCheckController from '@/resources/health-check/health-check.controller';
import PasswordHashController from '@/resources/password-hash/password-hash.controller';
import PasswordSaltController from '@/resources/password-salt/password-salt.controller';
import CompanyController from '@/resources/company/company.controller';
import ClientController from '@/resources/client/client.controller';
import ProjectController from '@/resources/project/project.controller';
import IssueController from '@/resources/issue/issue.controller';
import IssueCategoryController from '@/resources/issue-category/issue-category.controller';

// validateEnv();

// dotenv.config();

const tickorApp = new TickorApp([
    new HealthCheckController(), 
    new PersonController(), 
    new CompanyController(), 
    new ClientController(),
    new ProjectController(),
    new IssueController(),
    new IssueCategoryController()
], 3000);
const passwordHashApp = new PasswordHashApp([new HealthCheckController(), new PasswordHashController()], 3033);
const passwordSaltApp = new PasswordSaltApp([new HealthCheckController(), new PasswordSaltController()], 3044);

tickorApp.listen();
passwordHashApp.listen();
passwordSaltApp.listen();
