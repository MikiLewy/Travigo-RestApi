import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../class/CustomError';
import Tickets from '../models/tickets';

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickets = await Tickets.find({ user: req.userId }).populate('destination');

    res.status(200).json({ message: 'Successfully fetched tickets', tickets: tickets });
  } catch (err) {
    console.log(err);

    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};
