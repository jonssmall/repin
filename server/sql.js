'use strict';

const mysql = require('mysql');

module.exports = mysql.createConnection({
  host : process.env.MYSQL_HOST,
  user : process.env.MYSQL_USER,  
  password: process.env.MYSQL_PW,
  database : 'repin'
});

// const q = 'show tables';
 
// connection.query(q, function(err, result) {
//   if(err) console.log(err);
//   console.log(result);
// });

// connection.end();