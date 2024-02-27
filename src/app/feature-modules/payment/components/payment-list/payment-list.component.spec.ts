

import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EMPTY_PAYMENT } from '../../../../core/models/payment.model';
import { PaymentModalDialogComponent } from '../../../../dialog/payment-modal-dialog/payment-modal-dialog.component';
import { CalculationService } from '../../../../services/calculation.service';
import { PaymentListVM } from '../../models/payment.vm';
import { PaymentListPresenter } from '../../presenter/payment-list.presenter';
import { PaymentListComponent } from './payment-list.component';

const mockedPayments: PaymentListVM[] = [
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

describe('PaymentListComponent', () => {
    let component: PaymentListComponent;

    const paymentFacade: any = {
        deletePayment: () => {}
    };

    const paymentListPresenter: any = {
        paymentsVm$: of(mockedPayments)
    } as unknown as PaymentListPresenter

    const dialog: any = {
        open: () => {}
    } as unknown as MatDialog;

    const calculationService: any = {
        getTotalIncomeCost: () => {},
        getTotalExpenseCost: () => {}
    } as unknown as CalculationService;


    beforeEach(() => {
        component = new PaymentListComponent(paymentFacade, paymentListPresenter, dialog, calculationService);
    });

    it('should create', () => {
        component.ngOnInit();
        expect(component).toBeTruthy();
        component.ngAfterViewInit();
    });

    it('should load the payment data', () => {
        jest.spyOn(calculationService, 'getTotalIncomeCost');
        jest.spyOn(calculationService, 'getTotalExpenseCost');

        component.ngOnInit();

        expect(calculationService.getTotalIncomeCost).toHaveBeenCalled();
        expect(calculationService.getTotalExpenseCost).toHaveBeenCalled();
        expect(component.paymentDataSource.data).toEqual(mockedPayments);
        component.ngOnDestroy();
    });

    it('should open PaymentModalDialogComponent with EMPTY_PAYMENT data', () => {
        const openSpy = jest.spyOn(dialog, 'open');

        component.openCreatePaymentDialog();

        expect(openSpy).toHaveBeenCalledWith(PaymentModalDialogComponent, {
          data: EMPTY_PAYMENT
        });
    });

    it('should open PaymentModalDialogComponent for edit the payment data', () => {
        const openSpy = jest.spyOn(dialog, 'open');

        const mockedPayment: PaymentListVM = {
            id: 'id1',
            description: 'description1',
            amount: 100,
            paymentDate: '2023-12-01',
            payee: 'payee1',
            incomeOrExpense: true,
            categoryId: 'id1',
            categoryName: 'aName'
        };

        component.openEditPaymentDialog(mockedPayment);

        expect(openSpy).toHaveBeenCalledWith(PaymentModalDialogComponent, {
            data: mockedPayment
        });
    });

    it('should delete a payment', () => {
        jest.spyOn(paymentFacade, 'deletePayment');

        const paymentId: string = 'id1';

        component.deletePayment(paymentId);

        expect(paymentFacade.deletePayment).toHaveBeenCalledWith(paymentId);
    });
});
