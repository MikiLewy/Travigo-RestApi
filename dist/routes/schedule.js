"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_1 = require("../controllers/schedule");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/events', schedule_1.getEvents);
router.get('/latest-events', schedule_1.getLatestEvents);
router.get('/event/:id', schedule_1.getEvent);
router.post('/create-event', [
    (0, express_validator_1.body)('title').trim().isLength({ min: 4 }).notEmpty(),
    (0, express_validator_1.body)('date').trim().isLength({ min: 4 }).notEmpty(),
    (0, express_validator_1.body)('place').trim().isLength({ min: 4 }).notEmpty(),
    (0, express_validator_1.body)('description').trim().isLength({ min: 5 }).notEmpty(),
], schedule_1.createEvent);
router.put('/edit-event/:id', [
    (0, express_validator_1.body)('title').trim().isLength({ min: 4 }).notEmpty(),
    (0, express_validator_1.body)('date').trim().isLength({ min: 4 }).notEmpty(),
    (0, express_validator_1.body)('place').trim().isLength({ min: 4 }).notEmpty(),
    (0, express_validator_1.body)('description').trim().isLength({ min: 5 }).notEmpty(),
], schedule_1.editEvent);
router.delete('/delete-event/:id', schedule_1.deleteEvent);
exports.default = router;
