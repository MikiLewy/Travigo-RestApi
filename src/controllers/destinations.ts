import { Request, Response, NextFunction } from 'express';
import Destinations from '../models/destinations';
import { CustomError } from '../class/CustomError';

export const getDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destinations = await Destinations.find();
    res.status(200).json({
      message: 'Successfull fetched destinations',
      destinations: destinations,
    });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    throw error;
  }
};

export const getTopDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topDestinations = await Destinations.find()
      .limit(4)
      .sort([['rating', -1]]);
    res.status(200).json({
      message: 'Successfully fetched destinations',
      destinations: topDestinations,
    });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    throw error;
  }
};

export const getDestination = async (req: Request, res: Response, next: NextFunction) => {
  const destinationId = req.params.id;
  try {
    const destination = await Destinations.findById(destinationId);
    if (!destination) {
      const error = new CustomError('Could not find destination', 404);
      throw error;
    }
    res.status(200).json({ message: 'Successfully fetched destination', destination: destination });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    throw error;
  }
};
