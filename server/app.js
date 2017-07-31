const mysql = require('mysql');
require('dotenv').load();

const connection = mysql.createConnection({
  host : process.env.MYSQL_HOST,
  user : process.env.MYSQL_USER,  
  password: process.env.MYSQL_PW,
  database : 'regram'
});

const q = 'show tables';
 
connection.query(q, function(err, result) {
  if(err) console.log(err);
  console.log(result);
});
 
connection.end();