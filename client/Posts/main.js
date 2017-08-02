'use strict';
import React from 'react';
import service from '../service';
class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  };

  componentDidMount() {
    service.getPosts();
  };
  
  render() {     
    return (
      <div>
        Hello Posts.
      </div>
    );
  };
};

//TODO: Abstract out to share with MyBooks component. Might have to compose delete vs. new request.
function PostsList(props) {
  
};

function Post(props) {  
  
};

export default PostsContainer;