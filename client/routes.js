'use strict';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,  
  Link    
} from 'react-router-dom';
import Posts from './Posts/allPosts';
import UserPosts from './Posts/userPosts';
import NewPost from './Posts/newPosts';
const PinRouter = () => (  
  <Router>
    <div>
      {AuthButton}
      <NewPost />
      <Route path="/" component={Posts}/>
      {/* TODO: NOT WORKING */}
      <Route path="/hi" component={UserPosts}/>
    </div>
  </Router>
);

const AuthButton = window.USER ? <a href="/logout" className="pure-menu-link">Logout</a> : 
                                 <a href="/auth/github" className="pure-menu-link">Login (Github)</a>;

export default PinRouter;