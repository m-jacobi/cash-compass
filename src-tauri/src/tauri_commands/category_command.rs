use crate::db::*;
use crate::helpers::timestamp::create_utc_timestamp;
use crate::helpers::uuid::create_uuid;
use crate::db::models::{Category, UpdateCategory};

#[tauri::command]
pub fn get_categories() -> Result<String, String> {
    return get_categories_from_db()
}

#[tauri::command]
pub fn create_category(name: String, default_category: bool) {
    let create_category = Category {
        id: create_uuid(),
        name: name,
        default_category: default_category,
        last_modified_on: create_utc_timestamp()
    };
    create_category_in_db(create_category);
}

#[tauri::command]
pub fn update_category(id: String, name: String, default_category: bool) {
    let update_category = UpdateCategory {
        name: name,
        default_category: default_category,
        last_modified_on: create_utc_timestamp()
    };
    update_category_in_db(id, update_category);
}

#[tauri::command]
pub fn delete_category(id: String) {
    delete_category_from_db(id);
}
