import bodyParser from 'body-parser';
import express from 'express';
import destinationsRoutes from './routes/destinations';
import scheduleRoutes from './routes/schedule';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(destinationsRoutes);
app.use('/schedule', scheduleRoutes);

app.listen(8080);
