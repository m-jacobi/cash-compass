import { of } from "rxjs";
import { PaymentService } from "../data-access/services/payment/payment.service";
import { PaymentModel } from "../models/payment.model";
import { PaymentFacade } from "./payment.facade";

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

describe('PaymentFacade', () => {
    let facade: PaymentFacade;

    const paymentService: any = {
        getPayments: () => of(mockedPayments),
        createPayment: () => {},
        updatePayment: () => {},
        deletePayment: () => {}
    } as unknown as PaymentService;

    beforeEach(() => {
        facade = new PaymentFacade(paymentService);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should be created', () => {
        expect(facade).toBeTruthy();
    });

    it('should load payments', () => {
        jest.spyOn(paymentService, 'getPayments');

        facade.loadPayments();
        jest.runOnlyPendingTimers();

        const sub = facade.payments$.subscribe((payments: PaymentModel[]) => {
            expect(payments).toEqual(mockedPayments);
            expect(paymentService.getPayments).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });

    it('should create a payment', () => {
        jest.spyOn(paymentService, 'createPayment');
        jest.spyOn(paymentService, 'getPayments');

        const mockedNewPayment: PaymentModel = {
            id: '',
            description: 'description3',
            amount: 100,
            paymentDate: '2023-12-01',
            categoryId: 'id3',
            payee: 'payee3',
            incomeOrExpense: true
        };

        facade.createPayment(mockedNewPayment);
        jest.runOnlyPendingTimers();

        const sub = facade.payments$.subscribe(() => {
            expect(paymentService.createPayment).toHaveBeenCalledWith(mockedNewPayment);
            expect(paymentService.createPayment).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });

    it('should update a payments', () => {
        jest.spyOn(paymentService, 'updatePayment');
        jest.spyOn(paymentService, 'getPayments');

        const mockedUpdatePayment: PaymentModel = {
            id: 'id2',
            description: 'description2',
            amount: 100,
            paymentDate: '2023-12-01',
            categoryId: 'id3',
            payee: 'payee3',
            incomeOrExpense: false
        };

        facade.updatePayment(mockedUpdatePayment);
        jest.runOnlyPendingTimers();

        const sub = facade.payments$.subscribe(() => {
            expect(paymentService.updatePayment).toHaveBeenCalledWith(mockedUpdatePayment);
            expect(paymentService.updatePayment).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });

    it('should delete a payments', () => {
        jest.spyOn(paymentService, 'updatePayment');
        jest.spyOn(paymentService, 'getPayments');

        const mockedDeletePayment: string = 'id1';

        facade.deletePayment(mockedDeletePayment);
        jest.runOnlyPendingTimers();

        const sub = facade.payments$.subscribe(() => {
            expect(paymentService.deletePayment).toHaveBeenCalledWith(mockedDeletePayment);
            expect(paymentService.deletePayment).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });
});
