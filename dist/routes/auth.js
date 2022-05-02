"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.put('/signup', [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
        return user_1.default.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
                return Promise.reject();
            }
            return Promise.resolve();
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)('password').trim().isLength({ min: 5 }),
    (0, express_validator_1.body)('name').trim().not().isEmpty(),
], auth_1.signup);
router.post('/login', auth_1.login);
exports.default = router;
