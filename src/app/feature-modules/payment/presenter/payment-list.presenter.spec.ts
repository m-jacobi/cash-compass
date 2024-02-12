
import { of } from 'rxjs';
import { CategoryFacade } from '../../../core/facades/category.facade';
import { PaymentFacade } from '../../../core/facades/payment.facade';
import { CategoryModel } from '../../../core/models/category.model';
import { PaymentModel } from '../../../core/models/payment.model';
import { PaymentListVM } from '../models/payment.vm';
import { PaymentListPresenter } from './payment-list.presenter';

const mockedCategories: CategoryModel[] = [
    {
        id: 'id1',
        name: 'aName',
        defaultCategory: true
    },
    {
        id: 'id2',
        name: 'bName',
        defaultCategory: true
    },
    {
        id: 'id3',
        name: 'cName',
        defaultCategory: true
    },
    {
        id: 'id4',
        name: 'dName',
        defaultCategory: false

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
    {
        id: 'id3',
        description: 'description3',
        amount: 100,
        paymentDate: '2023-12-01',
        categoryId: 'id4',
        payee: 'payee3',
        incomeOrExpense: false
    },
    {
        id: 'id4',
        description: 'description4',
        amount: 100,
        paymentDate: '2023-12-01',
        categoryId: '',
        payee: 'payee4',
        incomeOrExpense: false
    },
];
describe('PaymentListPresenter', () => {
    let presenter: PaymentListPresenter;

    const categoryFacade: any = {
        categories$: of(mockedCategories),
        loadCategories: () => {}
    } as unknown as CategoryFacade;

    const paymentFacade: any = {
        payments$: of(mockedPayments),
        loadPayments: () => {}
    } as unknown as PaymentFacade;

    beforeEach(() => {
        presenter = new PaymentListPresenter(paymentFacade, categoryFacade);
    });

    it('should be created', () => {
        expect(presenter).toBeTruthy();
    });

    it('should payment view model', (done) => {
        const expectedPayments: PaymentListVM[] = [
            {
                id: 'id1',
                description: 'description1',
                amount: 100,
                paymentDate: '2023-12-01',
                payee: 'payee1',
                incomeOrExpense: true,
                categoryId: 'id1',
                categoryName: 'aName'
            },
            {
                id: 'id2',
                description: 'description2',
                amount: 100,
                paymentDate: '2023-12-01',
                payee: 'payee2',
                incomeOrExpense: true,
                categoryId: 'id2',
                categoryName: 'bName'
            },
            {
                id: 'id3',
                description: 'description3',
                amount: 100,
                paymentDate: '2023-12-01',
                payee: 'payee3',
                incomeOrExpense: false,
                categoryId: 'id4',
                categoryName: 'dName'
            },
            {
                id: 'id4',
                description: 'description4',
                amount: 100,
                paymentDate: '2023-12-01',
                payee: 'payee4',
                incomeOrExpense: false,
                categoryId: '',
                categoryName: 'Zuweisung fehlt'
            }
        ];

        const sub = presenter.paymentsVm$.subscribe((payments: PaymentListVM[]) => {
            expect(payments).toEqual(expectedPayments);
            done();
        });
    });
});
