"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../class/CustomError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new CustomError_1.CustomError('Not authenticated', 401);
        next(error);
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        if (process.env.TOKEN_SECRET) {
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        next(error);
    }
    if (!decodedToken) {
        const error = new CustomError_1.CustomError('Not authenticated', 401);
        next(error);
    }
    req.userId = decodedToken.userId;
    next();
};
