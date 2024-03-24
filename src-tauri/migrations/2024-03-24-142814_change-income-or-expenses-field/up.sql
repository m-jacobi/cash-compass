-- Your SQL goes here
ALTER TABLE payments RENAME TO payments_temp;

CREATE TABLE payments (
    id VARCHAR NOT NULL PRIMARY KEY,
    description TEXT NOT NULL DEFAULT '',
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL,
    category_id VARCHAR NOT NULL,
    payee TEXT NOT NULL DEFAULT '',
    transfer TEXT CHECK (transfer IN ('INCOME', 'EXPENSE', 'TRANSFER')),
    last_modified_on TEXT NOT NULL DEFAULT '',
    is_recurring BOOLEAN NOT NULL DEFAULT false,
    recurring_id VARCHAR,
    recurring_start_date TEXT,
    recurring_end_date TEXT,
    recurring_interval TEXT CHECK (recurring_interval IN ('DAY', 'WEEK', 'MONTH', 'YEAR'))
);

INSERT INTO payments SELECT *, CASE
    WHEN income_or_expense = 1 THEN 'INCOME'
    WHEN income_or_expense = 0 THEN 'EXPENSE'
    ELSE 'TRANSFER'
    END
    FROM payments_temp;

DROP TABLE payments_temp;
