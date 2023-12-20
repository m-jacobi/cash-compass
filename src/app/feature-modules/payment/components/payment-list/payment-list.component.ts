import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { compareAsc, format } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { CategoryFacade } from 'src/app/core/facades/category.facade';
import { CalculationService } from 'src/app/services/calculation.service';
import { PaymentFacade } from '../../../../core/facades/payment.facade';
import { EMPTY_PAYMENT, PaymentModel } from '../../../../core/models/payment.model';
import { PaymentModalDialogComponent } from '../../../../dialog/payment-modal-dialog/payment-modal-dialog.component';
import { DateRange } from '../../../../models/date-range.model';
import { PaymentIncomeOrExpense } from '../../../../models/payment-income-or-expense.model';
import { PaymentListVM } from './models/payment.vm';
import { PaymentListPresenter } from './presenter/payment-list.presenter';

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
    public incomeOrExpenses: PaymentIncomeOrExpense[];
    private payments: PaymentListVM[] = [];
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private paymentFacade: PaymentFacade,
        private paymentListPresenter: PaymentListPresenter,
        private categoryFacade: CategoryFacade,
        private dialog: MatDialog,
        private calculationService: CalculationService,

    ) {
        this.tableColumns = ['categoryName', 'description', 'amount', 'payee', 'paymentDate', 'action'];
        this.paymentDataSource = new MatTableDataSource<PaymentListVM>([]);
        this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
        this.sort = new MatSort;

        this.filterDateForm = new FormGroup({
            fromDate: new FormControl({value: null, disabled: false}),
            toDate: new FormControl({value: null, disabled: false}),
        });
        // TODO: global Array and push noFilter to the array
        this.incomeOrExpenses = [
            {
                name: '---',
                state: 'noFilter'
            },
            {
                name: 'Einnahme',
                state: true
            }, {
                name: 'Ausgabe',
                state: false,
            }
        ]
    }

    public ngOnInit(): void {
        this.paymentFacade.loadPayments();
        this.categoryFacade.loadCategories();
        this.loadPayments();
    }

    private loadPayments(): void {
        this.paymentListPresenter.payments$.pipe(takeUntil(this.ngDestroy)).subscribe((payments: PaymentListVM[]) => {
            this.payments = payments;
            this.totalIncomeCost = this.calculationService.getTotalIncomeCost(this.payments);
            this.totalExpenseCost = this.calculationService.getTotalExpenseCost(this.payments);
            this.paymentDataSource.data = this.payments;
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

    // TODO: Reset Date Range
    public filterDate(value: DateRange): void {
        const fromDate = format(new Date(value.fromDate), "yyyy-MM-dd");
        const toDate = format(new Date(value.toDate), "yyyy-MM-dd");
        this.paymentDataSource.data = this.payments.filter((payment: PaymentListVM) => payment.paymentDate >= fromDate && payment.paymentDate <= toDate )
            .sort((a, b) => compareAsc(new Date(a.paymentDate), new Date(b.paymentDate)));
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
            data: EMPTY_PAYMENT
        });
    }

    public openEditPaymentDialog(payment: PaymentModel): void {
        this.dialog.open(PaymentModalDialogComponent, {
            data: payment
        });
    }

    public deletePayment(paymentId: string): void {
        this.paymentFacade.deletePayment(paymentId);
    }
}
