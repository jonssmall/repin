'use strict';
/*
  TODO:
  1. Abstract "Get current user" query into 1 function
  2. Use promises instead of callbacks.
*/
const githubStrategy = require('passport-github2').Strategy;
const db = require('./sql');
const authConfig = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${process.env.APP_URL}auth/github/callback`
};
module.exports = (passport) => {
	passport.serializeUser((user, done) => {         
		done(null, user.github_id);
	});
	passport.deserializeUser((id, done) => {    
    const getUserQ = `SELECT * FROM users WHERE github_id=${id}`; 
    db.query(getUserQ, (err, res) => {      
      done(err, res[0]);
    })    
	});
	passport.use(new githubStrategy(authConfig, (token, refreshToken, profile, done) => {            
    const getUserQ = `SELECT * FROM users WHERE github_id=${profile.id}`;    
    db.query(getUserQ, (err, res) => {
      if (err) return done(err); 
      if (res.length > 0) { //user exists        
        return done(null, res[0]);
      } else {
        const newUser  = {
          github_id: profile._json.id, 
          username: profile.username, 
          profile_pic_url: profile._json.avatar_url
        };
        const newUserQ = 'INSERT INTO users SET ?'
        db.query(newUserQ, newUser, (err, res) => {
          if (err) throw err;
          return done(null, newUser);
        })
      }
    });    
	}));
};