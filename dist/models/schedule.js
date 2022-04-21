"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const scheduleSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    creator: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Schedule', scheduleSchema);
