export interface PaymentListVM {
    id: string;
    description: string;
    amount: number;
    paymentDate: string;
    payee: string;
    incomeOrExpense: boolean;
    categoryId: string;
    categoryName: string;
}
