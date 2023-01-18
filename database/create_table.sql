
CREATE TABLE catagories (
    id SERIAL primary key,
    name TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);

CREATE TABLE user_types (
    id SERIAL primary key,
    name TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);




CREATE TABLE users (
    id SERIAL primary key,
    user_type_id INTEGER not null,
    foreign key (user_type_id) references user_types(id),
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
        foreign key (ordered_by) references users(id),
    address TEXT not null,
    total_price FLOAT not null,
    status TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);

CREATE TABLE order_details (
    id serial primary key,
    order_id INTEGER not null,
        foreign key (order_id) references orders(id),
    product_id INT not null,
        foreign key (product_id) references products(id),
    amount INTEGER not null,
    price_per_item FLOAT not null,
    discount_amount FLOAT not null,
    price FLOAT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);

CREATE TABLE products (
    id SERIAL primary key,
    catagory_id INTEGER not null,
        foreign key (catagory_id) references catagories(id),
    name TEXT not null,
    price FLOAT not null,
    unit_size INTEGER not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);


CREATE TABLE chats (
    id SERIAL primary key,
    sender INTEGER not null,
        foreign key (sender) references users(id),
    receiver INTEGER not null,
        foreign key (receiver) references users(id),
    content TEXT not null,
    content_type TEXT not null,
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
);
