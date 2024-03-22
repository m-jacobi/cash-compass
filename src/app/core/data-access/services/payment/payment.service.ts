import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { from, Observable, ReplaySubject } from 'rxjs';
import { NOTIFICATION_TYPE } from '../../../../enum/notification-type.enum';
import { NotificationService } from '../../../../services/notification.service';
import { PaymentModel } from '../../../models/payment.model';



@Injectable({providedIn: 'root'})
export class PaymentService {

    private paymentsSource = new ReplaySubject<PaymentModel[]>(1);

    constructor(private notificationService: NotificationService) {}

    public getPayments(): Observable<PaymentModel[]> {
        from(invoke<PaymentModel[]>('get_payments')).subscribe((payments: PaymentModel[]) => {
            this.paymentsSource.next(JSON.parse(payments.toString()));
        });
        return this.paymentsSource;
    }

    public createPayment(payment: PaymentModel): void {
        console.log('payment', payment);
        invoke('create_payment', {
            description: payment.description,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            categoryId: payment.categoryId,
            payee: payment.payee,
            incomeOrExpense: payment.incomeOrExpense,
            isRecurring: payment.isRecurring,
            startDate: payment.startDate,
            endDate: payment.endDate,
            interval: payment.interval
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
    }

    public deletePayment(paymentId: string, isRecurring?: boolean, recurringId?: string): void {
        invoke('delete_payment', {
            id: paymentId,
            isRecurring: isRecurring,
            recurringId: recurringId
        }).then(() => {
            const deleteMessage: string = isRecurring ? 'Alle dazugehörigen Buchungen wurden entfernt' : 'Die Buchung wurde erfolgreich entfernt'
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: deleteMessage,
                buttonText: 'OK',

            });
        }).catch(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Buchung konnt nicht entfernt werden',
                buttonText: 'OK',

            });
        });
    }
}
