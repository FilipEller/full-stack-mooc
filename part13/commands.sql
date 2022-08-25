CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) values (
  'Tom Cooper',
  'https://medium.com/@x_TomCooper_x/ukraine-war-23-august-2022-2ae2cc6053ce',
  'Ukraine War, 23 August 2022',
  64
);

INSERT INTO blogs (url, title) values (
  'https://medium.com/predict/starlink-is-in-big-trouble-a7798b2c2fe1',
  'Starlink Is In Big Trouble'
);


