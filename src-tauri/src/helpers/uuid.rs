use uuid::Uuid;

pub fn create_uuid() -> String {
    let uuid = Uuid::new_v4().to_string();
    return uuid;
}
