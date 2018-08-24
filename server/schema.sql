CREATE DATABASE questiondb
  WITH OWNER = adams
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'English_United Kingdom.1252'
       LC_CTYPE = 'English_United Kingdom.1252'
       CONNECTION LIMIT = -1;

CREATE TABLE public.questions
(
  question character(2000),
  id integer NOT NULL,
  CONSTRAINT questions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.answers
(
  answer character(225),
  question_id integer,
  answer_id integer NOT NULL ,
  CONSTRAINT answers_pkey PRIMARY KEY (answer_id),
  CONSTRAINT id FOREIGN KEY (question_id)
      REFERENCES public.questions (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE users
(
id serial primary key,
email text not null unique,
password text not null
);