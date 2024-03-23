ALTER TABLE payments
ADD COLUMN is_recurring BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE payments
ADD COLUMN recurring_id VARCHAR;

ALTER TABLE payments
ADD COLUMN recurring_start_date TEXT;

ALTER TABLE payments
ADD COLUMN recurring_end_date TEXT;

ALTER TABLE payments
ADD COLUMN recurring_interval TEXT CHECK (recurring_interval IN ('DAY', 'WEEK', 'MONTH', 'YEAR'));
