'use strict';
import PostsContainer from './allPosts';
import service from '../service';
class UserPostsContainer extends PostsContainer {
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {    
    service.getUserPosts(this.props.match.params.name, posts => this.setState({posts: JSON.parse(posts)}));
  };
};

export default UserPostsContainer;