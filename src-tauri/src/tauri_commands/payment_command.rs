use crate::db::*;
use crate::helpers::timestamp::create_utc_timestamp;
use crate::helpers::uuid::create_uuid;
use crate::dtos::payment_dto::PaymentDto;
use crate::db::models::UpdatePayment;

#[tauri::command]
pub fn get_payments() -> String{
    get_payments_from_db()
}

#[tauri::command]
pub fn create_payment(description: String, amount: f32, payment_date: String, category_id: String, payee: String, income_or_expense: bool) {
    let create_payment = PaymentDto {
        id: create_uuid(),
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp()
    };
    println!("Message from Rust: {:?}", create_payment);
    create_payment_in_db(create_payment);
}

#[tauri::command]
pub fn update_payment(id: String, description: String, amount: f32, payment_date: String, category_id: String, payee: String, income_or_expense: bool) {
    let update_payment = UpdatePayment {
        description: description,
        amount: amount,
        payment_date: payment_date,
        category_id: category_id,
        payee: payee,
        income_or_expense: income_or_expense,
        last_modified_on: create_utc_timestamp()
    };
    update_payment_in_db(id, update_payment);

}

#[tauri::command]
pub fn delete_payment(id: String) {
    delete_payment_from_db(id);
}
