import { Router } from 'express';
import { getTickets } from '../controllers/tickets';
import isAuth from '../middleware/isAuth';

const router = Router();

router.get('/tickets', isAuth, getTickets);

export default router;
