// Misc 
// import dotenv from 'dotenv';
import 'module-alias/register'; // Must be on top so other can use @alias

// Apps
import TickorApp from './apps/TickorApp';
import PasswordHashApp from './apps/PasswordHashApp';
import PasswordSaltApp from './apps/PasswordSaltApp';

// Controllers
import IssueController from '@/resources/issue/issue.controller';
import ClientController from '@/resources/client/client.controller';
import PersonController from '@/resources/person/person.controller';
import ProjectController from '@/resources/project/project.controller';
import HealthCheckController from '@/resources/health-check/health-check.controller';
import IssueStatusController from '@/resources/issue-status/issue-status.controller';
import PasswordHashController from '@/resources/password-hash/password-hash.controller';
import PasswordSaltController from '@/resources/password-salt/password-salt.controller';
import IssueCategoryController from '@/resources/issue-category/issue-category.controller';

// validateEnv();
// dotenv.config();

const tickorApp = new TickorApp([
    new IssueController(),
    new PersonController(),
    new ClientController(),
    new ProjectController(),
    new HealthCheckController(),
    new IssueStatusController(),
    new IssueCategoryController()
], 3000);
const passwordHashApp = new PasswordHashApp([new HealthCheckController(), new PasswordHashController()], 3033);
const passwordSaltApp = new PasswordSaltApp([new HealthCheckController(), new PasswordSaltController()], 3044);

tickorApp.listen();
passwordHashApp.listen();
passwordSaltApp.listen();
