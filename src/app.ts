import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import destinationsRoutes from './routes/destinations';
import scheduleRoutes from './routes/schedule';
import path from 'path';
import { CustomError } from './class/CustomError';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.use(destinationsRoutes);
app.use('/schedule', scheduleRoutes);
app.use((err: CustomError, req: any, res: any, next: any) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect('mongodb+srv://mikolaj:bazaNode@cluster0.baoax.mongodb.net/travigo?retryWrites=true&w=majority')
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
