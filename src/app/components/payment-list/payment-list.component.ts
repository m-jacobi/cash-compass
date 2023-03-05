import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { compareAsc, format } from 'date-fns';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import { PaymentModalDialogComponent } from '../../dialog/payment-modal-dialog/payment-modal-dialog.component';
import { Category } from '../../models/category.model';
import { DateRange } from '../../models/date-range.model';
import { PaymentIncomeOrExpense } from '../../models/payment-income-or-expense.model';
import { EMPTY_PAYMENT, Payment } from '../../models/payment.model';
import { CalculationService } from '../../service/calculation.service';
import { PaymentService } from '../../service/payment.service';
import { CategoryService } from './../../service/category.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})

export class PaymentListComponent implements OnInit, OnDestroy, AfterViewInit {

    public paymentDataSource: MatTableDataSource<Payment>;
    public tableColumns: string[];
    public filterDateRangeForm: FormGroup;
    public incomeOrExpenses: PaymentIncomeOrExpense[];
    private payments: Payment[];
    private readonly ngDestroy = new Subject<void>();

    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    constructor(
        private paymentService: PaymentService,
        private categoryService: CategoryService,
        private dialog: MatDialog,
        public calculationService: CalculationService,

    ) {
        this.tableColumns = ['category', 'description', 'amount', 'payee', 'paymentDate', 'action'];
        this.paymentDataSource = new MatTableDataSource<Payment>([]);
        this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
        this.sort = new MatSort;
        this.payments = [];
        this.filterDateRangeForm = new FormGroup({
            fromDate: new FormControl(),
            toDate: new FormControl(),
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
        this.getPayments();
    }

    private getPayments(): void {
        const payments$ = this.paymentService.getPayments();
        const categories$ = this.categoryService.getCategories();

        combineLatest([payments$, categories$])
            .pipe(map(([payment, category]) => {
                return payment.map(paymentData => {
                    const categoryData = category.find((c: Category) => c.id === paymentData.categoryId);
                    return {...paymentData, category: categoryData};
            });
        })).pipe(takeUntil(this.ngDestroy)).subscribe((payment: Payment[]) =>  {
            this.payments = payment;
            this.paymentDataSource.data = payment;
        });
    }

    public ngAfterViewInit(): void {
        this.paymentDataSource.sort = this.sort;
        this.paymentDataSource.paginator = this.paginator;
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
    public filterDateRange(value: DateRange): void {
        const fromDate = format(new Date(value.fromDate), "yyyy-MM-dd");
        const toDate = format(new Date(value.toDate), "yyyy-MM-dd");
        this.paymentDataSource.data = this.payments.filter((payment: Payment) => payment.paymentDate >= fromDate && payment.paymentDate <= toDate )
            .sort((a, b) => compareAsc(new Date(a.paymentDate), new Date(b.paymentDate)));
    }

    public filterByIncomeOrExpense(event: any): void {
        if (event.value != "noFilter") {
            const filteredDataByIncomeOrExpense = this.payments.filter((payment: Payment) => payment.incomeOrExpense === event.value);
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

    public openEditPaymentDialog(payment: Payment): void {
        this.dialog.open(PaymentModalDialogComponent, {
            data: payment
        });
    }

    public deletePayment(paymentId: string): void {
        this.paymentService.deletePayment(paymentId);
    }
}
