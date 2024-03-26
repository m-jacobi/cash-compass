import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { compareAsc, format } from 'date-fns';
import { Subject, from, groupBy, mergeMap, of, reduce, takeUntil, toArray, zip } from 'rxjs';
import { PaymentFacade } from '../../../../core/facades/payment.facade';
import { EMPTY_PAYMENT } from '../../../../core/models/payment.model';
import { PaymentModalDialogComponent } from '../../../../dialog/payment-modal-dialog/payment-modal-dialog.component';
import { DateRange } from '../../../../models/date-range.model';
import { SelectItem } from '../../../../models/select-item.model';
import { CalculationService } from '../../../../services/calculation.service';
import { PaymentListVM } from '../../models/payment.vm';
import { PaymentListPresenter } from '../../presenter/payment-list.presenter';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    public paymentDataSource: MatTableDataSource<PaymentListVM>;
    public tableColumns: string[];
    public filterDateForm: FormGroup;
    public totalIncomeCost: number = 0;
    public totalExpenseCost: number = 0;
    public incomeOrExpenses: SelectItem[];
    private payments: PaymentListVM[] = [];
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private paymentFacade: PaymentFacade,
        private paymentListPresenter: PaymentListPresenter,
        private dialog: MatDialog,
        private calculationService: CalculationService,

    ) {
        this.tableColumns = ['categoryName', 'description', 'amount', 'payee', 'paymentDate', 'action'];
        this.paymentDataSource = new MatTableDataSource<PaymentListVM>([]);
        this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
        this.sort = new MatSort;

        this.filterDateForm = new FormGroup({
            fromDate: new FormControl<Date | null>(null),
            toDate: new FormControl<Date | null>(null),
        });
        // TODO: global Array and push noFilter to the array
        this.incomeOrExpenses = [
            {
                value: 'noFilter',
                text: '---',
            },
            {
                value: true,
                text: 'Einnahme'
            }, {
                value: false,
                text: 'Ausgabe',
            }
        ];
        this.bindFormChanges();
    }

    public ngOnInit(): void {
        this.loadPayments();
    }

    private loadPayments(): void {
        this.paymentListPresenter.paymentsVM$.pipe(takeUntil(this.ngDestroy)).subscribe((payments: PaymentListVM[]) => {
            this.payments = payments;
            this.totalIncomeCost = this.calculationService.getTotalIncomeCost(this.payments);
            this.totalExpenseCost = this.calculationService.getTotalExpenseCost(this.payments);
            this.paymentDataSource.data = this.payments;
        });

        const source = from(this.payments);

        const example = source.pipe(
            groupBy(payment => payment.categoryName),
            // return each item in group as array
            mergeMap(group => group.pipe(toArray()))
            );
        //const subscribe = example.subscribe(val => console.log(val));

        const test = source.pipe(
            groupBy(
                (person: PaymentListVM) => person.categoryName,
                (p: PaymentListVM) => p.amount
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray())))
            )
            .subscribe(console.log);

        // const foo = source.pipe(
        //     groupBy(datum => datum.categoryName), // Nach Kategorie gruppieren
        //     mergeMap(group => group.pipe(
        //         toArray(), // Gruppe in ein Array umwandeln
        //         mergeMap(groupedItems => {
        //             const date = groupedItems[0].paymentDate; // Datum aus dem ersten Element der Gruppe erhalten
        //             return groupedItems.map(item => ({ ...item, date }));
        //         })
        //     ))
        // )
        // .subscribe(groupedItem => console.log('groupedItem', groupedItem.categoryName, groupedItem.amount, groupedItem.paymentDate));


        // const faa = source.pipe(
        //     groupBy(
        //         (payment: PaymentListVM) => payment.categoryName
        //     ),
        //     mergeMap(group => group.pipe(
        //         reduce((acc: unknown, curr: PaymentListVM) => ({
        //             categoryName: curr.categoryName,
        //             amount: (acc as any)?.amount + curr.amount,
        //             dates: [...(acc as any)?.dates || [], curr.paymentDate]
        //         }), {}),
        //         toArray(),
        //         mergeMap((accumulated: any) => ({
        //             categoryName: accumulated.categoryName,
        //             amount: accumulated.amount,
        //             dates: accumulated.dates
        //         }))
        //     ))
        // );

        const faa = source.pipe(
            groupBy(
                (payment: PaymentListVM) => payment.categoryName
            ),
            mergeMap(group => group.pipe(
                reduce((acc: { categoryName: string, amount: number, dates: string[] }, curr: PaymentListVM) => {
                    return {
                        categoryName: curr.categoryName,
                        amount: (acc.amount || 0) + curr.amount,
                        dates: [...(acc.dates || []), curr.paymentDate]
                    };
                }, { categoryName: '', amount: 0, dates: [] }),
                toArray()
            ))
        );


        faa.subscribe(console.log);





    }

    private bindFormChanges(): void {
        this.filterDateForm.valueChanges
            .pipe(takeUntil(this.ngDestroy))
            .subscribe((values: DateRange) => {
                if(values.fromDate && values.toDate) {
                    this.filterDate(values)
                }
            });

    }

    public ngAfterViewInit(): void {
        this.paymentDataSource.sort = this.sort;
        this.paymentDataSource.paginator = this.paginator;
        if (this.paymentDataSource.paginator) {
            this.paymentDataSource.paginator.firstPage();
        }
    }

    public ngOnDestroy(): void {
        this.ngDestroy.next();
        this.ngDestroy.unsubscribe();
    }

    public filterPayments(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.paymentDataSource.filter = filterValue.trim().toLowerCase();

        if (this.paymentDataSource.paginator) {
            this.paymentDataSource.paginator.firstPage();
        }
    }

    public filterDate(value: DateRange): void {
        const fromDate = format(new Date(value.fromDate), "yyyy-MM-dd");
        const toDate = format(new Date(value.toDate), "yyyy-MM-dd");
        this.paymentDataSource.data = this.payments.filter((payment: PaymentListVM) => payment.paymentDate >= fromDate && payment.paymentDate <= toDate )
            .sort((a, b) => compareAsc(new Date(a.paymentDate), new Date(b.paymentDate)));
    }

    public resetFilterDate(): void {
        this.filterDateForm.reset();
        this.loadPayments();
    }

    public filterByIncomeOrExpense(event: any): void {
        if (event.value != "noFilter") {
            const filteredDataByIncomeOrExpense = this.payments.filter((payment: PaymentListVM) => payment.incomeOrExpense === event.value);
            this.paymentDataSource.data = filteredDataByIncomeOrExpense;
        } else {
            this.paymentDataSource.data = this.payments;
        }
    }

    public openCreatePaymentDialog(): void {
        this.dialog.open(PaymentModalDialogComponent, {
            minWidth: '482px',
            minHeight: '590px',
            data: EMPTY_PAYMENT
        });
    }

    public openEditPaymentDialog(payment: PaymentListVM): void {
        this.dialog.open(PaymentModalDialogComponent, {
            minWidth: '482px',
            minHeight: '590px',
            data: payment
        });
    }

    public deletePayment(paymentId: string, isRecurring: boolean, recurringId: string): void {
        if(!isRecurring) {
            this.paymentFacade.deletePayment(paymentId, isRecurring);
        } else {
            this.paymentFacade.deleteRecurringPayments(recurringId, isRecurring);
        }
    }
}
