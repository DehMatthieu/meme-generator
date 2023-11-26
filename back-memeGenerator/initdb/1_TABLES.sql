create table users
(
    id SERIAL PRIMARY KEY,
    login TEXT not null,
    password TEXT not null,
    cookie TEXT
);

create table memes
(
    id SERIAL PRIMARY KEY,
    first_prompt TEXT not null,
    second_prompt TEXT not null,
    images_id int,
    users_id int
);

create table users_memes
(
    id SERIAL PRIMARY KEY,
    users_id int not null,
    memes_id int not null
);
create table images
(
    id SERIAL PRIMARY KEY,
    dataurl varchar null,
    user_id int
);