import { Router } from 'express';
import { getTopDestinations, getDestinations, getDestination, addToFavorites, getFavorites, deleteFromFavorites } from '../controllers/destinations';
import isAuth from '../middleware/isAuth';
const router = Router();

router.get('/destinations', isAuth, getDestinations);

router.get('/destination/:id', isAuth, getDestination);

router.get('/favorites', isAuth, getFavorites);

router.get('/favorites/:id', isAuth, addToFavorites);

router.delete('/favorites/:id', isAuth, deleteFromFavorites);

router.get('/top-destinations', isAuth, getTopDestinations);

export default router;
