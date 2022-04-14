import { Router } from 'express';
import { getDestinations } from '../controllers/destinations';
const router = Router();

router.get('/destinations', getDestinations);

export default router;
