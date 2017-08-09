import {ajax} from './ajax';
export default {
  getPosts: (cb) => ajax("GET", "/posts/", null, res => cb(res)),
  getUserPosts: (userId, cb) => ajax("GET", `/users/${userId}/posts`, null, res => cb(res)),
  newPost: (postObj, cb) => ajax("POST", "/posts/", postObj, res => cb(res))
};