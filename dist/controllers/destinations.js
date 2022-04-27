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
exports.getDestination = exports.getTopDestinations = exports.getDestinations = void 0;
const destinations_1 = __importDefault(require("../models/destinations"));
const CustomError_1 = require("../class/CustomError");
const getDestinations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinations = yield destinations_1.default.find();
        res.status(200).json({
            message: 'Successfull fetched destinations',
            destinations: destinations,
        });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        throw error;
    }
});
exports.getDestinations = getDestinations;
const getTopDestinations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topDestinations = yield destinations_1.default.find()
            .limit(4)
            .sort([['rating', -1]]);
        res.status(200).json({
            message: 'Successfully fetched destinations',
            destinations: topDestinations,
        });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        throw error;
    }
});
exports.getTopDestinations = getTopDestinations;
const getDestination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationId = req.params.id;
    try {
        const destination = yield destinations_1.default.findById(destinationId);
        if (!destination) {
            const error = new CustomError_1.CustomError('Could not find destination', 404);
            throw error;
        }
        res.status(200).json({ message: 'Successfully fetched destination', destination: destination });
    }
    catch (err) {
        const error = new CustomError_1.CustomError('Something went wrong', 500);
        throw error;
    }
});
exports.getDestination = getDestination;
