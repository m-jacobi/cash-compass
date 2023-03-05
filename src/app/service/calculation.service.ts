import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

    public getTotalIncomeCost(payments: Payment[]): number {
        const initialValue = 0;
        return payments.filter((payment: Payment) => payment.incomeOrExpense === true)
            .map(p => p.amount).reduce((acc, currentValue) => acc + currentValue, initialValue);
    }

    public getTotalExpenseCost(payments: Payment[]): number {
        const initialValue = 0;
        return payments.filter((payment: Payment) => payment.incomeOrExpense === false)
            .map(p => p.amount).reduce((acc, currentValue) => acc + currentValue, initialValue);
    }
}
