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
    end_date: String,
    interval: String
) {
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
        end_date: end_date,
        interval: interval
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
    is_recurring: bool,
    recurring_id: String,
    end_date: String,
    interval: String
) {
    let update_payment: UpdatePaymentDto = UpdatePaymentDto {
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp(),
        is_recurring: is_recurring,
        recurring_id: recurring_id,
        end_date: end_date,
        interval: interval
    };
    update_payment_in_db(id, update_payment);

}

#[tauri::command]
pub fn delete_payment(
    id: String,
    recurring_id: String,
    is_recurring: bool
) {
    delete_payment_from_db(id, recurring_id, is_recurring);
}
