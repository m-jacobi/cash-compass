import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formatISO, parseISO } from 'date-fns';
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
                value: true,
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
            paymentDate: new FormControl<Date>(parseISO(this.data.paymentDate), [Validators.required]),
            category: new FormControl<string>(this.data.categoryId, [Validators.required]),
            payee: new FormControl<string>(this.data.payee),
            incomeOrExpense: new FormControl<boolean>(this.data.incomeOrExpense, [Validators.required]),
            isRecurring: new FormControl<boolean>(this.data.isRecurring, [Validators.required]),
            startDate: new FormControl<Date>(parseISO(this.data.paymentDate)),
            endDate: new FormControl<Date>(parseISO(this.data.endDate ?? '')),
            interval: new FormControl<RECURRING_INTERVAL | string>(this.data.interval ?? '')
        });
    }

    public ngOnInit(): void { }

    public get formControl() {
        return this.paymentForm.controls;
    }

    public savePayment(): void {
        const payment: PaymentModel = {
            id: this.data.id,
            description: this.formControl['description'].value,
            amount: this.formControl['amount'].value,
            paymentDate: formatISO(this.formControl['paymentDate'].value, {representation: 'date'}),
            categoryId: this.formControl['category'].value,
            payee: this.formControl['payee'].value,
            incomeOrExpense: this.formControl['incomeOrExpense'].value,
            isRecurring: this.formControl['isRecurring'].value,
            startDate: formatISO(this.formControl['paymentDate'].value, {representation: 'date'}),
            endDate: formatISO(this.formControl['endDate'].value, {representation: 'date'}),
            interval: this.formControl['interval'].value,
        }

        if(this.data.id){
            this.paymentFacade.updatePayment(payment);
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
}
