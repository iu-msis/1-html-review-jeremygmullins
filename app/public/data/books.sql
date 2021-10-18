-- database-2.cluster-ro-cowe6qx6tye0.us-east-2.rds.amazonaws.com
-- CREATE USER 'msis-reader'@'%' IDENTIFIED BY 'msisreadonly';
CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS books;
CREATE TABLE books (
	id int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(500) UNIQUE NOT NULL,
    author varchar(500) NOT NULL,
    yearpublished int NOT NULL,
    publisher varchar(500) NOT NULL,
    pagecount int NOT NULL,
    price int NOT NULL,
);

INSERT INTO books (id, title, author, yearpublished, publisher, pagecount, price) VALUES 
(1, 'Slaughterhouse Five', 'Kurt Vonnegut', 1969, 'Delacorte', 192, 7.99),
(2, 'Greenlights', 'Matthew McConaughey', 2020, 'Crown', 304, 16.95),
(3, 'Cant Hurt Me', 'David Goggins', 2018, 'Lioncrest', 364, 17.95)
(4, 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', 2016, 'Harper', 224, 11.60);