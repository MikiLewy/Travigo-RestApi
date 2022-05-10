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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const CustomError_1 = require("../class/CustomError");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const param = errors.array()[0].param;
        let error = new CustomError_1.CustomError('Validation failed, entered data is incorrect', 422);
        if (param === 'email') {
            error = new CustomError_1.CustomError("Validation failed. Make sure the email address isn't used yet!", 422);
        }
        next(error);
        return;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 12);
        if (!hashedPassword) {
            const error = new CustomError_1.CustomError('Something went wrong', 500);
            next(error);
            return;
        }
        const user = new user_1.default({
            name: name,
            email: email,
            password: hashedPassword,
        });
        const result = yield user.save();
        res.status(201).json({ message: 'User created!', userId: result._id });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            const error = new CustomError_1.CustomError('Could not find the user with that email', 401);
            next(error);
            return;
        }
        const isEqual = yield (0, bcryptjs_1.compare)(password, user.password);
        if (!isEqual) {
            const error = new CustomError_1.CustomError('Wrong password', 401);
            next(error);
            return;
        }
        if (process.env.TOKEN_SECRET) {
            const token = (0, jsonwebtoken_1.sign)({ email: user.email, userId: user._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token: token, userId: user._id.toString(), userName: user.name });
        }
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        next(error);
    }
});
exports.login = login;
