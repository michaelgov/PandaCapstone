import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import msIdExpress from 'microsoft-identity-express';
const appSettings = {
    appCredentials: {
        clientId:  "8ba918cd-43eb-48fe-a460-72f2721d6626",
        tenantId:  "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret:  "RcG8Q~nzbcLdzmBr4G~mon9xTRRckwXE~LzOQcY5"
    },
    authRoutes: {
        redirect: "https://website-sharer-jonnykim01.azurewebsites.net/redirect", //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
        error: "/error", // the wrapper will redirect to this route in case of any error.
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt.
    }
};

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js'
import models from './models.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
    secret: "This is a secret key! asdasdasds asdttytfhgfh44332",
    saveUninitialized: true,
    cookie: {},
    resave: false
}));

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.use((req, res, next) => {
    req.models = models;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/signin',
    msid.signIn({postLoginRedirect: '/'})
);

app.get('/signout',
    msid.signOut({postLogoutRedirect: '/'})
);

app.get('/error', (req, res) => {
    res.status(500).send("Error: Server error")
});

app.get('/unauthorized', (req, res) => {
    res.status(401).send("Error: Unauthorized")
});

module.exports = app;