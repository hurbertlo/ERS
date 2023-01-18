INSERT INTO public.users
("name", address, mobile, email, "password", created_at, updated_at)
VALUES('test', 'address', '12344321', 'test@tecky.io', 123456, now(), now());


INSERT INTO orders (ordered_by,address,total_price,status,created_at,updated_at) VALUES
	 (1,'Kowloon Tong',1226.0,'Delivered','2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (2,'Wan Chai',476.0,'On The Way','2023-01-02 00:00:00+08','2023-01-02 00:00:00+08'),
	 (3,'Mong Kok',618.0,'Order Received','2023-01-02 00:00:00+08','2023-01-02 00:00:00+08');


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