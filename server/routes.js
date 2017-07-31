'use strict';

module.exports = (app, passport) => {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status('401').send('Unauthorized');
		}
	};

	app.route('/')
		.get((req, res) => {
			const html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
    		<title>reBooks</title>
    		<meta charset="UTF-8">	
    		<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" />
				<link rel="stylesheet" href="/app/style/side-menu.css">
			</head>
			<body>
    		Hello.
				<script type="text/javascript" charset="utf-8">
					window.USER = ${JSON.stringify(req.user)};					
				</script>    		
			</body>
			</html>
			`;
			res.set('Content-Type', 'text/html').status(200).end(html);
		});

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});    
        
	app.route('/auth/github')
		.get((req, res) => {                  
      passport.authenticate('github')(req, res);
      // TODO: test if passport.authenticate('github'); works for extra cool functional programming
		});                    

  app.route('/auth/github/callback')
		.get((req, res, next) => {                                    
			passport.authenticate('github', {
				successRedirect: '/',
				failureRedirect: '/' //how to handle failure
			})(req, res, next);
		});
	
	// app.route('/posts')
	// 	.get(doSomething) GET all of the posts.
  // 	.post(isLoggedIn, doSomething); POST a new post.    
  
  // app.route('/posts/:id')		
  //   .delete(isLoggedIn, doSomething); DELETE user's own post
  //   .put(isLoggedIn, doSomething); PUT a like OR remove a like on a post.
    
  // app.route('/users/:user/posts')
  //   .get(doSomething); GET all of a user's posts.

};