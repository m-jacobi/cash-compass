import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest, map } from 'rxjs';
import { CategoryFacade } from 'src/app/core/facades/category.facade';
import { CategoryModel } from 'src/app/core/models/category.model';
import { TDictionary } from 'src/app/core/utils/dictionary.util';
import { PaymentFacade } from '../../../../../core/facades/payment.facade';
import { PaymentModel } from '../../../../../core/models/payment.model';
import { PaymentListVM } from '../models/payment.vm';

const getEntityDict = <T>(entities: any[], key: string): TDictionary<T> => {
    const dict: TDictionary<any> = {};

    entities.forEach((entity: any) => dict[entity[key] as string] = entity);
    return dict;
};

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
