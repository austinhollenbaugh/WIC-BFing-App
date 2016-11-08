CREATE TABLE users (
  id serial PRIMARY KEY not null,
  name varchar(70),
  type varchar(20),
  facebook_id varchar(100),
  google_id varchar(100),
  photo varchar(100)
);

CREATE TABLE messages (
  id serial PRIMARY KEY not null,
  date_time timestamp with time zone,
  message text,
  user_id integer references users,
  room_id varchar(50)
);

-- CREATE TABLE conversations (
--   id serial PRIMARY KEY not null,
--   client_id integer,
--   admin_id integer,
--   room_id varchar(50) references messages(room_id)
-- );
