import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../class/CustomError';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import { config } from 'dotenv';

config();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const param = errors.array()[0].param;
    let error = new CustomError('Validation failed, entered data is incorrect', 422);
    if (param === 'email') {
      error = new CustomError("Validation failed. Make sure the email address isn't used yet!", 422);
    }
    next(error);
    return;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPassword = await hash(password, 12);
    if (!hashedPassword) {
      const error = new CustomError('Something went wrong', 500);
      next(error);
      return;
    }
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const result = await user.save();
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new CustomError('Could not find the user with that email', 401);
      next(error);
      return;
    }
    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      const error = new CustomError('Wrong password', 401);
      next(error);
      return;
    }

    if (process.env.TOKEN_SECRET) {
      const token = sign({ email: user.email, userId: user._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token: token, userId: user._id.toString(), userName: user.name });
    }
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};
