use crate::db::*;
use crate::helpers::timestamp::create_utc_timestamp;
use crate::helpers::uuid::create_uuid;
use crate::dtos::payment_dto::*;
use crate::db::models::UpdatePayment;

#[tauri::command]
pub fn get_payments() -> String{
    get_payments_from_db()
}

#[tauri::command]
pub fn create_payment(
    description: String,
    amount: f32,
    payment_date: String,
    category_id: String,
    payee: String,
    income_or_expense: bool,
    is_recurring: bool,
    recurring_start_date: String,
    recurring_end_date: String,
    recurring_interval: String
) {
    let mut recurring_id: Option<String> = None;

    if is_recurring {
        recurring_id = Some(create_uuid());
    }

    let create_payment: PaymentDto = PaymentDto {
        id: create_uuid(),
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp(),
        is_recurring: is_recurring,
        recurring_id: recurring_id,
        recurring_start_date: Some(recurring_start_date),
        recurring_end_date: Some(recurring_end_date),
        recurring_interval: Some(recurring_interval)
    };
    create_payment_in_db(create_payment);
}

#[tauri::command]
pub fn update_payment(
    id: String,
    description: String,
    amount: f32,
    payment_date: String,
    category_id: String,
    payee: String,
    income_or_expense: bool,
    is_recurring: bool
) {
    let update_payment: UpdatePaymentDto = UpdatePaymentDto {
        id: id,
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp(),
        is_recurring: is_recurring,
    };
    update_payment_in_db(update_payment);
}

#[tauri::command]
pub fn update_recurring_payment(
    id: String,
    description: String,
    amount: f32,
    payment_date: String,
    category_id: String,
    payee: String,
    income_or_expense: bool,
    is_recurring: bool,
    recurring_id: String,
    recurring_start_date: String,
    recurring_end_date: String,
    recurring_interval: String
) {
    let update_recurring_payment: PaymentDto = PaymentDto {
        id: id,
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp(),
        is_recurring: is_recurring,
        recurring_id: Some(recurring_id),
        recurring_start_date: Some(recurring_start_date),
        recurring_end_date: Some(recurring_end_date),
        recurring_interval: Some(recurring_interval)
    };
    update_recurring_payment_in_db(&update_recurring_payment);
}


#[tauri::command]
pub fn delete_payment(
    id: String,
    is_recurring: bool,
) {
    delete_payment_from_db(id, is_recurring);
}

#[tauri::command]
pub fn delete_recurring_payments(
    recurring_id: String,
    is_recurring: bool,
) {
    delete_recurring_payments_from_db(recurring_id, is_recurring);
}

