import { Router } from 'express';
import { getBestDestinations, getDestinations } from '../controllers/destinations';
const router = Router();

router.get('/destinations', getDestinations);

router.get('/best-destinations', getBestDestinations);

export default router;
