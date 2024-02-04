import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaymentService } from "../data-access/services/payment/payment.service";
import { PaymentModel } from '../models/payment.model';
import { PaymentState } from "../states/payment.state";

@Injectable({ providedIn: 'root' })
export class PaymentFacade {

    public payments$: Observable<PaymentModel[]>;

    constructor(
        private paymentService: PaymentService,
        private paymentState: PaymentState
    ) {
        this.payments$ = this.paymentState.payments$;
    }

    public loadPayments(): void {
        this.paymentService.getPayments().subscribe((payments: PaymentModel[]) => {
            this.paymentState.setPayments(JSON.parse(payments.toString()));
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
