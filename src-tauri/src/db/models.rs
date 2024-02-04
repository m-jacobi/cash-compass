use crate::schema::payments;
use crate::schema::categories;
use serde::{Serialize};

#[derive(Insertable, Queryable, Serialize, Debug, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = payments)]
pub struct Payment {
    pub id: String,
    pub description: String,
    pub amount: f32,
    pub payment_date: String,
    pub category_id: String,
    pub payee: String,
    pub income_or_expense: bool,
    pub last_modified_on: String
}

#[derive(Insertable, Serialize, Debug, Clone, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = payments)]
pub struct UpdatePayment {
    pub description: String,
    pub amount: f32,
    pub payment_date: String,
    pub category_id: String,
    pub payee: String,
    pub income_or_expense: bool,
    pub last_modified_on: String
}

#[derive(Insertable, Queryable, Serialize, Debug, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = categories)]
pub struct Category {
    pub id: String,
    pub name: String,
    pub default_category: bool,
    pub last_modified_on: String,
}

#[derive(Insertable, Serialize, Debug, Clone, AsChangeset)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = categories)]
pub struct UpdateCategory {
    pub name: String,
    pub default_category: bool,
    pub last_modified_on: String,
}
