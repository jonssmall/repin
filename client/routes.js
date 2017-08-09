'use strict';
import React from 'react';
import {
  HashRouter as Router,
  Route,  
  Link,
  Switch
} from 'react-router-dom';
import Posts from './Posts/allPosts';
import UserPosts from './Posts/userPosts';
import NewPost from './Posts/newPosts';
const PinRouter = () => (  
  <Router>
    <div>
      {AuthButton}
      <NewPost />
      <Switch>
        <Route path="/users/:name" component={UserPosts}/>      
        <Route path="/" component={Posts}/>                    
      </Switch>      
    </div>
  </Router>
);

const AuthButton = window.USER ? <a href="/logout" className="pure-menu-link">Logout</a> : 
                                 <a href="/auth/github" className="pure-menu-link">Login (Github)</a>;

export default PinRouter;