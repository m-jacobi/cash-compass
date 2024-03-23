import { format } from "date-fns";
import { RECURRING_INTERVAL } from '../../enum/recurring-interval.enum';

export interface PaymentModel {
    id?: string;
    description: string;
    amount: number;
    paymentDate: string;
    categoryId: string;
    payee: string;
    incomeOrExpense: boolean;
    isRecurring: boolean;
    recurringId?: string;
    endDate?: string;
    interval?: RECURRING_INTERVAL
};

export const EMPTY_PAYMENT: PaymentModel = {
    id: '',
    description: '',
    amount: 0,
    paymentDate: format(new Date(), "yyyy-MM-dd"),
    categoryId: '',
    payee: '',
    incomeOrExpense: false,
    isRecurring: false
};

