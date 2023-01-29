CREATE TABLE categories (
    id SERIAL primary key,
    name TEXT not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE user_types (
    id SERIAL primary key,
    name TEXT not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE users (
    id SERIAL primary key,
    user_type_id INTEGER not null,
    foreign key (user_type_id) references user_types(id),
    name TEXT not null,
    address TEXT not null,
    mobile TEXT not null,
    email TEXT not null unique,
    password TEXT not null,
    profile_picture TEXT,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE order_status(
    id SERIAL primary key,
    status TEXT not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE orders (
    id SERIAL primary key,
    ordered_by INTEGER not null,
    foreign key (ordered_by) references users(id),
    address TEXT not null,
    total_price FLOAT not null,
    order_status_id INTEGER not null default 1,
    foreign key (order_status_id) references order_status(id),
    -- requested, on the way , delivered
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE products (
    id SERIAL primary key,
    category_id INTEGER not null,
    foreign key (category_id) references categories(id),
    name TEXT not null,
    price FLOAT not null,
    place_of_origin TEXT,
    description TEXT,
    image TEXT,
    unit_size INTEGER not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE baskets (
    id serial primary key,
    ordered_by INTEGER not null,
    foreign key (ordered_by) references users(id),
    product_id INT not null,
    foreign key (product_id) references products(id),
    quantity INTEGER not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE order_details (
    id serial primary key,
    order_id INTEGER not null,
    foreign key (order_id) references orders(id),
    product_id INT not null,
    foreign key (product_id) references products(id),
    quantity INTEGER not null,
    price FLOAT not null,
    discount_amount FLOAT default 1,
    subtotal FLOAT not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE chats (
    id SERIAL primary key,
    sender INTEGER not null,
    foreign key (sender) references users(id),
    receiver INTEGER not null,
    foreign key (receiver) references users(id),
    content TEXT not null,
    content_type TEXT not null,
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE product_images (
    id SERIAL primary key,
    name TEXT not null unique,
    product_id INTEGER not null,
    foreign key (product_id) references products(id),
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE chat_room (
    id SERIAL primary key,
    room_name VARCHAR(255),
    user_one_id INTEGER references users(id),
    user_two_id INTEGER references users(id),
    status VARCHAR(255) default 'active',
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);
CREATE TABLE chat_message (
    id SERIAL primary key,
    room_id INTEGER references chat_room(id),
    user_id INTEGER,
    foreign key (user_id) references users(id),
    foreign key (user_id) references users(id),
    message TEXT,
    status VARCHAR(255) default 'active',
    created_at TIMESTAMP with time zone default now(),
    updated_at TIMESTAMP with time zone default now()
);