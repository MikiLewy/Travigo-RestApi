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
exports.deleteEvent = exports.editEvent = exports.createEvent = exports.getEvent = exports.getLatestEvents = exports.getEvents = void 0;
const express_validator_1 = require("express-validator");
const schedule_1 = __importDefault(require("../models/schedule"));
const CustomError_1 = require("../class/CustomError");
const clearImage_1 = require("../util/clearImage");
const user_1 = __importDefault(require("../models/user"));
const getEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield schedule_1.default.find({ creator: req.userId });
        res.status(200).json({
            message: 'Successfully fetched events',
            events: events,
        });
    }
    catch (err) {
        err = new CustomError_1.CustomError('Something went wrong', 500);
        next(err);
    }
});
exports.getEvents = getEvents;
const getLatestEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield schedule_1.default.find({ creator: req.userId })
            .limit(4)
            .sort([['date', 1]]);
        res.status(200).json({
            message: 'Successfully fetched events',
            events: events,
        });
    }
    catch (err) {
        err = new CustomError_1.CustomError('Something went wrong', 500);
        next(err);
    }
});
exports.getLatestEvents = getLatestEvents;
const getEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const event = yield schedule_1.default.findById(eventId);
        if (!event) {
            const error = new CustomError_1.CustomError('Could not find event', 404);
            next(error);
            return;
        }
        res.status(200).json({
            message: 'Successfully fetched event',
            event: event,
        });
    }
    catch (err) {
        err = new CustomError_1.CustomError('Something went wrong', 500);
        next(err);
    }
});
exports.getEvent = getEvent;
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new CustomError_1.CustomError('Validation failed, entered data is incorrect', 422);
        next(error);
        return;
    }
    if (!req.file) {
        const error = new CustomError_1.CustomError('No image provided', 422);
        next(error);
        return;
    }
    const title = req.body.title;
    const date = req.body.date;
    const place = req.body.place;
    const description = req.body.description;
    const imageUrl = req.file.filename;
    let creator;
    const event = new schedule_1.default({
        title: title,
        date: date,
        place: place,
        description: description,
        imageUrl: imageUrl,
        creator: req.userId,
    });
    try {
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            const error = new CustomError_1.CustomError('Could not find the user', 404);
            next(error);
            return;
        }
        creator = user;
        user.schedule.push(event);
        yield user.save();
        yield event.save();
        res.status(201).json({
            message: 'Successfully created event',
            event: event,
            creator: {
                _id: creator._id,
                name: creator._name,
            },
        });
    }
    catch (err) {
        err = new CustomError_1.CustomError('Something went wrong', 500);
        next(err);
    }
});
exports.createEvent = createEvent;
const editEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new CustomError_1.CustomError('Validation failed, entered data is incorrect', 422);
        next(error);
        return;
    }
    try {
        const updatedTitle = req.body.title;
        const updatedDate = req.body.date;
        const updatedPlace = req.body.place;
        const updatedDescription = req.body.description;
        let imageUrl;
        const event = yield schedule_1.default.findById(eventId);
        if (!event) {
            const error = new CustomError_1.CustomError('Could not find event', 404);
            next(error);
            return;
        }
        if (req.file) {
            imageUrl = req.file.filename;
        }
        else {
            imageUrl = req.body.oldPath;
        }
        if (!imageUrl) {
            const error = new CustomError_1.CustomError('No image provided', 422);
            next(error);
            return;
        }
        if (imageUrl !== event.imageUrl) {
            (0, clearImage_1.clearImage)(event.imageUrl);
        }
        event.title = updatedTitle;
        event.date = updatedDate;
        event.place = updatedPlace;
        event.description = updatedDescription;
        event.imageUrl = imageUrl;
        yield event.save();
        res.status(200).json({
            message: 'Successfully updated event',
            event: event,
        });
    }
    catch (err) {
        err = new CustomError_1.CustomError('Something went wrong', 500);
        next(err);
    }
});
exports.editEvent = editEvent;
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const event = yield schedule_1.default.findById(eventId);
        if (!event) {
            const error = new CustomError_1.CustomError('Could not find event', 404);
            next(error);
            return;
        }
        (0, clearImage_1.clearImage)(event.imageUrl);
        yield schedule_1.default.findByIdAndRemove(eventId);
        const user = yield user_1.default.findById(req.userId);
        user.schedule.pull(eventId);
        yield user.save();
        res.status(200).json({ message: 'Deleted event' });
    }
    catch (err) {
        err = new CustomError_1.CustomError('Something went wrong', 500);
        next(err);
    }
});
exports.deleteEvent = deleteEvent;
