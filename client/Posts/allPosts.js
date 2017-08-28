'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
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
    if(confirm("Delete post?")) {
      service.deletePost(id, res => {     
        this.setState({posts: this.state.posts.filter(p => p.id != JSON.parse(res))});      
      });
    }
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
        {window.USER ? <NewPost addHandler={this.addPost} /> : null}
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

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture_url: props.picture_url
    };
    this.sourceError = this.sourceError.bind(this);    
  };
  sourceError() {
    this.setState({
      picture_url: '/client/notFound.png'
    });
  };
  render() {
    const deleteButton = window.USER && this.props.author === window.USER.username ? 
      <button className="button-error pure-button" onClick={this.props.deleteHandler.bind(null, this.props.id)}>Delete</button>
      : null;
    const likeButton = 
      <button disabled={!window.USER} className="button-success pure-button" onClick={this.props.likeHandler.bind(null, this.props.id)}>
        Likes: {this.props.likes}
      </button>      
    return (
      <div className="pin-card">
        <Link to={`/users/${this.props.author}`} >
          <img className='profile-bubble' src={this.props.profile_pic_url} title={this.props.author}/>
        </Link>
        <div>
          <img className='card-picture' src={this.state.picture_url} onError={this.sourceError}/>
        </div>        
        {this.props.description}
        <div className="button-tray">
          {likeButton}
          {deleteButton}
        </div>
      </div>
    );
  };
}

export default PostsContainer;