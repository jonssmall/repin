'use strict';
import React from 'react';
import service from '../service';
class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleLike = this.toggleLike.bind(this);
    this.deletePost = this.deletePost.bind(this);
  };
  toggleLike(id) {
    console.log(id);
  };
  deletePost(id) {
    console.log(id);
  };
  componentDidMount() {
    service.getPosts(posts => this.setState({posts: JSON.parse(posts)}));
  };
  render() {    
    if (!this.state.posts) return <div>Loading...</div>;
    const props = {
      posts: this.state.posts,
      toggleLike: this.toggleLike,
      deletePost: this.deletePost
    };
    return (
      <PostsList {...props} />
    );
  };
};

function PostsList(props) {
  const posts = props.posts.map(p => {
    p.likeHandler = props.toggleLike;
    p.deleteHandler = props.deletePost;
    return (      
      <Post key={p.id} {...p} />
    );
  });
  return <div>{posts}</div>
};

function Post(props) {    
  return (
    <div>
      {props.id}, {props.picture_url}, {props.description}, {props.author}, {props.profile_pic_url}
      <button onClick={props.likeHandler.bind(null, props.id)}>Likes: {props.likes}</button>
      <button onClick={props.deleteHandler.bind(null, props.id)}>Delete</button>
    </div>
  );
};

export default PostsContainer;