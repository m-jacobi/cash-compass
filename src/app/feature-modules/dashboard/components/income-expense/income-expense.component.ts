import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PaymentListVM } from '../../../payment/models/payment.vm';
import { PaymentListPresenter } from '../../../payment/presenter/payment-list.presenter';

export interface DataModel {
    letter: string;
    frequency: number;
  }

@Component({
    selector: 'app-income-expense',
    templateUrl: './income-expense.component.html',
    styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {

    private payments: PaymentListVM[] = [];
    private readonly ngDestroy = new Subject<void>();



    constructor(private paymentListPresenter: PaymentListPresenter) {}

    public ngOnInit() {
        this.loadPayments();
    }

    private loadPayments(): void {
        this.paymentListPresenter.paymentsVm$.pipe(takeUntil(this.ngDestroy)).subscribe((payments: PaymentListVM[]) => {
            this.payments = payments;
            console.log('payments', payments);
            });
    }
}
