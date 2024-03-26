import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Subject, from, groupBy, mergeMap, of, takeUntil, toArray, zip } from 'rxjs';
import { PaymentFacade } from 'src/app/core/facades/payment.facade';
import { PaymentListVM } from '../../../payment/models/payment.vm';
import { PaymentListPresenter } from '../../../payment/presenter/payment-list.presenter';

export interface PaymentsGroupByCategory {
    categoryName: string,
    totalAmount: number
}

@Component({
    selector: 'app-payment-chart',
    templateUrl: './payment-chart.component.html',
    styleUrls: ['./payment-chart.component.css']
})
export class PaymentChartComponent implements OnInit, OnDestroy {

    public paymentsGroupByCategory: PaymentsGroupByCategory[] = [];
    public chart: any;
    private payments: PaymentListVM[] = [];
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private paymentFacade: PaymentFacade,
        private paymentListPresenter: PaymentListPresenter
    ) {
        // TODO:
        this.paymentFacade.loadPayments();
    }

    public ngOnInit(): void {
        this.loadData();
    }

    public ngOnDestroy(): void {
        this.ngDestroy.next();
        this.ngDestroy.unsubscribe();
    }

    private loadData(): void {
        this.paymentListPresenter.paymentsVM$.pipe(
            takeUntil(this.ngDestroy)
        ).subscribe((payments: PaymentListVM[]) => {
            this.payments = payments
        });
        this.groupPaymentsByCategory();
        this.createChart();
    }

    private groupPaymentsByCategory(): void {
        const data = from(this.payments);

        data.pipe(
            groupBy(
                (payment: PaymentListVM) => payment.categoryName,
                (p: PaymentListVM) => p.amount
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
            mergeMap(([categoryName, amounts]: [string, number[]]) => {
                const sum = amounts.reduce((acc, curr) => acc + curr, 0);
                return of({ categoryName, totalAmount: sum });
            }
        ),
        toArray()
        ).subscribe((paymentsGroupByCategory: PaymentsGroupByCategory[]) => {
            console.log(paymentsGroupByCategory);
            this.paymentsGroupByCategory = paymentsGroupByCategory;
        });
    }

    private createChart(): void {
        this.chart = new Chart('Kategorien', {
            type: 'bar',
            data: {
                labels: this.paymentsGroupByCategory.map(row => row.categoryName),
                datasets: [
                    {
                        label: 'Ausgaben pro Kategorie',
                        data: this.paymentsGroupByCategory.map(row => row.totalAmount),
                    }
                ]
            }
        });
    }
}
