-- CREATE  DATABASE IF NOT EXISTS questiondb
 CREATE TABLE IF NOT EXISTS public.users
(
id serial primary key,
email text not null unique,
password text not null,
name text not null
);

CREATE TABLE IF NOT EXISTS public.questions
(
  question character(225),
  id serial NOT NULL primary key,
  user_Id integer not null REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.answers
(
  answer character(225),
  question_id integer,
  answer_id serial NOT NULL,
  is_favourite boolean Default false,
  user_Id integer not null REFERENCES public.users(id),
  CONSTRAINT answers_pkey PRIMARY KEY (answer_id),
  CONSTRAINT id FOREIGN KEY (question_id)
      REFERENCES public.questions (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE cascade
);

