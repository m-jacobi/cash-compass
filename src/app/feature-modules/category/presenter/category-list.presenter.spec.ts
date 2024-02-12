

import { of } from 'rxjs';
import { PaymentFacade } from 'src/app/core/facades/payment.facade';
import { CategoryFacade } from '../../../core/facades/category.facade';
import { CategoryModel } from '../../../core/models/category.model';
import { PaymentModel } from '../../../core/models/payment.model';
import { CategoryListVM } from '../models/category.vm';
import { CategoryListPresenter } from './category-list.presenter';

const mockedCategories: CategoryModel[] = [
    {
        id: 'id3',
        name: 'cName',
        defaultCategory: true
    },
    {
        id: 'id1',
        name: 'aName',
        defaultCategory: true
    },
    {
        id: 'id2',
        name: 'bName',
        defaultCategory: true
    }
];

const mockedPayments: PaymentModel[] = [
    {
        id: 'id1',
        description: 'description1',
        amount: 100,
        paymentDate: '2023-12-01',
        categoryId: 'id1',
        payee: 'payee1',
        incomeOrExpense: true
    },
    {
        id: 'id2',
        description: 'description2',
        amount: 100,
        paymentDate: '2023-12-01',
        categoryId: 'id2',
        payee: 'payee2',
        incomeOrExpense: true
    },
];

describe('CategoryListPresenter', () => {
    let presenter: CategoryListPresenter;

    const categoryFacade: any = {
        categories$: of(mockedCategories),
        loadCategories: () => {}
    } as unknown as CategoryFacade;

    const paymentFacade: any = {
        payments$: of(mockedPayments),
        loadPayments: () => {}
    } as unknown as PaymentFacade;

    beforeEach(() => {
        presenter = new CategoryListPresenter(categoryFacade, paymentFacade);
    });

    it('should be created', () => {
        expect(presenter).toBeTruthy();
    });

    it('should category view model', (done) => {
        const expectedCategories: CategoryListVM[] = [
            {
                id: 'id1',
                name: 'aName',
                defaultCategory: true,
                isCategoryUsed: true
            },
            {
                id: 'id2',
                name: 'bName',
                defaultCategory: true,
                isCategoryUsed: true
            },
            {
                id: 'id3',
                name: 'cName',
                defaultCategory: true,
                isCategoryUsed: false
            }
        ]
        const sub = presenter.categoriesVM$.subscribe((categories: CategoryListVM[]) => {
            expect(categories).toEqual(expectedCategories);
            done();
        });

        sub.unsubscribe();
    });
});
