"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv';
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("@/resources/user/user.controller"));
// import HealthCheckController from '@/resources/health-check/health-check.controller';
// validateEnv();
// dotenv.config();
// const app = new App([new UserController(), new HealthCheckController()], Number(process.env.PORT));
const app = new app_1.default([new user_controller_1.default()], 9999);
app.listen();
