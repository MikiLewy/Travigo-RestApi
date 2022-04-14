"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchEditEvent = exports.postCreateEvent = exports.getEvent = exports.getEvents = void 0;
const getEvents = (req, res, next) => {
    res.status(200).json({
        message: 'Successfully fetched events',
        events: [
            { id: new Date().toString(), title: 'First event', date: '12-03-2022', place: 'Washingtion', description: 'lorem lorem lorem' },
            { id: new Date().toString(), title: 'Second event', date: '09-05-2022', place: 'New York', description: 'lorem lorem lorem adadada' },
        ],
    });
};
exports.getEvents = getEvents;
const getEvent = (req, res, next) => {
    const eventId = req.params.id;
    res.status(200).json({
        message: 'Successfully fetched event',
        event: { id: new Date().toString(), title: 'First event', date: '12-03-2022', place: 'Washingtion', description: 'lorem lorem lorem' },
    });
};
exports.getEvent = getEvent;
const postCreateEvent = () => (req, res, next) => {
    const eventId = req.params.id;
    const title = req.body.title;
    const date = req.body.date;
    const place = req.body.place;
    const description = req.body.description;
    res
        .status(201)
        .json({
        message: 'Successfully created event ',
        event: { id: new Date().toString(), title: title, date: date, place: place, description: description },
    });
};
exports.postCreateEvent = postCreateEvent;
const patchEditEvent = () => (req, res, next) => {
    const eventId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedDate = req.body.date;
    const updatedPlace = req.body.place;
    const updatedDescription = req.body.description;
    res.status(201).json({
        message: 'Successfully updated event',
        updatedEvent: { id: new Date().toString(), title: updatedTitle, date: updatedDate, place: updatedPlace, description: updatedDescription },
    });
};
exports.patchEditEvent = patchEditEvent;
