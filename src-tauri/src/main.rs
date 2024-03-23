#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate diesel;
extern crate diesel_migrations;

pub mod schema;
pub mod db;
pub mod dtos;
pub mod helpers;
pub mod tauri_commands;

use tauri_commands::payment_command::*;
use tauri_commands::category_command::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};


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
        delete_recurring_payments,
        get_categories,
        create_category,
        update_category,
        delete_category
    ])
    .run(context)
    .expect("error while running tauri application.");
}
