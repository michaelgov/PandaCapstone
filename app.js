import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';

import indexRouter from './routes/index.js';
import citationsRouter from './routes/api/controllers/citations.js';
import resourcesRouter from './routes/api/controllers/resources.js';
import models from './models.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.models = models;
    next();
});

app.use('/', indexRouter);
app.use('/citations', citationsRouter);
app.use('/resources', resourcesRouter);

export default app;