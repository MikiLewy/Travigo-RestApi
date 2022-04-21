import { Router } from 'express';
import { getEvent, getEvents, editEvent, createEvent, deleteEvent, getLatestEvents } from '../controllers/schedule';
import { body } from 'express-validator';

const router = Router();

router.get('/events', getEvents);

router.get('/latest-events', getLatestEvents);

router.get('/event/:id', getEvent);

router.post(
  '/create-event',
  [
    body('title').trim().isLength({ min: 4 }).notEmpty(),
    body('date').trim().isLength({ min: 4 }).notEmpty(),
    body('place').trim().isLength({ min: 4 }).notEmpty(),
    body('description').trim().isLength({ min: 5 }).notEmpty(),
  ],
  createEvent
);

router.put(
  '/edit-event/:id',
  [
    body('title').trim().isLength({ min: 4 }).notEmpty(),
    body('date').trim().isLength({ min: 4 }).notEmpty(),
    body('place').trim().isLength({ min: 4 }).notEmpty(),
    body('description').trim().isLength({ min: 5 }).notEmpty(),
  ],
  editEvent
);

router.delete('/delete-event/:id', deleteEvent);

export default router;
