'use strict';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,  
  Link    
} from 'react-router-dom';
import Posts from './Posts/main';
const PinRouter = () => (  
  <Router>
    <div>
      {AuthButton}
      <Route path="/" component={Posts}/>
    </div>
  </Router>
);

const AuthButton = window.USER ? <a href="/logout" className="pure-menu-link">Logout</a> : 
                                 <a href="/auth/github" className="pure-menu-link">Login (Github)</a>;

export default PinRouter;