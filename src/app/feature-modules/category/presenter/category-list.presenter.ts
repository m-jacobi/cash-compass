import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { PaymentService } from '../../../core/data-access/services/payment/payment.service';
import { CategoryFacade } from '../../../core/facades/category.facade';
import { CategoryModel } from '../../../core/models/category.model';
import { PaymentModel } from '../../../core/models/payment.model';
import { CategoryListVM } from '../models/category.vm';

@Injectable({providedIn: 'root'})
export class CategoryListPresenter {

    public categories$: Observable<CategoryListVM[]>;
    private categorySource = new ReplaySubject<CategoryListVM[]>(1);
    private categoryIdsPerPayment: string[];

    constructor(
        private categoryFacade: CategoryFacade,
        private paymentService: PaymentService
    ) {
        this.categories$ = this.categorySource.asObservable();
        this.categoryIdsPerPayment = [];

        this.categoryFacade.categories$.pipe(
            map((categories: CategoryModel[]) => categories.map((category: CategoryModel) => this.mapToVm(category)))
        ).subscribe((categories: CategoryListVM[]) => this.categorySource.next(this.sortCategoriesAsc(categories)));

    }

    private mapToVm(category: CategoryModel): CategoryListVM {
        return {
            id: category.id,
            name: category.name,
            defaultCategory: category.defaultCategory,
            isCategoryUsed: true
        }
    }

    private fetchCategoryIdsForPayments(): void {
        this.paymentService.getPayments()
            .subscribe((payments: PaymentModel[]) => {
                payments.forEach((payment: PaymentModel) => {
                    this.categoryIdsPerPayment.push(payment.categoryId);
                });
            });
    }

    private isCategoryUsedInPayments(categoryId: string, categoryIdsPerPayment: string[]): boolean {
        return categoryIdsPerPayment.some((categoryIdsPerPayment: string) => categoryIdsPerPayment === categoryId);
    }

    private sortCategoriesAsc(categories: CategoryModel[]): CategoryModel[] {
        return categories.sort((a: CategoryModel, b: CategoryModel)=> a.name > b.name ? 1:-1 );
    }

}
