'use strict';
import React from 'react';
import service from '../service';
class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  };
  componentDidMount() {
    service.getPosts(posts => this.setState({posts}));    
  };  
  render() {    
    return (
      <div>
        Hello Posts.
      </div>
    );
  };
};

function PostsList(props) {
  
};

function Post(props) {  
  
};

export default PostsContainer;