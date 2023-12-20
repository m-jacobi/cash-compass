import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formatISO, parseISO } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { CategoryFacade } from '../../core/facades/category.facade';
import { CategoryModel } from '../../core/models/category.model';
import { PaymentModel } from '../../core/models/payment.model';
import { PaymentIncomeOrExpense } from '../../models/payment-income-or-expense.model';
import { PaymentFacade } from './../../core/facades/payment.facade';

@Component({
  selector: 'app-payment-modal-dialog',
  templateUrl: './payment-modal-dialog.component.html',
  styleUrls: ['./payment-modal-dialog.component.scss']
})
export class PaymentModalDialogComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public categories: CategoryModel[] = [];
    public incomeOrExpenses: PaymentIncomeOrExpense[];
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private paymentFacade: PaymentFacade,
        private categoryFacade: CategoryFacade,
        public modalRef: MatDialogRef<PaymentModalDialogComponent, PaymentModel>,
        @Inject(MAT_DIALOG_DATA) public data: PaymentModel
    ) {
        this.incomeOrExpenses = [
            {
                name: 'Einnahme',
                state: true
            }, {
                name: 'Ausgabe',
                state: false,
            }
        ]

        this.categoryFacade.loadCategories();
        this.categoryFacade.categories$.pipe(takeUntil(this.ngDestroy))
        .subscribe((categories: CategoryModel[]) => {
            this.categories = categories;
        });

        this.form = new FormGroup({
            description: new FormControl(this.data.description),
            amount: new FormControl(this.data.amount, [Validators.required]),
            paymentDate: new FormControl(parseISO(this.data.paymentDate)),
            category: new FormControl(this.data.categoryId, [Validators.required]),
            payee: new FormControl(this.data.payee),
            incomeOrExpense: new FormControl(this.data.incomeOrExpense, [Validators.required])
        });

        console.log('this.data', this.data);
    }

    public ngOnInit(): void { }

    get formControl() {
        return this.form.controls;
    }

    public savePayment(): void {
        const payment: PaymentModel = {
        id: this.data.id,
        description: this.formControl['description'].value,
        amount: this.formControl['amount'].value,
        paymentDate: formatISO(this.formControl['paymentDate'].value, {representation: 'date'}),
        categoryId: this.formControl['category'].value,
        payee: this.formControl['payee'].value,
        incomeOrExpense: this.formControl['incomeOrExpense'].value
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
