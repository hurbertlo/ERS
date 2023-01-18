CREATE TABLE users (
    id SERIAL primary key,
    name TEXT not null,
    address TEXT not null,
    mobile TEXT not null,
    email TEXT not null,
    password TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);
CREATE TABLE orders (
    id SERIAL primary key,
    ordered_by INTEGER not null,
    foreign key ordered_by references uers(id),
    address TEXT not null,
    total_price FLOAT not null,
    status TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);

CREATE TABLE order_details (
    id serial primary key,
    order_id INTEGER not null,
    product_id INT not null,
    amount INTEGER not null,
    price_per_item FLOAT not null,
    discount_amount FLOAT not null,
    price FLOAT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);

CREATE TABLE products (
    id SERIAL primary key,
    catagory INTEGER not null,
    name TEXT not null,
    price FLOAT not null,
    unit_size INTEGER not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);



CREATE TABLE chats (
    id SERIAL primary key,
    sender INTEGER not null,
    receiver INTEGER not null,
    content TEXT not null,
    content_type TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);
