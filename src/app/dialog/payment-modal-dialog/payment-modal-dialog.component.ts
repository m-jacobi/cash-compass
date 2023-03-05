import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatISO, parseISO } from 'date-fns';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { PaymentIncomeOrExpense } from '../../models/payment-income-or-expense.model';
import { Payment } from '../../models/payment.model';
import { CategoryService } from '../../service/category.service';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'app-payment-modal-dialog',
  templateUrl: './payment-modal-dialog.component.html',
  styleUrls: ['./payment-modal-dialog.component.scss']
})
export class PaymentModalDialogComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public filteredCategorie$: Observable<Category[]>
    public categories: Category[] = [];
    public incomeOrExpenses: PaymentIncomeOrExpense[];
    private filteredCategoriesSubject: BehaviorSubject<Category[]>;
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private paymentService: PaymentService,
        private categoryService: CategoryService,
        public modalRef: MatDialogRef<PaymentModalDialogComponent, Payment>,
        @Inject(MAT_DIALOG_DATA) public data: Payment
    ) {
        this.filteredCategoriesSubject = new BehaviorSubject<Category[]>([]);
        this.filteredCategorie$ = this.filteredCategoriesSubject.asObservable();

        this.incomeOrExpenses = [
            {
                name: 'Einnahme',
                state: true
            }, {
                name: 'Ausgabe',
                state: false,
            }
        ]

        this.categoryService.getCategories().pipe(takeUntil(this.ngDestroy))
            .subscribe((categories: Category[]) => {
                this.categories = categories;
                this.filteredCategoriesSubject.next(this.categories);
        });

        this.form = new FormGroup({
            description: new FormControl(this.data.description),
            amount: new FormControl(this.data.amount, [Validators.required]),
            paymentDate: new FormControl(parseISO(this.data.paymentDate)),
            category: new FormControl(this.data.categoryId, [Validators.required]),
            payee: new FormControl(this.data.payee),
            incomeOrExpense: new FormControl(this.data.incomeOrExpense, [Validators.required])
        });
    }

    public ngOnInit(): void { }

    get formControl() {
        return this.form.controls;
    }

    public filterCategories(value: string): void {
        const filteredCategories = this.categories.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));

        this.filteredCategoriesSubject.next(filteredCategories);
    }

    public savePayment(): void {
        const payment: Payment = {
        id: this.data.id,
        description: this.formControl['description'].value,
        amount: this.formControl['amount'].value,
        paymentDate: formatISO(this.formControl['paymentDate'].value, {representation: 'date'}),
        categoryId: this.formControl['category'].value,
        payee: this.formControl['payee'].value,
        incomeOrExpense: this.formControl['incomeOrExpense'].value
        }

        if(this.data.id){
            this.paymentService.updatePayment(payment);
        } else {
            this.paymentService.createPayment(payment);
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
