DROP TABLE updates;
DROP TABLE users_habits;
DROP TABLE habits;
DROP TABLE users;

CREATE TABLE users
(
  user_id serial NOT NULL PRIMARY KEY,
  username character varying(200),
  password character varying(50),
  location character varying(200) DEFAULT 'Berkeley, CA'
);

INSERT INTO users (username, password)
VALUES ('Vy', '1');

INSERT INTO users (username, password)
VALUES ('Jamil', '2');

INSERT INTO users (username, password)
VALUES ('Kim', '3');

INSERT INTO users (username, password)
VALUES ('Glenn', '4');

CREATE TABLE habits
(
  habit_id serial NOT NULL PRIMARY KEY,
  habit character varying(200),
  category character varying(200)
);

CREATE TABLE users_habits
(
  user_habit_id serial NOT NULL PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users (user_id),
  habit_id integer NOT NULL REFERENCES habits (habit_id)
);

CREATE TABLE updates
(
  update_id serial NOT NULL PRIMARY KEY,
  habit_id INTEGER NOT NULL REFERENCES habits (habit_id),
  update_time TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  kudos_count INTEGER default 0
);
