import { format } from "date-fns";
import { Category } from 'src/app/models/category.model';

export interface Payment {
  id: string;
  description: string;
  amount: number;
  paymentDate: string;
  categoryId: string;
  payee: string;
  incomeOrExpense: boolean;
  category?: Category;
};

export const EMPTY_PAYMENT: Payment = {
    id: '',
    description: '',
    amount: 0,
    paymentDate: format(new Date(), "yyyy-MM-dd"),
    categoryId: '',
    payee: '',
    incomeOrExpense: false,
};

