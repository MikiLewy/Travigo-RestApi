"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenses_1 = require("../controllers/expenses");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const router = (0, express_1.Router)();
router.get('/expenses', isAuth_1.default, expenses_1.getExpenses);
router.put('/add-money', isAuth_1.default, expenses_1.addMoney);
router.put('/expenses/:id', isAuth_1.default, expenses_1.buyTicket);
exports.default = router;
