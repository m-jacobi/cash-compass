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
        this.payments$ = this.paymentsSource.asObservable();
        this.loadPayments();
    }

    private loadPayments(): void {
        this.paymentService.getPayments().subscribe((payments: PaymentModel[]) => {
            this.paymentsSource.next(JSON.parse(payments.toString()));
        });
    }

    public createPayment(payment: PaymentModel): void {
        this.paymentService.createPayment(payment);
        this.loadPayments();
    }

    public updatePayment(payment: PaymentModel): void {
        this.paymentService.updatePayment(payment);
        this.loadPayments();
    }

    public deletePayment(paymentId: string): void {
        this.paymentService.deletePayment(paymentId);
        this.loadPayments();
    }
}
