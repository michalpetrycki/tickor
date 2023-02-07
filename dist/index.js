"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv';
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const person_controller_1 = __importDefault(require("@/resources/person/person.controller"));
const health_check_controller_1 = __importDefault(require("@/resources/health-check/health-check.controller"));
// validateEnv();
// dotenv.config();
// const app = new App([new UserController(), new HealthCheckController()], Number(process.env.PORT));
const app = new app_1.default([new health_check_controller_1.default(), new person_controller_1.default()], 3000);
app.listen();
//# sourceMappingURL=index.js.map