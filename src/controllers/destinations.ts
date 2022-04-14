import { Request, Response, NextFunction } from 'express';

export const getDestinations = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Successfull fetched data', destinations: [{ id: new Date().toString(), title: 'First destination' }] });
};

export const getBestDestinations = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Successfull fetched data', destinations: [{ id: new Date().toString(), title: 'Best destination' }] });
};

export const getDestination = (req: Request, res: Response, next: NextFunction) => {
  const destinationId = req.params.id;
};
