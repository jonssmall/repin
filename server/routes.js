'use strict';
const api = require('./api');
module.exports = (app, passport) => {	
	app.route('/')
		.get((req, res) => {			
			res.set('Content-Type', 'text/html').status(200).end(require('./view')(req.user));
		});
	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});            
	app.route('/auth/github')
		.get((req, res) => {                  
      passport.authenticate('github')(req, res);      
		});                    
  app.route('/auth/github/callback')
		.get((req, res, next) => {                                    
			passport.authenticate('github', {
				successRedirect: '/',
				failureRedirect: '/' //how to handle failure
			})(req, res, next);
		});	
	app.route('/posts')
		.get(api.getPosts) //GET all of the posts.
  // 	.post(isLoggedIn, doSomething); POST a new post.    
  
  // app.route('/posts/:id')		
  //   .delete(isLoggedIn, doSomething); DELETE user's own post
  //   .put(isLoggedIn, doSomething); PUT a like OR remove a like on a post.
    
  // app.route('/users/:user/posts')
  //   .get(doSomething); GET all of a user's posts.

  function isLoggedIn (req, res, next) {		
    return req.isAuthenticated() ? next() : res.status('401').send('Unauthorized');
  };
  
};