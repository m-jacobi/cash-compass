import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { from, Observable } from 'rxjs';
import { NOTIFICATION_TYPE } from '../../../../enum/notification-type.enum';
import { NotificationService } from '../../../../services/notification.service';
import { PaymentModel } from '../../../models/payment.model';



@Injectable({providedIn: 'root'})
export class PaymentService {

    constructor(private notificationService: NotificationService) {}

    public getPayments(): Observable<PaymentModel[]> {
        return from(invoke<PaymentModel[]>('get_payments'));
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
    }
}
