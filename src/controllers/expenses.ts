import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../class/CustomError';
import Destinations from '../models/destinations';
import Expenses from '../models/expenses';
import Tickets from '../models/tickets';
import User from '../models/user';

export const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await Expenses.find({ user: req.userId });
    const user = await User.findById(req.userId);
    res.status(200).json({ message: 'Successfully fetched expenses', expenses: expenses, totalMoney: user.totalBalance });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};

export const addMoney = async (req: Request, res: Response, next: NextFunction) => {
  const amount = req.body.amount;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new CustomError('Could not find user', 404);
      next(error);
      return;
    }

    user.totalBalance += parseInt(amount);

    await user.save();

    res.status(200).json({ message: 'Successfully added money', totalMoney: user.totalBalance });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};

export const buyTicket = async (req: Request, res: Response, next: NextFunction) => {
  const destinationId = req.params.id;
  try {
    const destination = await Destinations.findById(destinationId);
    if (!destination) {
      const error = new CustomError('Could not find destination', 404);
      next(error);
      return;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new CustomError('Could not find user', 404);
      next(error);
      return;
    }
    const expenses = new Expenses({
      user: req.userId,
      expenses: destination.price,
      date: new Date().toISOString().slice(0, 7),
    });
    if (user.totalBalance < destination.price) {
      const error = new CustomError('You have not got enough money to buy this ticket', 401);
      next(error);
      return;
    }
    user.totalBalance -= destination.price;
    const ticket = new Tickets({
      user: req.userId,
      destination: destinationId,
    });
    user.tickets.push(ticket);
    await ticket.save();
    await expenses.save();
    await user.save();
    res.status(200).json({ message: 'Succefully add to expenses', totalMoney: user.totalBalance, expenses: expenses });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};
