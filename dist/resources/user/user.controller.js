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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import Controller from '@/utils/interfaces/controller.interface';
// import HttpException from '@/utils/exceptions/http.exception';
// import validationMiddleware from '@/middleware/validation.middleware';
// import validate from '@/resources/user/user.validation';
// import UserService from '@/resources/user/user.service';
// import authenticated from '@/middleware//authenticated.middleware';
// Controller has to be added in index.ts in Controller array in constructor
class UserController {
    // private UserService = new UserService();
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.success = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: 'elko' });
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.success);
        // this.router.post(
        //     `${this.path}/register`,
        //     validationMiddleware(validate.register),
        //     this.register
        // );
        // this.router.post(
        //     `${this.path}/login`,
        //     validationMiddleware(validate.login),
        //     this.login
        // );
        // this.router.get(`${this.path}/current`, authenticated, this.getUser);
        // this.router.get(`${this.path}`, authenticated, this.getUsers);
    }
}
exports.default = UserController;
