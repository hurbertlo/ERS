INSERT INTO public.users
("name", address, mobile, email, "password", created_at, updated_at)
VALUES('test', 'address', '12344321', 'test@tecky.io', 123456, now(), now());


INSERT INTO orders (ordered_by,address,total_price,status,created_at,updated_at) VALUES
	(1,'Kowloon Tong',1226.0,'Delivered','2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(2,'Wan Chai',476.0,'On The Way','2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(3,'Mong Kok',618.0,'Order Received','2023-01-02 00:00:00+08','2023-01-02 00:00:00+08');


<<<<<<< HEAD
INSERT INTO order_details (order_id,product_id,amount,price_per_item,discount_amount,price,created_at,updated_at) VALUES
	 (1,2,4,60.0,0.0,240.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (1,2,4,60.0,0.0,240.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (1,5,2,258.0,0.0,516.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (1,8,1,56.0,0.0,56.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (1,10,6,69.0,0.0,414.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (2,3,7,68.0,0.0,476.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (3,9,6,60.0,0.0,540.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08');

-- KAY
insert into chats (id, sender, receiver, content, content_type, created_at, updated_at) VALUES (1,1,2,'Why my product did not delivery on time?','text','2023-01-24','2023-01-31');
insert into chats (id, sender, receiver, content, content_type, created_at, updated_at) VALUES (2,2,3,'How many stock of bell_bone do you have? ','text','2023-01-12','2023-01-19');
insert into chats (id, sender, receiver, content, content_type, created_at, updated_at) VALUES (3,3,1,'Can you deliver the order by today?','text','2023-01-01','2023-01-08');
=======
	T INTO order_details (order_id,product_id,amount,price_per_item,discount_amount,price,created_at,updated_at) VALUES
	(1,2,4,60.0,0.0,240.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(1,2,4,60.0,0.0,240.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(1,5,2,258.0,0.0,516.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(1,8,1,56.0,0.0,56.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(1,10,6,69.0,0.0,414.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(2,3,7,68.0,0.0,476.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	(3,9,6,60.0,0.0,540.0,'2023-01-02 00:00:00+08','2023-01-02 00:00:00+08');




-- willy
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (1, 'bell_bone', 72, 2, '2023-01-16', '2023-01-18');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (1, 'bittly_bone', 60, 4, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (1, 'smart_bone', 68, 3, '2023-01-16', '2023-01-18');

INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (2, 'banana_shirt', 189, 4, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (2, 'strips_shirt', 258, 1, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (2, 't-shirt', 214, 2, '2023-01-12', '2023-01-15');

INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (3, 'ball', 39, 4, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (3, 'rope', 56, 1, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (3, 'bone', 60, 2, '2023-01-12', '2023-01-15');

INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (4, 'scissors', 69, 4, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (4, 'comb', 58, 1, '2023-01-12', '2023-01-15');
INSERT INTO products (catagory, name, price, unit_size, created_at, updated_at) VALUES (4, 'nall_clipper', 48, 2, '2023-01-12', '2023-01-15');


-- willy
INSERT INTO user_types (name, created_at, updated_at) VALUES ('admin', '2023-01-16', '2023-01-18');
INSERT INTO user_types (name, created_at, updated_at) VALUES ('users', '2023-01-16', '2023-01-18');
INSERT INTO user_types (name, created_at, updated_at) VALUES ('admin', '2023-01-16', '2023-01-18');
INSERT INTO user_types (name, created_at, updated_at) VALUES ('users', '2023-01-16', '2023-01-18');


-- willy
INSERT INTO users (user_type_id, address, mobile, email, password, created_at, updated_at) VALUES ('ben', 'WanChai', '63759857', 'ben@hotmail.com', 'passw@rd', '2023-01-16', '2023-01-18');
INSERT INTO users (user_type_id, address, mobile, email, password, created_at, updated_at) VALUES ('sam', 'Kowloon Tong', '98628763', 'sam@hotmail.com', 'p@ss123', '2023-01-16', '2023-01-18');
INSERT INTO users (user_type_id, address, mobile, email, password, created_at, updated_at) VALUES ('ken', 'Mong Kok', '58362837', 'ken@hotmail.com', 'pass456', '2023-01-16', '2023-01-18');

>>>>>>> 98281f979084a0a71ef2d4725f1467d48d8e4430
