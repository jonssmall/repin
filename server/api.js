'use strict';
const db = require('./sql');
module.exports = {
  getPosts: (req, resp) => {
    db.query('SELECT * FROM posts', (err, res) => {
      if (err) throw err;
      resp.json(res);
    });
  }
};