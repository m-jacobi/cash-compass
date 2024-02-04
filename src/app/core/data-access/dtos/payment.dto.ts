import { CategoryDto } from "./category.dto";

export interface PaymentDto {
    id: string;
    description: string;
    amount: number;
    paymentDate: string;
    categoryId: string;
    payee: string;
    incomeOrExpense: boolean;
    category?: CategoryDto;
}
