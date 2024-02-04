import { Injectable } from '@angular/core';
import { PaymentModel } from '../core/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

    public getTotalIncomeCost(payments: PaymentModel[]): number {
        const initialValue = 0;
        return payments.filter((payment: PaymentModel) => payment.incomeOrExpense === true)
            .map(p => p.amount).reduce((acc, currentValue) => acc + currentValue, initialValue);
    }

    public getTotalExpenseCost(payments: PaymentModel[]): number {
        const initialValue = 0;
        return payments.filter((payment: PaymentModel) => payment.incomeOrExpense === false)
            .map(p => p.amount).reduce((acc, currentValue) => acc + currentValue, initialValue);
    }
}
