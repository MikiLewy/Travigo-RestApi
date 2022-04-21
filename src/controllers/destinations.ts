import { Request, Response, NextFunction } from 'express';

export const getDestinations = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Successfull fetched data',
    destinations: [
      {
        _id: new Date().toString(),
        title: 'First destination',
        place: 'Washington',
        date: '23-02-2022',
        rating: '4.5',
        price: 150,
        description: 'lorem lorem lorem lorem',
        imageUrl: 'images/mountains.jpeg',
      },
      {
        _id: new Date().toString(),
        title: 'Second destination',
        place: 'New York',
        date: '10-05-2022',
        rating: '3.9',
        price: 240,
        description: 'lorem lorem lorem lorem',
        imageUrl: 'images/mountains.jpeg',
      },
      {
        _id: new Date().toString(),
        title: 'Thrid destination',
        place: 'London',
        date: '01-09-2022',
        rating: '3.5',
        price: 120,
        description: 'lorem lorem lorem lorem',
        imageUrl: 'images/mountains.jpeg',
      },
    ],
  });
};

export const getBestDestinations = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Successfull fetched data',
    destinations: [
      {
        _id: new Date().toString(),
        title: 'First destination',
        place: 'Washington',
        date: '23-02-2022',
        rating: '4.5',
        price: 150,
        description: 'lorem lorem lorem lorem',
        imageUrl: 'images/mountains.jpeg',
      },
      {
        _id: new Date().toString(),
        title: 'Second destination',
        place: 'New York',
        date: '10-05-2022',
        rating: '3.9',
        price: 240,
        description: 'lorem lorem lorem lorem',
        imageUrl: 'images/mountains.jpeg',
      },
      {
        _id: new Date().toString(),
        title: 'Thrid destination',
        place: 'London',
        date: '01-09-2022',
        rating: '3.5',
        price: 120,
        description: 'lorem lorem lorem lorem',
        imageUrl: 'images/mountains.jpeg',
      },
    ],
  });
};

export const getDestination = (req: Request, res: Response, next: NextFunction) => {
  const destinationId = req.params.id;
};
