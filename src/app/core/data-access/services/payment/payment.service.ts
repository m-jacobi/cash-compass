import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { from, Observable, ReplaySubject } from 'rxjs';
import { PaymentModel } from '../../../models/payment.model';



@Injectable({providedIn: 'root'})
export class PaymentService {

    private paymentsSource = new ReplaySubject<PaymentModel[]>(1);

    constructor() {}

    public getPayments(): Observable<PaymentModel[]> {
        from(invoke<PaymentModel[]>('get_payments')).subscribe((payments: PaymentModel[]) => {
            this.paymentsSource.next(JSON.parse(payments.toString()));
        });
        return this.paymentsSource;
    }

    public createPayment(payment: Partial<PaymentModel>): void {
        invoke('create_payment', {
            description: payment.description,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            categoryId: payment.categoryId,
            payee: payment.payee,
            incomeOrExpense: payment.incomeOrExpense,
            isRecurring: payment.isRecurring,
            endDate: payment.endDate,
            interval: payment.interval
        });
    }

    public updatePayment(payment: Partial<PaymentModel>): void {
        invoke('update_payment', {
            id: payment.id,
            description: payment.description,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            categoryId: payment.categoryId,
            payee: payment.payee,
            incomeOrExpense: payment.incomeOrExpense,
        });
    }

    public deletePayment(paymentId: string, isRecurring: boolean): void {
        invoke('delete_payment', {
            id: paymentId,
            isRecurring: isRecurring,
        });
    }

    public deleteRecurringPayments(recurringId: string, isRecurring: boolean): void {
        invoke('delete_recurring_payments', {
            recurringId: recurringId,
            isRecurring: isRecurring,
        });
    }
}
