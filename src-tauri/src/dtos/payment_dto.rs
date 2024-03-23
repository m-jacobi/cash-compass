
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct PaymentDto {
    pub id: String,
    pub description: String,
    pub amount: f32,
    pub payment_date: String,
    pub category_id: String,
    pub payee: String,
    pub income_or_expense: bool,
    pub last_modified_on: String,
    pub is_recurring: bool,
    pub recurring_id: Option<String>,
    pub end_date:  Option<String>,
    pub interval:  Option<String>
}

#[derive(Debug, Deserialize)]
pub struct UpdatePaymentDto {
    pub id: String,
    pub description: String,
    pub amount: f32,
    pub payment_date: String,
    pub category_id: String,
    pub payee: String,
    pub income_or_expense: bool,
    pub last_modified_on: String,
    pub is_recurring: bool,
}

#[derive(Debug, Deserialize)]
pub struct UpdateRecurringPaymentDto {
    pub id: String,
    pub description: String,
    pub amount: f32,
    pub payment_date: String,
    pub category_id: String,
    pub payee: String,
    pub income_or_expense: bool,
    pub last_modified_on: String,
    pub is_recurring: bool,
    pub recurring_id: String,
    pub end_date:  String,
    pub interval:  String
}


