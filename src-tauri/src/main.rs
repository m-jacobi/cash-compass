#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate diesel;
extern crate diesel_migrations;


use chrono::{DateTime, Utc};
use db::models::{Payment, UpdatePayment, Category, UpdateCategory};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use uuid::Uuid;

pub mod schema;
pub mod db;

// TODO: Tauri Commands auslagern
#[tauri::command]
fn get_payments() -> String{
  db::get_payments()
}

fn create_utc_timestamp() -> String {
    let utc_time: DateTime<Utc> = Utc::now();
    return utc_time.to_string();
}

fn create_uuid() -> String {
    let uuid = Uuid::new_v4().to_string();
    return uuid;
}

#[tauri::command]
fn create_payment(description: String, amount: f32, payment_date: String, category_id: String, payee: String, income_or_expense: bool) {
    let create_payment = Payment {
        id: create_uuid(),
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp()
    };
    db::create_payment(create_payment);
}

#[tauri::command]
fn update_payment(id: String, description: String, amount: f32, payment_date: String, category_id: String, payee: String, income_or_expense: bool) {
    let update_payment = UpdatePayment {
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp()
    };
    db::update_payment(id, update_payment);

}

#[tauri::command]
fn delete_payment(id: String) {
    db::delete_payment(id);
}

#[tauri::command]
fn get_categories() -> Result<String, String> {
    return db::get_categories()
}

#[tauri::command]
fn create_category(name: String, default_category: bool) {
    let create_category = Category {
        id: create_uuid(),
        name: name,
        default_category: default_category,
        last_modified_on: create_utc_timestamp()
    };
    db::create_category(create_category);
}

#[tauri::command]
fn update_category(id: String, name: String, default_category: bool) {
    let update_category = UpdateCategory {
        name: name,
        default_category: default_category,
        last_modified_on: create_utc_timestamp()
    };
    db::update_category(id, update_category);
}

#[tauri::command]
fn delete_category(id: String) {
    db::delete_category(id);
}

fn main() {
    pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();
    let context = tauri::generate_context!();
    let mut connection = db::db_connection();

    connection.run_pending_migrations(MIGRATIONS).expect("Error database migration");

    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        get_payments,
        create_payment,
        update_payment,
        delete_payment,
        get_categories,
        create_category,
        update_category,
        delete_category
    ])
    .run(context)
    .expect("error while running tauri application.");
}
