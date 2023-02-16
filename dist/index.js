"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv';
require("module-alias/register");
const TickorApp_1 = __importDefault(require("./apps/TickorApp"));
const PasswordHashApp_1 = __importDefault(require("./apps/PasswordHashApp"));
const PasswordSaltApp_1 = __importDefault(require("./apps/PasswordSaltApp"));
const person_controller_1 = __importDefault(require("@/resources/person/person.controller"));
const health_check_controller_1 = __importDefault(require("@/resources/health-check/health-check.controller"));
const password_hash_controller_1 = __importDefault(require("@/resources/password-hash/password-hash.controller"));
const password_salt_controller_1 = __importDefault(require("@/resources/password-salt/password-salt.controller"));
// validateEnv();
// dotenv.config();
const tickorApp = new TickorApp_1.default([new health_check_controller_1.default(), new person_controller_1.default()], 3000);
const passwordHashApp = new PasswordHashApp_1.default([new health_check_controller_1.default(), new password_hash_controller_1.default()], 3033);
const passwordSaltApp = new PasswordSaltApp_1.default([new health_check_controller_1.default(), new password_salt_controller_1.default()], 3044);
tickorApp.listen();
passwordHashApp.listen();
passwordSaltApp.listen();
//# sourceMappingURL=index.js.map