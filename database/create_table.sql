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
CREATE TABLE orders (
    id SERIAL primary key,
    ordered_by INTEGER not null,
    foreign key (ordered_by) references users(id),
    address TEXT not null,
    total_price FLOAT not null,
    status TEXT not null default 'requested',
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
    foreign key (order_by) references users(id),
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
    price_per_item FLOAT not null,
    discount_amount FLOAT not null,
    price FLOAT not null,
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