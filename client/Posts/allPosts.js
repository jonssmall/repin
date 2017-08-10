'use strict';
import React from 'react';
import NewPost from './newPosts';
import service from '../service';
class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleLike = this.toggleLike.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.addPost = this.addPost.bind(this);
  };
  toggleLike(id) {
    service.toggleLike(id, res => {      
      const posts = this.state.posts.map(p => p.id != id ? p : {...p, likes: p.likes + JSON.parse(res)});
      this.setState({posts});
    });
  };
  deletePost(id) {
    service.deletePost(id, res => {     
      this.setState({posts: this.state.posts.filter(p => p.id != JSON.parse(res))});      
    });
  };
  addPost(post) {
    const posts = this.state.posts;
    posts.push(JSON.parse(post)[0]);
    this.setState({posts});
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
      <div>
        <NewPost addHandler={this.addPost} />
        <PostsList {...props} />
      </div>
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
  const deleteButton = window.USER && props.author === window.USER.username ? 
    <button onClick={props.deleteHandler.bind(null, props.id)}>Delete</button>
    : null;
  const likeButton = window.USER ? 
    <button onClick={props.likeHandler.bind(null, props.id)}>Likes: {props.likes}</button>
    : null;
  return (
    <div>
      {props.id}, {props.picture_url}, {props.description}, {props.author}, {props.profile_pic_url}
      {likeButton}
      {deleteButton}
    </div>
  );
};

export default PostsContainer;