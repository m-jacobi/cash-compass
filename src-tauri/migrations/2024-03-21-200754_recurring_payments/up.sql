ALTER TABLE payments
ADD COLUMN is_recurring BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE payments
ADD COLUMN recurring_id VARCHAR;

ALTER TABLE payments
ADD COLUMN end_date TEXT;

ALTER TABLE payments
ADD COLUMN interval TEXT CHECK (interval IN ('DAY', 'WEEK', 'MONTH', 'YEAR'));
