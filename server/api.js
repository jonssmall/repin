'use strict';
const db = require('./sql');
module.exports = {
  getPosts: (req, resp) => {
    const q = `SELECT id, picture_url, description, 
      (SELECT count(*) FROM likes WHERE post_id = posts.id) AS likes,
      username AS author, profile_pic_url FROM posts
      INNER JOIN users ON posts.owner_id = users.github_id`;
    db.query(q, (err, res) => {
      if (err) throw err;
      resp.json(res);
    });
  },
  newPost: (req, resp) => {
    const post  = {
      owner_id: req.user.github_id,
      picture_url: req.body.picUrl,
      description: req.body.description
    };      
    db.query('INSERT INTO posts SET ?', post, (err, res) => {
      if (err) throw err;
      resp.json(res);
    });    
  },
  deletePost: (req, resp) => {
    const q = `DELETE FROM posts WHERE owner_id=${req.user.github_id} 
      AND post_id=${req.body.postId}`;
    db.query(q, (err, res) => {
      if (err) throw err;
      resp.json(res);
    });
  },
  getUserPosts: (req, resp) => {
    const q = `SELECT * FROM posts WHERE owner_id=${req.body.ownerId}`;
    db.query(q, (err, res) => {
      if (err) throw err;
      resp.json(res);
    });
  },
  toggleLike: (req, res) => { // Add or remove a like
    const q = `DELETE FROM likes WHERE user_id=${req.user.github_id} 
      AND post_id=${req.body.postId}`;
    db.query(q, (err, res) => {
      if (err) throw err;
      //if the response indicates that no row was deleted, none existed, so created it
      // TOOD: determine successful response
      if (res[0].status == "OK") {
        resp.json(res);
      } else {
        const newLike = {
          user_id: req.user._id,
          post_id: req.body.postId
        };
        db.query('INSERT INTO likes SET ?', newLike, (err, res) => {
          if (err) throw err;
          resp.json(res);
        });
      }
    });
  }
};