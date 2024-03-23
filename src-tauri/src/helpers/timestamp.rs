use chrono::{DateTime, Utc};

pub fn create_utc_timestamp() -> String {
    let utc_time: DateTime<Utc> = Utc::now();
    return utc_time.to_string();
}
