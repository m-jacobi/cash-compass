import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { PaymentService } from "../data-access/services/payment/payment.service";
import { PaymentModel } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentFacade {

    public payments$: Observable<PaymentModel[]>;

    private paymentsSource = new ReplaySubject<PaymentModel[]>(1);

    constructor(
        private paymentService: PaymentService,
    ) {
        this.loadPayments();
        this.payments$ = this.paymentsSource.asObservable();
    }

    public loadPayments(): void {
        this.paymentService.getPayments().subscribe((payments: PaymentModel[]) => {
            this.paymentsSource.next(payments);
        });
    }

    public createPayment(payment: Partial<PaymentModel>): void {
        this.paymentService.createPayment(payment);
        this.loadPayments();
    }

    public updatePayment(payment: Partial<PaymentModel>): void {
        this.paymentService.updatePayment(payment);
        this.loadPayments();
    }

    public updateRecurringPayment(payment: Partial<PaymentModel>): void {
        this.paymentService.updateRecurringPayment(payment);
        this.loadPayments();
    }

    public deletePayment(paymentId: string, isRecurring: boolean): void {
        this.paymentService.deletePayment(paymentId, isRecurring);
        this.loadPayments();
    }

    public deleteRecurringPayments(recurringId: string, isRecurring: boolean): void {
        this.paymentService.deleteRecurringPayments(recurringId, isRecurring);
        this.loadPayments();
    }
}
