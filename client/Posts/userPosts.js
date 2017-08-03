//TODO: Do i need this? What about filtering allPosts by github_id ???
'use strict';
import React from 'react';
import service from '../service';
class UserPostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};    
  };
  render() {            
    return (
      <div>User Posts</div>
    );
  };
};

export default UserPostsContainer;