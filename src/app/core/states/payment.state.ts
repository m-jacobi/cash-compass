import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { PaymentModel } from "../models/payment.model";
import { TDictionary } from "../utils/dictionary.util";

@Injectable({ providedIn: 'root' })
export class PaymentState {

    public payments$: Observable<PaymentModel[]>;

    private paymentsSource = new ReplaySubject<PaymentModel[]>(1);
    private paymentsDict: TDictionary<PaymentModel>;
    constructor() {
        this.paymentsDict = {};
        this.payments$ = this.paymentsSource.asObservable();
    }

    public setPayments(payments: PaymentModel[]): void {
        this.paymentsToState(payments);
        this.paymentsSource.next(this.paymentsFromState());
    }

    private paymentsToState(payments: PaymentModel[]): void {
        this.paymentsDict = {};

        payments.forEach(
            (payment: PaymentModel) => this.paymentsDict[payment.id] = {...payment}
        );
    }

    private paymentsFromState(): PaymentModel[] {
        return Object.values(this.paymentsDict);
    }

}
