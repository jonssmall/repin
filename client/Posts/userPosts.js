'use strict';
import PostsContainer from './allPosts';
import service from '../service';
class UserPostsContainer extends PostsContainer {
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    service.getUserPosts(this.props.match.params.id, posts => this.setState({posts: JSON.parse(posts)}));
  };
};

export default UserPostsContainer;