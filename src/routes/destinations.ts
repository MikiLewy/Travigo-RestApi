import { Router } from 'express';
import { getTopDestinations, getDestinations, getDestination } from '../controllers/destinations';
const router = Router();

router.get('/destinations', getDestinations);

router.get('/destination/:id', getDestination);

router.get('/top-destinations', getTopDestinations);

export default router;
