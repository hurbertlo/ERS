TRUNCATE chats RESTART IDENTITY CASCADE;
TRUNCATE user_types RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE order_details RESTART IDENTITY CASCADE;
TRUNCATE orders RESTART IDENTITY CASCADE;
TRUNCATE products RESTART IDENTITY CASCADE;
TRUNCATE categories RESTART IDENTITY CASCADE;
-- willy
INSERT INTO user_types (name, created_at, updated_at)
VALUES ('admin', '2023-01-16', '2023-01-18');
INSERT INTO user_types (name, created_at, updated_at)
VALUES ('user', '2023-01-16', '2023-01-18');
-- willy
INSERT INTO users (
		user_type_id,
		name,
		address,
		mobile,
		email,
		password,
		created_at,
		updated_at
	)
VALUES (
		1,
		'ben',
		'WanChai',
		'63759857',
		'ben@hotmail.com',
		'passw@rd',
		'2023-01-16',
		'2023-01-18'
	);
INSERT INTO users (
		user_type_id,
		name,
		address,
		mobile,
		email,
		password,
		created_at,
		updated_at
	)
VALUES (
		1,
		'sam',
		'Kowloon Tong',
		'98628763',
		'sam@hotmail.com',
		'p@ss123',
		'2023-01-16',
		'2023-01-18'
	);
INSERT INTO users (
		user_type_id,
		name,
		address,
		mobile,
		email,
		password,
		created_at,
		updated_at
	)
VALUES (
		2,
		'ken',
		'Mong Kok',
		'58362837',
		'ken@hotmail.com',
		'pass456',
		'2023-01-16',
		'2023-01-18'
	);
INSERT into categories ("name")
values ('food'),
('toy'),
('clothing'),
('tool');
-- Kay
INSERT INTO products (
		category_id,
		name,
		price,
		place_of_origin,
		description,
		image,
		unit_size,
		created_at,
		updated_at
	)
VALUES (
		1,
		'Bell and Bone 超級食物狗糧',
		72,
		'澳洲',
		E'我們只使用優質原料來製作美味、易消化和營養豐富的膳食。\n成份分析/ ANALYSIS: 100克/G\n蛋白質/ Protein: 85.0\n脂肪/ Fat: 2.3\n水份/ Moisture: 9.4\n灰/ Ash: 2.1\n纖維/ Fibre: 0.5',
		'product_id_1.jpg',
		2,
		'2023-01-16',
		'2023-01-18'
	),
	(
		1,
		'Itty Bitty Bones 烘焙狗零食',
		60,
		'美國',
		E'鬆脆的餅乾加上香濃的奶酪外層，強烈的奶酪風味。\n營養分析\n粗蛋白 9.0\n粗脂肪 9.0\n粗纖維 4.0\n水份 12.0',
		'product_id_2.jpg',
		4,
		'2023-01-12',
		'2023-01-15'
	),
	(
		1,
		'SmartBones 迷你咀嚼狗糧',
		68,
		'紐西蘭',
		E'由紐西蘭牛仔嫩肉焗乾成的純肉小食。高蛋白，低脂肪，為訓練獎勵的不二之選。\n成份分析/ ANALYSIS: 100克/G\n蛋白質/ Protein: 78.3\n脂肪/ Fat: 15.0\n水份/ Moisture: 8.2\n灰/ Ash: 3.6\n纖維/ Fibre: 1.6',
		'product_id_3.jpg',
		3,
		'2023-01-16',
		'2023-01-18'
	),
	(
		2,
		'Dog Threads 香蕉恤衫',
		189,
		'越南',
		E'恤衫\n尺碼: XXS 6"- 4L 20"\n超迷你至中型犬',
		'product_id_4.jpg',
		4,
		'2023-01-12',
		'2023-01-15'
	),
	(
		2,
		'Dog Collection 間條長袖衫',
		258,
		'日本',
		E'長袖衫\n尺碼: XS 8"- 4L 20"\n迷你至中型犬',
		'product_id_5.jpg',
		1,
		'2023-01-12',
		'2023-01-15'
	),
	(
		2,
		'Dog Slogan 紅色T-Shirt',
		214,
		'美國',
		E'T-Shirt\n尺碼: XS 8"- 4L 20"\n迷你至中型犬',
		'product_id_6.jpg',
		2,
		'2023-01-12',
		'2023-01-15'
	),
	(
		3,
		'Barc 玩具球',
		39,
		'英國',
		E'幫助愛犬骨骼及磨牙發展\n軟硬適中的橡膠針刺設計',
		'product_id_7.jpg',
		4,
		'2023-01-12',
		'2023-01-15'
	),
	(
		3,
		'Pet Shop 互動棉繩',
		56,
		'日本',
		E'培養寵物與主人的互動交流\n讓狗狗咬玩時按摩牙肉',
		'product_id_8.jpg',
		1,
		'2023-01-12',
		'2023-01-15'
	),
	(
		3,
		'Foggy 發聲玩具',
		60,
		'奧地利',
		E'寵物獨自在家的最佳夥伴\n愛犬不同時期的認知訓練',
		'product_id_9.jpg',
		2,
		'2023-01-12',
		'2023-01-15'
	),
	(
		4,
		'HaJetSo 安全寵物剪刀',
		69,
		'日本',
		E'日式圓頭安全設計，防止意外整親寶貝\n居家寵物剪毛、理毛必備工具、疫情期間自己美容寶貝',
		'product_id_10.jpg',
		4,
		'2023-01-12',
		'2023-01-15'
	),
	(
		4,
		'Master Pet 寵物清潔美容梳',
		58,
		'芬蘭',
		E'促進血液循環、促進寵物健康\n有利於預防皮膚病\n減少家中掉毛垃圾',
		'product_id_11.jpg',
		1,
		'2023-01-12',
		'2023-01-15'
	),
	(
		4,
		'PetPet Garden 寵物指甲鉗',
		48,
		'挪威',
		E' 採用優質不鏽鋼\n耐磨耐用\n備有指甲打磨片',
		'product_id_12.jpg',
		2,
		'2023-01-12',
		'2023-01-15'
	);
