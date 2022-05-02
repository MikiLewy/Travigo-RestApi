import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../class/CustomError';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new CustomError('Not authenticated', 401);
    next(error);
  }
  const token = authHeader!.split(' ')[1];
  let decodedToken: any;
  try {
    if (process.env.TOKEN_SECRET) {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    }
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
  if (!decodedToken) {
    const error = new CustomError('Not authenticated', 401);
    next(error);
  }
  req.userId = decodedToken!.userId;
  next();
};
