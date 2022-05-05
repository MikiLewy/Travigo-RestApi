import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Schedule from '../models/schedule';
import { CustomError } from '../class/CustomError';
import { clearImage } from '../util/clearImage';
import User from '../models/user';

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Schedule.find({ creator: req.userId });
    res.status(200).json({
      message: 'Successfully fetched events',
      events: events,
    });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};

export const getLatestEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Schedule.find({ creator: req.userId })
      .limit(4)
      .sort([['date', 1]]);
    res.status(200).json({
      message: 'Successfully fetched events',
      events: events,
    });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;
  try {
    const event = await Schedule.findById(eventId);
    if (!event) {
      const error = new CustomError('Could not find event', 404);
      next(error);
      return;
    }
    res.status(200).json({
      message: 'Successfully fetched event',
      event: event,
    });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new CustomError('Validation failed, entered data is incorrect', 422);
    next(error);
    return;
  }

  if (!req.file) {
    const error = new CustomError('No image provided', 422);
    next(error);
    return;
  }
  const title = req.body.title;
  const date = req.body.date;
  const place = req.body.place;
  const description = req.body.description;
  const imageUrl = req.file!.filename;
  let creator;
  const event = new Schedule({
    title: title,
    date: date,
    place: place,
    description: description,
    imageUrl: imageUrl,
    creator: req.userId,
  });
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new CustomError('Could not find the user', 404);
      next(error);
      return;
    }
    creator = user;
    user.schedule.push(event);
    await user.save();
    await event.save();
    res.status(201).json({
      message: 'Successfully created event',
      event: event,
      creator: {
        _id: creator._id,
        name: creator._name,
      },
    });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};

export const editEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new CustomError('Validation failed, entered data is incorrect', 422);
    next(error);
    return;
  }
  try {
    const updatedTitle = req.body.title;
    const updatedDate = req.body.date;
    const updatedPlace = req.body.place;
    const updatedDescription = req.body.description;
    let imageUrl;
    const event = await Schedule.findById(eventId);
    if (!event) {
      const error = new CustomError('Could not find event', 404);
      next(error);
      return;
    }
    if (req.file) {
      imageUrl = req.file.filename;
    } else {
      imageUrl = req.body.oldPath;
    }

    if (!imageUrl) {
      const error = new CustomError('No image provided', 422);
      next(error);
      return;
    }

    if (imageUrl !== event.imageUrl) {
      clearImage(event.imageUrl);
    }
    event.title = updatedTitle;
    event.date = updatedDate;
    event.place = updatedPlace;
    event.description = updatedDescription;
    event.imageUrl = imageUrl;
    await event.save();
    res.status(200).json({
      message: 'Successfully updated event',
      event: event,
    });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;
  try {
    const event = await Schedule.findById(eventId);
    if (!event) {
      const error = new CustomError('Could not find event', 404);
      next(error);
      return;
    }
    clearImage(event.imageUrl);
    await Schedule.findByIdAndRemove(eventId);
    const user = await User.findById(req.userId);
    user.schedule.pull(eventId);
    await user.save();
    res.status(200).json({ message: 'Deleted event' });
  } catch (err) {
    err = new CustomError('Something went wrong', 500);
    next(err);
  }
};
