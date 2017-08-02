'use strict';
import React from 'react';
import service from '../service';
class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {
    service.getPosts(posts => this.setState({posts: JSON.parse(posts)}));
  };  
  render() {    
    if (!this.state.posts) return <div>Loading...</div>;
    return (
      <PostsList posts={this.state.posts} />
    );
  };
};

function PostsList(props) {
  const posts = props.posts.map(p => {
    return (
      <div>
        {p.id}, {p.picture_url}, {p.description}, {p.likes}, {p.author}, {p.profile_pic_url}
      </div>
    )
  });
  return <div>{posts}</div>
};

function Post(props) {  
  
};

export default PostsContainer;