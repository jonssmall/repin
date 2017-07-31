-- WARNING: THIS DESTROYS THE DB BEFORE BUILDING / REBUILDING IT

DROP DATABASE repin;
CREATE DATABASE repin;
USE repin;

CREATE TABLE users 
(
  github_id INT NOT NULL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  profile_pic_url VARCHAR(2083)
);

CREATE TABLE posts
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id INT,
  FOREIGN KEY(owner_id) REFERENCES users(github_id),
  picture_url VARCHAR(2083),
  description VARCHAR(200)
);

CREATE TABLE likes
(
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(github_id),
  FOREIGN KEY(post_id) REFERENCES posts(id),
  PRIMARY KEY(user_id, post_id)
);

-- EXAMPLE USAGE - PUT YOUR OWN GITHUB ID
-- insert into posts (owner_id, picture_url, description) values
-- (ID, "https://www.pexels.com/photo/calm-conifers-countryside-dawn-449460/", "A nice lake.");

-- insert into posts (owner_id, picture_url, description) values
-- (ID, "https://www.pexels.com/photo/adventure-beach-coast-daylight-457044/", "Sandy Beach.");

-- insert into posts (owner_id, picture_url, description) values
-- (ID, "https://www.pexels.com/photo/brown-and-white-lizard-standing-on-brown-surface-87767/", "Cool gecko.");
