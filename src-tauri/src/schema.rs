// @generated automatically by Diesel CLI.

diesel::table! {
    categories (id) {
        id -> Text,
        name -> Text,
        default_category -> Bool,
        last_modified_on -> Text,
    }
}

diesel::table! {
    payments (id) {
        id -> Text,
        description -> Text,
        amount -> Float,
        payment_date -> Text,
        category_id -> Text,
        payee -> Text,
        income_or_expense -> Bool,
        last_modified_on -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    payments,
);
