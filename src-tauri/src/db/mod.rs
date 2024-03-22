pub mod models;
use std::{env, path};

use crate::schema::*;
use crate::dtos::payment_dto::*;
use crate::helpers::uuid::create_uuid;
use chrono::NaiveDate;
use chronoutil::RelativeDuration;
use diesel::prelude::*;
use dotenvy::dotenv;
use models::{Payment, UpdatePayment, Category, UpdateCategory};

use self::models::RecurringPayment;

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


pub fn get_payments_from_db() -> String {
    let connection = &mut db_connection();
    let get_all_payments = payments::dsl::payments
        .load::<Payment>( connection)
        .expect("Error loading payments");
    let get_payments_json = serde_json::to_string(&get_all_payments).unwrap();
    get_payments_json
}



pub fn create_payment_in_db(payment_dto: PaymentDto) {
    let connection = &mut db_connection();

    if payment_dto.is_recurring {
        let recurring_payment = fill_recurring_payments_table(&payment_dto, connection);
        generate_and_insert_recurring_payments(&payment_dto, &recurring_payment, connection);
    } else {
        generate_and_insert_payments(&payment_dto, connection);
    }
}

fn generate_and_insert_payments(payment_dto: &PaymentDto, connection: &mut SqliteConnection) {
    let payment = Payment {
        id: payment_dto.id.clone(),
        description: payment_dto.description.clone(),
        amount: payment_dto.amount.clone(),
        payment_date: payment_dto.payment_date.clone(),
        category_id: payment_dto.category_id.clone(),
        payee: payment_dto.payee.clone(),
        income_or_expense: payment_dto.income_or_expense.clone(),
        last_modified_on: payment_dto.last_modified_on.clone(),
        is_recurring: payment_dto.is_recurring.clone(),
        recurring_id: None,
    };

    diesel::insert_into(payments::table)
        .values(&payment)
        .execute(connection)
        .expect("Error saving new payment");

}

fn generate_and_insert_recurring_payments(payment_dto: &PaymentDto,  recurring_payment: &RecurringPayment, connection: &mut SqliteConnection) {
    let start_date = NaiveDate::parse_from_str(&payment_dto.payment_date, "%Y-%m-%d").unwrap();

    let mut current_date = start_date;

    while current_date.to_string() <= payment_dto.end_date.to_string() {
        let recurring_payment = Payment {
            id: create_uuid(),
            description: payment_dto.description.clone(),
            amount: payment_dto.amount.clone(),
            payment_date: current_date.to_string(),
            category_id: payment_dto.category_id.clone(),
            payee: payment_dto.payee.clone(),
            income_or_expense: payment_dto.income_or_expense.clone(),
            last_modified_on: payment_dto.last_modified_on.clone(),
            is_recurring: payment_dto.is_recurring.clone(),
            recurring_id: Some(recurring_payment.id.clone()),
        };

        diesel::insert_into(payments::table)
            .values(&recurring_payment)
            .execute(connection)
            .expect("Error saving new recurring payment");

        current_date = calculate_next_payment_date(&current_date, &payment_dto.interval);
    }
}

fn fill_recurring_payments_table(payment_dto: &PaymentDto, connection: &mut SqliteConnection) -> RecurringPayment{
    let recurring_payment = RecurringPayment {
        id: create_uuid(),
        end_date: payment_dto.end_date.clone(),
        interval: payment_dto.interval.clone(),
    };

    diesel::insert_into(recurring_payments::table)
        .values(&recurring_payment)
        .execute(connection)
        .expect("Error saving new recurring payment");

    return recurring_payment
}

fn calculate_next_payment_date(current_date: &NaiveDate, interval: &str) -> NaiveDate {
    match interval {
        "DAY" => *current_date + RelativeDuration::days(1),
        "WEEK" => *current_date + RelativeDuration::weeks(1),
        "MONTH" => *current_date + RelativeDuration::months(1),
        "YEAR" => *current_date + RelativeDuration::years(1),
        _ => panic!("Interval {} not supported", interval),
    }
}

pub fn update_payment_in_db(id: String, update_payment_dto: UpdatePaymentDto) {
    let connection = &mut db_connection();

    if update_payment_dto.is_recurring {
        //update_recurring_payments();
        println!("update recurring payments {:?}", update_payment_dto)

    } else {
        update_payment(id, &update_payment_dto,  connection);
    }
}


fn update_payment(id: String, update_payment_dto: &UpdatePaymentDto, connection: &mut SqliteConnection) {
    let updated_payment: UpdatePayment = UpdatePayment {
        description: update_payment_dto.description.clone(),
        amount: update_payment_dto.amount.clone(),
        payment_date: update_payment_dto.payment_date.clone(),
        category_id: update_payment_dto.category_id.clone(),
        payee: update_payment_dto.payee.clone(),
        income_or_expense: update_payment_dto.income_or_expense.clone(),
        last_modified_on: update_payment_dto.last_modified_on.clone(),
        is_recurring: update_payment_dto.is_recurring.clone(),
        recurring_id: None,
    };

    diesel::update(payments::dsl::payments.find(id))
        .set(updated_payment)
        .execute(connection)
        .expect("Error saving update payment");
}

// fn update_recurring_payments(recurring_id: String, update_payment_dto: &UpdatePaymentDto, connection: &mut SqliteConnection) {


// }

pub fn delete_payment_from_db(id: String, recurring_id: String, is_recuring: bool) {
    let connection = &mut db_connection();

    if is_recuring {
        println!("delete recurring payments")
    } else {
        delete_payment(id, connection);
    }
}

fn delete_payment(id: String, connection: &mut SqliteConnection) {
    diesel::delete(payments::dsl::payments)
        .filter(payments::id.eq(id))
        .execute(connection)
        .expect("Error deleting payment");
}

pub fn get_categories_from_db() -> Result<String, String> {
    let connection = &mut db_connection();
    let get_all_categories = categories::dsl::categories
        .load::<Category>( connection)
        .expect("Error loading categories");
    let get_categories_json = serde_json::to_string(&get_all_categories)
        .map_err(|e| format!("Error converting categories to JSON: {}", e))?;
    Ok(get_categories_json)
}

pub fn create_category_in_db(category: Category) {
    let connection = &mut db_connection();

    diesel::insert_into(categories::table)
        .values(&category)
        .execute(connection)
        .expect("Error saving new categorie");
}

pub fn update_category_in_db(id: String, category: UpdateCategory) {
    let connection = &mut db_connection();

    diesel::update(categories::dsl::categories.find(id))
        .set(category)
        .execute(connection)
        .expect("Error saving update category");
}

pub fn delete_category_from_db(id: String) {
    let connection = &mut db_connection();

    diesel::delete(categories::dsl::categories)
    .filter(categories::id.eq(id))
    .execute(connection)
    .expect("Error deleting category");
}



