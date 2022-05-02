import { Router } from 'express';
import { getTopDestinations, getDestinations, getDestination } from '../controllers/destinations';
import isAuth from '../middleware/isAuth';
const router = Router();

router.get('/destinations', isAuth, getDestinations);

router.get('/destination/:id', isAuth, getDestination);

router.get('/top-destinations', isAuth, getTopDestinations);

export default router;
