import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { from, Observable, ReplaySubject } from 'rxjs';
import { NOTIFICATION_TYPE } from '../enum/notification-type.enum';
import { Payment } from '../models/payment.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private paymentsSubject: ReplaySubject<Payment[]>;

    constructor(private notificationService: NotificationService) {
        this.paymentsSubject = new ReplaySubject<Payment[]>(1);
        this.fetchPayments();
    }

    private fetchPayments(): void {
        from(invoke<Payment[]>('get_payments')).subscribe((payments: Payment[]) => {
            this.paymentsSubject.next(JSON.parse(payments.toString()));
        });
    }

    public getPayments(): Observable<Payment[]> {
        return this.paymentsSubject.asObservable();
    }

    public createPayment(payment: Payment): void {
        invoke('create_payment', {
            description: payment.description,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            categoryId: payment.categoryId,
            payee: payment.payee,
            incomeOrExpense: payment.incomeOrExpense,
        }).then(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Buchung wurde erfolgreich angelegt',
                buttonText: 'OK',

            });
        }).catch(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Buchung konnt nicht angelegt werden',
                buttonText: 'OK',

            });
        });
        this.fetchPayments();
    }

    public updatePayment(payment: Payment): void {
        invoke('update_payment', {
            id: payment.id,
            description: payment.description,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            categoryId: payment.categoryId,
            payee: payment.payee,
            incomeOrExpense: payment.incomeOrExpense,
        }).then(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Buchung wurde aktualisiert',
                buttonText: 'OK',

            });
        }).catch(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Buchung konnt nicht aktualisiert werden',
                buttonText: 'OK',

            });
        });
        this.fetchPayments();
    }

    public deletePayment(paymentId: string): void {
        invoke('delete_payment', {
            id: paymentId,
        }).then(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Buchung wurde erfolgreich entfernt',
                buttonText: 'OK',

            });
        }).catch(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Buchung konnt nicht entfernt werden',
                buttonText: 'OK',

            });
        });
        this.fetchPayments();
    }
}
