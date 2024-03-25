import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PaymentFacade } from '../../../../core/facades/payment.facade';
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



    constructor(
        private paymentFacade: PaymentFacade,
        private paymentListPresenter: PaymentListPresenter
    ) {}

    public ngOnInit() {
        this.paymentFacade.loadPayments;
        this.loadPayments();

        // const data = [
        //     { id: 1, name: 'Red', parentId: null },
        //     { id: 2, name: 'Apple', parentId: 1 },
        //     { id: 3, name: 'Stop sign', parentId: 1 },
        //     { id: 4, name: 'Cake', parentId: 2 },
        //   ]

        //   const source = of(data).pipe(
        //     mergeAll(),
        //     groupBy((item) => item.parentId),
        //     mergeMap(group => group.pipe(toArray()))
        //   );

        //   source.subscribe(x => console.log(x));
    }

    private loadPayments(): void {
        // this.paymentListPresenter.paymentsVm$.subscribe((p: PaymentListVM[]) => {
        //     console.log('p', p);
        // });
    }
}
