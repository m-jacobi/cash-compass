CREATE TABLE categories (
    id VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    default_category BOOLEAN NOT NULL,
    last_modified_on TEXT NOT NULL DEFAULT ''
);
