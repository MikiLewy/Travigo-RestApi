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
exports.buyTicket = exports.addMoney = exports.getExpenses = void 0;
const CustomError_1 = require("../class/CustomError");
const destinations_1 = __importDefault(require("../models/destinations"));
const expenses_1 = __importDefault(require("../models/expenses"));
const tickets_1 = __importDefault(require("../models/tickets"));
const user_1 = __importDefault(require("../models/user"));
const getExpenses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield expenses_1.default.find({ user: req.userId });
        const user = yield user_1.default.findById(req.userId);
        res.status(200).json({ message: 'Successfully fetched expenses', expenses: expenses, totalMoney: user.totalBalance });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        next(error);
    }
});
exports.getExpenses = getExpenses;
const addMoney = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    try {
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            const error = new CustomError_1.CustomError('Could not find user', 404);
            next(error);
            return;
        }
        user.totalBalance += parseInt(amount);
        yield user.save();
        res.status(200).json({ message: 'Successfully added money', totalMoney: user.totalBalance });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        next(error);
    }
});
exports.addMoney = addMoney;
const buyTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationId = req.params.id;
    try {
        const destination = yield destinations_1.default.findById(destinationId);
        if (!destination) {
            const error = new CustomError_1.CustomError('Could not find destination', 404);
            next(error);
            return;
        }
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            const error = new CustomError_1.CustomError('Could not find user', 404);
            next(error);
            return;
        }
        const expenses = new expenses_1.default({
            user: req.userId,
            expenses: destination.price,
            date: new Date().toISOString().slice(0, 7),
        });
        if (user.totalBalance < destination.price) {
            const error = new CustomError_1.CustomError('You have not got enough money to buy this ticket', 401);
            next(error);
            return;
        }
        user.totalBalance -= destination.price;
        const ticket = new tickets_1.default({
            user: req.userId,
            destination: destinationId,
        });
        user.tickets.push(ticket);
        yield ticket.save();
        yield expenses.save();
        yield user.save();
        res.status(200).json({ message: 'Succefully add to expenses', totalMoney: user.totalBalance, expenses: expenses });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        next(error);
    }
});
exports.buyTicket = buyTicket;
