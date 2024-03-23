import { RECURRING_INTERVAL } from '../../../enum/recurring-interval.enum';
export interface PaymentListVM {
    id?: string;
    description: string;
    amount: number;
    paymentDate: string;
    payee: string;
    incomeOrExpense: boolean;
    categoryId: string;
    categoryName: string;
    isRecurring: boolean;
    recurringId?: string;
    recurringStartDate?: string;
    recurringEndDate?: string;
    recurringInterval?: RECURRING_INTERVAL
}
