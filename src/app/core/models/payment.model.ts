import { format } from "date-fns";

export interface PaymentModel {
    id: string;
    description: string;
    amount: number;
    paymentDate: string;
    categoryId: string;
    payee: string;
    incomeOrExpense: boolean;
};

export const EMPTY_PAYMENT: PaymentModel = {
    id: '',
    description: '',
    amount: 0,
    paymentDate: format(new Date(), "yyyy-MM-dd"),
    categoryId: '',
    payee: '',
    incomeOrExpense: false,
};

