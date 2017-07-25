CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fName VARCHAR(63) NOT NULL,
  lName VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS memberships (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  group_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (group_id) REFERENCES groups (id)
);

TRUNCATE TABLE users;
INSERT INTO users (fName, lName) VALUES
  ('Tom','Hardy'),       -- 1
  ('Matt','Damon'),      -- 2
  ('Will','Ferrell'),    -- 3
  ('Steve','Carell'),    -- 4
  ('Charlize','Theron'); -- 5

TRUNCATE TABLE groups;
INSERT INTO groups (name) VALUES
  ('Actor'),             -- 1
  ('Comedian'),          -- 2
  ('Hockey Player');     -- 3

TRUNCATE TABLE memberships;
INSERT INTO memberships (user_id, group_id) VALUES
  (1,1),
  (2,1),
  (3,1),
  (3,2),
  (4,1),
  (4,2),
  (4,3),
  (5,1);

-- List of groups "User A" has a member in
SELECT CONCAT(u.fName, ' ', u.lName) as Name, g.name as `Group`
FROM memberships m
INNER JOIN groups g ON g.id = m.group_id
INNER JOIN users u ON u.id = m.user_id
WHERE u.lName = 'Ferrell';

-- Users with memberships in either GroupA or GroupB
SELECT DISTINCT CONCAT(u.fName, ' ', u.lName) as Name
FROM memberships m
INNER JOIN users u ON u.id = m.user_id
INNER JOIN groups g ON g.id = m.group_id
WHERE g.name = 'Comedian' OR g.name = 'Hockey Player';

-- Users with memberships in both GroupA and GroupB
SELECT Actors.Name as ActorName FROM (
  SELECT CONCAT(u.fName, ' ', u.lName) as Name
  FROM users u
  INNER JOIN memberships m ON m.user_id = u.id
  INNER JOIN groups g ON g.id = m.group_id
  WHERE g.name = 'Comedian' OR g.name = 'Hockey Player'
) as Actors
GROUP BY ActorName
HAVING COUNT(Actors.name) = 2;

-- C:\wamp64\bin\mysql\mysql5.7.14\bin\mysql -u root lightspeed < C:\wamp64\www\lightspeed-interview\sql-questions.sql
