CREATE TABLE payments (
    id VARCHAR NOT NULL PRIMARY KEY,
    description TEXT NOT NULL DEFAULT '',
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL,
    category_id VARCHAR NOT NULL,
    payee TEXT NOT NULL DEFAULT '',
    addition_or_disposal BOOLEAN NOT NULL,
    last_modified_on TEXT NOT NULL DEFAULT ''
);
