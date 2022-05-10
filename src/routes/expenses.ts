import { Router } from 'express';
import { addMoney, buyTicket, getExpenses } from '../controllers/expenses';
import isAuth from '../middleware/isAuth';

const router = Router();

router.get('/expenses', isAuth, getExpenses);

router.put('/add-money', isAuth, addMoney);

router.put('/expenses/:id', isAuth, buyTicket);

export default router;
