import { format } from "date-fns";
import { CategoryModel } from 'src/app/core/models/category.model';

export interface PaymentModel {
  id: string;
  description: string;
  amount: number;
  paymentDate: string;
  categoryId: string;
  payee: string;
  incomeOrExpense: boolean;
  category?: CategoryModel;
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

