import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes';
import { errorHandler, logErrors, logRequests } from './middlewares';
import { normalizePort } from './services/util.service';
import { logger } from './services/logger.service';

dotenv.config();

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.use(logErrors);
app.use(errorHandler);

const PORT = normalizePort(process.env.PORT || '3000');

app.listen(PORT, () => {
  logger.log(`App is listening on port ${PORT}!`);
});

export default app;
