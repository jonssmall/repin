'use strict';

const mysql = require('mysql');
module.exports = mysql.createPool({
  host : process.env.MYSQL_HOST,
  user : process.env.MYSQL_USER,  
  password: process.env.MYSQL_PW,
  database : 'repin'
});

// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });