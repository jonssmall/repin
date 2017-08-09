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
		.get(api.getPosts)
  	.post(isLoggedIn, api.newPost);  
  app.route('/posts/:id')		
    .delete(isLoggedIn, api.deletePost)
    .put(isLoggedIn, api.toggleLike); // PUT a like OR remove a like on a post.    
  app.route('/users/:userName/posts')
    .get(api.getUserPosts);

  function isLoggedIn (req, res, next) {		
    return req.isAuthenticated() ? next() : res.status('401').send('Unauthorized');
  };  
};