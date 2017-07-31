'use strict';

const githubStrategy = require('passport-github2').Strategy;
const sql = require('./sql');

const configAuth = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	}
};

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {    
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
    // TODO: Stash user in DB 
		// User.findById(id, function (err, user) {
		// 	done(err, user);
    // });
    done(null, obj)
	});

	passport.use(new githubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
    //TODO: Persist user in DB and/or return user info
		done(null, profile)
	}));
};