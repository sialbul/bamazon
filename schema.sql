CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products;
(
  item_id int NOT NULL AUTO_INCREMENT,
  product_name varchar (50),
  department_name varchar(50),
  price DECIMAL(5,2) NOT NULL,
  stock_quantity int NOT NULL,
  PRIMARY KEY (item_id)
);


