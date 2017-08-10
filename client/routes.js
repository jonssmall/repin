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
const PinRouter = () => (  
  <Router>
    <div>
      {AuthButton}
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