ALTER TABLE payments
ADD COLUMN is_recurring BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE payments
ADD COLUMN recurring_id INTEGER;

CREATE TABLE recurring_payments (
    id INTEGER PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE,
    interval TEXT CHECK (interval IN ('DAY', 'WEEK', 'MONTH', 'YEAR')) NOT NULL DEFAULT 'DAY'
);
