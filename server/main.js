'use strict';
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();
const router = express.Router({mergeParams: true});
require('dotenv').load();
require('./auth')(passport);
app.use(bodyParser.json());
app.use('/client', express.static(process.cwd() + '/client'));
app.use(router);
app.use(session({
	secret: 'secretPin',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('trust proxy', true);
routes(app, passport);
const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Node.js listening on port ${port}...`);
});