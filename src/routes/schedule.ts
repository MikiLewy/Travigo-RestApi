import { Router } from 'express';
import { getEvent, getEvents, patchEditEvent, postCreateEvent } from '../controllers/schedule';

const router = Router();

router.get('/events', getEvents);

router.get('/event', getEvent);

router.patch('/edit-event', patchEditEvent);

router.post('/create-event', postCreateEvent);

export default router;