INSERT INTO orders (
		ordered_by,
		address,
		total_price,
		status,
		created_at,
		updated_at
	)
VALUES (
		1,
		'Kowloon Tong',
		1226.0,
		'Delivered',
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		2,
		'Wan Chai',
		476.0,
		'On The Way',
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		3,
		'Mong Kok',
		618.0,
		'Order Received',
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	);
INSERT INTO order_details (
		order_id,
		product_id,
		amount,
		price_per_item,
		discount_amount,
		price,
		created_at,
		updated_at
	)
VALUES (
		1,
		2,
		4,
		60.0,
		0.0,
		240.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		1,
		2,
		4,
		60.0,
		0.0,
		240.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		1,
		5,
		2,
		258.0,
		0.0,
		516.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		1,
		8,
		1,
		56.0,
		0.0,
		56.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		1,
		10,
		6,
		69.0,
		0.0,
		414.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		2,
		3,
		7,
		68.0,
		0.0,
		476.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	),
	(
		3,
		9,
		6,
		60.0,
		0.0,
		540.0,
		'2023-01-02 00:00:00+08',
		'2023-01-02 00:00:00+08'
	);
INSERT INTO product_images (name, product_id, created_at, updated_at)
VALUES ('abc', 1, '2023-01-16', '2023-01-18');
INSERT INTO product_images (name, product_id, created_at, updated_at)
VALUES ('xyz', 2, '2023-01-16', '2023-01-18');
-- Kay
insert into chats (
		sender,
		receiver,
		content,
		content_type,
		created_at,
		updated_at
	)
VALUES (
		1,
		2,
		'Why my product did not delivery on time?',
		'text',
		'2023-01-24',
		'2023-01-31'
	);
insert into chats (
		sender,
		receiver,
		content,
		content_type,
		created_at,
		updated_at
	)
VALUES (
		2,
		3,
		'How many stock of bell_bone do you have? ',
		'text',
		'2023-01-12',
		'2023-01-19'
	);
insert into chats (
		sender,
		receiver,
		content,
		content_type,
		created_at,
		updated_at
	)
VALUES (
		3,
		1,
		'Can you deliver the order by today?',
		'text',
		'2023-01-01',
		'2023-01-08'
	);