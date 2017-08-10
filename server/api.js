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
      picture_url: req.body.url,
      description: req.body.description
    };    
    db.query('INSERT INTO posts SET ?', post, (err, res) => {
      if (err) throw err;
      //todo: figure out limitations of 'this' to DRY out calling getPosts   
      const q = `SELECT id, picture_url, description, 
        (SELECT count(*) FROM likes WHERE post_id = posts.id) AS likes,
        username AS author, profile_pic_url FROM posts
        INNER JOIN users ON posts.owner_id = users.github_id`;
      db.query(q, (err, res) => {
        if (err) throw err;
        resp.json(res);
      });
    });    
  },
  deletePost: (req, resp) => {
    // TODO: how to communicate the failure to delete a different user's posts
    const q = `DELETE FROM posts WHERE owner_id=${req.user.github_id} 
      AND id=${req.params.id}`;
    db.query(q, (err, res) => {
      if (err) throw err;
      resp.json(req.params.id);
    });
  },
  getUserPosts: (req, resp) => {    
    const q = `SELECT id, picture_url, description,
      (SELECT count(*) FROM likes WHERE post_id = posts.id) AS likes,
      username AS author, profile_pic_url FROM posts
      INNER JOIN users ON posts.owner_id = users.github_id
      WHERE users.username = '${req.params.userName}'`    
    db.query(q, (err, res) => {
      if (err) throw err;
      resp.json(res);
    });
  },
  toggleLike: (req, resp) => {
    const q = `DELETE FROM likes WHERE user_id=${req.user.github_id} 
      AND post_id=${req.params.id}`;
    db.query(q, (err, res) => {
      if (err) throw err;
      //if the response indicates that no row was deleted, none existed, so create it      
      if (res.affectedRows > 0) {
        resp.json(-1);
      } else {
        const newLike = {
          user_id: req.user.github_id,
          post_id: req.params.id
        };
        db.query('INSERT INTO likes SET ?', newLike, (err, res) => {
          if (err) throw err;
          resp.json(1);
        });
      }
    });
  }
};