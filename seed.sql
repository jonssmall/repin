-- WARNING: THIS DESTROYS THE DB BEFORE BUILDING / REBUILDING IT

DROP DATABASE regram;
CREATE DATABASE regram;
USE regram;

CREATE TABLE users 
(
  twitter_id INT NOT NULL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  profile_pic_url VARCHAR(2083)
);

CREATE TABLE posts
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id INT,
  FOREIGN KEY(owner_id) REFERENCES users(twitter_id),
  picture_url VARCHAR(2083),
  description VARCHAR(200)
);

CREATE TABLE likes
(
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(twitter_id),
  FOREIGN KEY(post_id) REFERENCES posts(id),
  PRIMARY KEY(user_id, post_id)
);