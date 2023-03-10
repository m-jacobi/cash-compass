pub mod models;
use std::{path, env};

use crate::schema::*;
use diesel::prelude::*;
use dotenvy::dotenv;
use models::{Payment, UpdatePayment, Category, UpdateCategory};

pub fn db_connection() -> SqliteConnection {
    dotenv().ok();

    let db_environment = env::var("ENVIRONMENT");

    match db_environment {
        Ok(_environment) => {
            let db_url = &env::var("DATABASE_URL").unwrap();

            SqliteConnection::establish(&db_url)
                .unwrap_or_else(|_| panic!("Error connecting to {}", db_url))

        }
        Err(_) => {
            let config_dir = &tauri::api::path::config_dir().unwrap();
            let app_dir = config_dir.join("cash-compass/data");
            std::fs::create_dir_all(&app_dir).unwrap();

            let db_url = path::Path::new(&app_dir).join("cash-compass.sqlite");
            let db_url = db_url.to_str().clone().unwrap();
            SqliteConnection::establish(&db_url)
                .unwrap_or_else(|_| panic!("Error connecting to {}", db_url))
        }
    }
}


pub fn get_payments() -> String {
    let connection = &mut db_connection();
    let get_all_payments = payments::dsl::payments
        .load::<Payment>( connection)
        .expect("Error loading payments");
    let get_payments_json = serde_json::to_string(&get_all_payments).unwrap();
    get_payments_json
}

pub fn create_payment(payment: Payment) -> String {
    let connection = &mut db_connection();

    let create_payment = diesel::insert_into(payments::table)
        .values(&payment)
        .execute(connection)
        .expect("Error saving new payment");
    let create_payment_json = serde_json::to_string(&create_payment).unwrap();
    create_payment_json
}

pub fn update_payment(id: String, payment: UpdatePayment) -> String {
    let connection = &mut db_connection();

    let update_payment = diesel::update(payments::dsl::payments.find(id))
        .set(payment)
        .execute(connection)
        .expect("Error saving update payment");
    let update_payment_json = serde_json::to_string(&update_payment).unwrap();
    update_payment_json
}

pub fn delete_payment(id: String) {
    let connection = &mut db_connection();

    diesel::delete(payments::dsl::payments)
    .filter(payments::id.eq(id))
    .execute(connection)
    .expect("Error deleting payment");
}

pub fn get_categories() -> String {
    let connection = &mut db_connection();
    let get_all_categories = categories::dsl::categories
        .load::<Category>( connection)
        .expect("Error loading categories");
    let get_categories_json = serde_json::to_string(&get_all_categories).unwrap();
    get_categories_json
}

pub fn create_category(category: Category) -> String {
    let connection = &mut db_connection();

    let create_category = diesel::insert_into(categories::table)
        .values(&category)
        .execute(connection)
        .expect("Error saving new categorie");
    let create_category_json = serde_json::to_string(&create_category).unwrap();
    create_category_json
}

pub fn update_category(id: String, category: UpdateCategory) -> String {
    let connection = &mut db_connection();

    let update_category = diesel::update(categories::dsl::categories.find(id))
        .set(category)
        .execute(connection)
        .expect("Error saving update category");
    let update_category_json = serde_json::to_string(&update_category).unwrap();
    update_category_json
}

pub fn delete_category(id: String) {
    let connection = &mut db_connection();

    diesel::delete(categories::dsl::categories)
    .filter(categories::id.eq(id))
    .execute(connection)
    .expect("Error deleting category");
}



