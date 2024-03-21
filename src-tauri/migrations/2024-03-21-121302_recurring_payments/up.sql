ALTER TABLE payments
ADD COLUMN is_recurring BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE payments
ADD COLUMN recurring_id VARCHAR;

CREATE TABLE recurring_payments (
    id VARCHAR NOT NULL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    interval TEXT CHECK (interval IN ('DAY', 'WEEK', 'MONTH', 'YEAR')) NOT NULL DEFAULT 'DAY'
);
