import { Router } from 'express';
import { getEvent, getEvents, editEvent, createEvent, deleteEvent, getLatestEvents } from '../controllers/schedule';
import { body } from 'express-validator';
import isAuth from '../middleware/isAuth';

const router = Router();

router.get('/events', isAuth, getEvents);

router.get('/latest-events', isAuth, getLatestEvents);

router.get('/event/:id', isAuth, getEvent);

router.post(
  '/create-event',
  isAuth,
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
  isAuth,
  [
    body('title').trim().isLength({ min: 4 }).notEmpty(),
    body('date').trim().isLength({ min: 4 }).notEmpty(),
    body('place').trim().isLength({ min: 4 }).notEmpty(),
    body('description').trim().isLength({ min: 5 }).notEmpty(),
  ],
  editEvent
);

router.delete('/delete-event/:id', isAuth, deleteEvent);

export default router;
