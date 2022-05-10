import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { CustomError } from './class/CustomError';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import destinationsRoutes from './routes/destinations';
import scheduleRoutes from './routes/schedule';
import authRoutes from './routes/auth';
import expensesRoutes from './routes/expenses';
import { config } from 'dotenv';

config();
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

app.use('/auth', authRoutes);
app.use(destinationsRoutes);
app.use('/schedule', scheduleRoutes);
app.use(expensesRoutes);
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrond';
  res.status(status).json({ message: message, status: status });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.baoax.mongodb.net/travigo?retryWrites=true&w=majority`)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
