import {ajax} from './ajax';
export default {
  getPosts: (cb) => ajax("GET", "/posts/", null, res => cb(res)),
  getUserPosts: (userName, cb) => ajax("GET", `/users/${userName}/posts`, null, res => cb(res)),
  newPost: (postObj, cb) => ajax("POST", "/posts/", postObj, res => cb(res)),
  deletePost: (postId, cb) => ajax("DELETE", `/posts/${postId}`, null, res => cb(res))
};