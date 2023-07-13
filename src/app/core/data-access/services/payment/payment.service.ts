import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { from, Observable, ReplaySubject } from 'rxjs';
import { PaymentModel } from 'src/app/core/models/payment.model';
import { NOTIFICATION_TYPE } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private paymentsSubject: ReplaySubject<PaymentModel[]>;

    constructor(private notificationService: NotificationService) {
        this.paymentsSubject = new ReplaySubject<PaymentModel[]>(1);
        this.fetchPayments();
    }

    private fetchPayments(): void {
        from(invoke<PaymentModel[]>('get_payments')).subscribe((payments: PaymentModel[]) => {
            this.paymentsSubject.next(JSON.parse(payments.toString()));
        });
    }

    public getPayments(): Observable<PaymentModel[]> {
        return this.paymentsSubject.asObservable();
    }

    public createPayment(payment: PaymentModel): void {
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

    public updatePayment(payment: PaymentModel): void {
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
