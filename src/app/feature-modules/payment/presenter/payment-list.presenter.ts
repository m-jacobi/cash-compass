import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest, map } from 'rxjs';
import { CategoryFacade } from '../../../core/facades/category.facade';
import { PaymentFacade } from '../../../core/facades/payment.facade';
import { CategoryModel } from '../../../core/models/category.model';
import { PaymentModel } from '../../../core/models/payment.model';
import { TDictionary, getEntityDict } from '../../../utils/dictionary.util';
import { PaymentListVM } from '../models/payment.vm';

@Injectable({providedIn: 'root'})
export class PaymentListPresenter {

    public payments$: Observable<PaymentListVM[]>;
    private paymentSource = new ReplaySubject<PaymentListVM[]>(1);
    private categoryDict: TDictionary<CategoryModel> = {};

    constructor(
        private paymentFacade: PaymentFacade,
        private categoryFacade: CategoryFacade
    ) {
        this.payments$ = this.paymentSource.asObservable();

        combineLatest([
            this.paymentFacade.payments$,
            this.categoryFacade.categories$,
        ]).pipe(
            map(
                ([payments, categories]: [PaymentModel[], CategoryModel[]]) => {
                    this.categoryDict = getEntityDict<CategoryModel>(categories, 'id');
                    return payments
                }
            ),
            map((payments: PaymentModel[]) => payments.map((payment: PaymentModel) => this.mapToVm(payment)))
        ).subscribe((payments: PaymentListVM[]) => {
            this.paymentSource.next(payments)
        });
    }

    private mapToVm(payment: PaymentModel): PaymentListVM {
        const category = this.categoryDict[payment.categoryId];
        return {
            id: payment.id,
            description: payment.description,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            payee: payment.payee,
            incomeOrExpense: payment.incomeOrExpense,
            categoryId: payment.categoryId,
            categoryName: category?.name ?? 'Zuweisung fehlt'
        }
    }


}