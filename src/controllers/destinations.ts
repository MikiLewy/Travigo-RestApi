import { Request, Response, NextFunction } from 'express';
import Destinations from '../models/destinations';
import { CustomError } from '../class/CustomError';
import User from '../models/user';
import Favorites from '../models/favorites';

export const getDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destinations = await Destinations.find();
    res.status(200).json({
      message: 'Successfull fetched destinations',
      destinations: destinations,
    });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
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
    next(error);
  }
};

export const getDestination = async (req: Request, res: Response, next: NextFunction) => {
  const destinationId = req.params.id;
  try {
    const destination = await Destinations.findById(destinationId);
    if (!destination) {
      const error = new CustomError('Could not find destination', 404);
      next(error);
      return;
    }
    res.status(200).json({ message: 'Successfully fetched destination', destination: destination });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};

export const addToFavorites = async (req: Request, res: Response, next: NextFunction) => {
  const destinationId = req.params.id;
  try {
    const destination = await Destinations.findById(destinationId);
    const user = await User.findById(req.userId);
    const existingItem = await Favorites.find({ destination: destinationId, creator: req.userId });

    if (existingItem.length > 0) {
      const error = new CustomError('Destination has already been added to favorites', 409);
      next(error);
      return;
    }
    if (!destination) {
      const error = new CustomError('Could not find destination', 404);
      next(error);
      return;
    }
    const favoriteItem = new Favorites({
      destination: destination,
      creator: req.userId,
    });

    user.favorites.push(favoriteItem);

    await user.save();
    await favoriteItem.save();
    res.status(200).json({ message: 'Successfully added destination to favorites' });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorites = await Favorites.find({ creator: req.userId }).populate('destination');
    res.status(200).json({ message: 'Succesfully fetched favorites', favorites: favorites });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    next(error);
  }
};

export const deleteFromFavorites = async (req: Request, res: Response, next: NextFunction) => {
  const favoritesId = req.params.id;
  try {
    const item = await Favorites.findById(favoritesId);

    if (!item) {
      const error = new CustomError('Could not find item', 404);
      next(error);
      return;
    }
    await Favorites.findByIdAndRemove(favoritesId);
    const user = await User.findById(req.userId);
    user.favorites.pull(favoritesId);
    await user.save();
    res.status(200).json({ message: 'Successfully deleted item' });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};
