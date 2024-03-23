import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { RECURRING_INTERVAL } from 'src/app/enum/recurring-interval.enum';
import { CategoryFacade } from '../../core/facades/category.facade';
import { CategoryModel } from '../../core/models/category.model';
import { PaymentModel } from '../../core/models/payment.model';
import { SelectItem } from '../../models/select-item.model';
import { PaymentFacade } from './../../core/facades/payment.facade';

@Component({
  selector: 'app-payment-modal-dialog',
  templateUrl: './payment-modal-dialog.component.html',
  styleUrls: ['./payment-modal-dialog.component.scss']
})
export class PaymentModalDialogComponent implements OnInit, OnDestroy {

    public paymentForm: FormGroup;
    public categories: CategoryModel[] = [];
    public incomeOrExpenses: SelectItem[] = [];
    public recurringIntervals: SelectItem[] = [];
    public isRecurring: boolean = false;
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private paymentFacade: PaymentFacade,
        private categoryFacade: CategoryFacade,
        public modalRef: MatDialogRef<PaymentModalDialogComponent, PaymentModel>,
        @Inject(MAT_DIALOG_DATA) public data: PaymentModel
    ) {
        this.incomeOrExpenses = [
            {
                value: true,
                text: 'Einnahme'
            },
            {
                value: false,
                text: 'Ausgabe',
            }
        ];

        this.recurringIntervals = [
            {
                value: RECURRING_INTERVAL.DAY,
                text: 'Tag'
            },
            {
                value: RECURRING_INTERVAL.WEEK,
                text: 'Woche'
            },
            {
                value:  RECURRING_INTERVAL.MONTH,
                text: 'Monat'
            },
            {
                value:  RECURRING_INTERVAL.YEAR,
                text: 'Jahr'
            }
        ];


        this.categoryFacade.categories$.pipe(takeUntil(this.ngDestroy))
        .subscribe((categories: CategoryModel[]) => {
            this.categories = categories;
        });

        this.paymentForm = new FormGroup({
            description: new FormControl<string>(this.data.description),
            amount: new FormControl<number>(this.data.amount, [Validators.required]),
            paymentDate: new FormControl<string>(this.data.paymentDate ? format(new Date(this.data.paymentDate), 'yyyy-MM-dd') : ''),
            category: new FormControl<string>(this.data.categoryId, [Validators.required]),
            payee: new FormControl<string>(this.data.payee),
            incomeOrExpense: new FormControl<boolean>(this.data.incomeOrExpense, [Validators.required]),
            isRecurring: new FormControl<boolean>(this.data.isRecurring, [Validators.required]),
            endDate: new FormControl<string>(this.data.endDate ? format(new Date(this.data.endDate), 'yyyy-MM-dd') : ''),
            interval: new FormControl<RECURRING_INTERVAL | string>(this.data.interval ?? '')
        });
    }

    public ngOnInit(): void {
        this.isRecurring = this.data.isRecurring;
     }

    public get formControl() {
        return this.paymentForm.controls;
    }

    public savePayment(): void {
        const payment: Partial<PaymentModel> = {
            description: this.formControl['description'].value,
            amount: this.formControl['amount'].value,
            paymentDate: format(new Date(this.formControl['paymentDate'].value), 'yyyy-MM-dd'),
            categoryId: this.formControl['category'].value,
            payee: this.formControl['payee'].value,
            incomeOrExpense: this.formControl['incomeOrExpense'].value,
            isRecurring: this.formControl['isRecurring'].value,
            endDate: this.formControl['endDate'].value ? format(new Date(this.formControl['endDate'].value), 'yyyy-MM-dd') : '',
            interval: this.formControl['interval'].value,
        }

        if(this.data.id && !this.data.isRecurring){
            this.paymentFacade.updatePayment(this.fillPaymentUpdateData(payment));
        } else if(this.data.id && this.data.isRecurring) {
            this.paymentFacade.updateRecurringPayment(this.fillRecurringPaymentUpdateData(payment));
        } else {
            this.paymentFacade.createPayment(payment);
        }
        this.onClose();
    }

    public onClose(): void {
        this.modalRef.close();
    }

    public ngOnDestroy(): void {
        this.ngDestroy.next();
        this.ngDestroy.unsubscribe();
    }

    private fillPaymentUpdateData(payment: Partial<PaymentModel>): Partial<PaymentModel> {
        const paymentData: Partial<PaymentModel> = {
            ...payment,
            id: this.data.id
        }
        return paymentData;
    }

    private fillRecurringPaymentUpdateData(payment: Partial<PaymentModel>): Partial<PaymentModel> {
        const paymentData: Partial<PaymentModel> = {
            ...payment,
            id: this.data.id,
            recurringId: this.data.recurringId,
        }
        return paymentData;
    }
}
