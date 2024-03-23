import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { CategoryFacade } from '../../../core/facades/category.facade';
import { PaymentFacade } from '../../../core/facades/payment.facade';
import { CategoryModel } from '../../../core/models/category.model';
import { PaymentModel } from '../../../core/models/payment.model';
import { CategoryListVM } from '../models/category.vm';

@Injectable({providedIn: 'root'})
export class CategoryListPresenter {

    public categoriesVM$: Observable<CategoryListVM[]>;
    private categorySource = new ReplaySubject<CategoryListVM[]>(1);
    private paymentCategoryIds: string[] = [];

    constructor(
        private categoryFacade: CategoryFacade,
        private paymentFacade: PaymentFacade
    ) {
        this.paymentFacade.loadPayments();
        this.fetchCategoryIdsForAllPayments();

        this.categoriesVM$ = this.categorySource.asObservable();

        this.categoryFacade.categories$.pipe(
            map((categories: CategoryModel[]) => categories.map((category: CategoryModel) => this.mapToVm(category)))
        ).subscribe((categories: CategoryListVM[]) => this.categorySource.next(this.sortCategoriesAsc(categories)));
    }

    private fetchCategoryIdsForAllPayments(): void {
        this.paymentFacade.payments$.pipe(
            map((payments: PaymentModel[]) => payments.map((payment: PaymentModel) => payment.categoryId))
        ).subscribe((categoryIds: string[]) => {
            this.paymentCategoryIds = categoryIds;
        });
    }

    private isCategoryUsedInPayments(categoryId: string, categoryIdsPerPayment: string[]): boolean {
        return categoryIdsPerPayment.some((categoryIdsPerPayment: string) => categoryIdsPerPayment === categoryId);
    }

    private sortCategoriesAsc(categories: CategoryModel[]): CategoryModel[] {
        return categories.sort((a: CategoryModel, b: CategoryModel)=> a.name > b.name ? 1:-1 );
    }

    private mapToVm(category: CategoryModel): CategoryListVM {
        return {
            id: category.id,
            name: category.name,
            defaultCategory: category.defaultCategory,
            isCategoryUsed: this.isCategoryUsedInPayments(category.id, this.paymentCategoryIds)
        }
    }
}
