import {ajax} from './ajax';
export default {
  getPosts: () => {
    ajax("GET", "/posts/", null, (res) => {
      console.log(res);
    });
  },
  newPost: (picUrl, description) => {
    ajax("POST", "/posts/", {picUrl, description}, (res) => {
      console.log(res);
    });
  }
};