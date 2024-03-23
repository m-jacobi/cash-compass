import { invoke } from "@tauri-apps/api";
import { mockIPC } from "@tauri-apps/api/mocks";
import { PaymentModel } from '../../../models/payment.model';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
    let service: PaymentService;

    beforeEach(() => {
        service = new PaymentService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all payments', () => {
        const mockedPayments: PaymentModel[] = [
            {
                id: 'id1',
                description: 'description1',
                amount: 120,
                paymentDate: '2023-04-12',
                categoryId: 'categoryId1',
                payee: 'payee1',
                incomeOrExpense: false,
            },
            {
                id: 'id2',
                description: 'description2',
                amount: 120,
                paymentDate: '2023-04-11',
                categoryId: 'categoryId2',
                payee: 'payee2',
                incomeOrExpense: true,
            }
        ];

        mockIPC((cmd) => {
            if (cmd === 'get_payments') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');

        service.getPayments().subscribe((payments: PaymentModel[]) => {
            invoke('get_payments');
            expect(spy).toHaveBeenCalled();
            expect(payments).toEqual(mockedPayments);
        });
    });

    it('should create a payment', () => {
        const mockedPayment: PaymentModel = {
            id: 'idNew1',
            description: 'description1',
            amount: 120,
            paymentDate: '2023-04-12',
            categoryId: 'categoryId1',
            payee: 'payee1',
            incomeOrExpense: false,
        }

        service.createPayment(mockedPayment);

        mockIPC((cmd) => {
            if (cmd === 'create_payment') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');
        invoke('create_payment');
        expect(spy).toHaveBeenCalled();
    });

    it('should update a payment', () => {
        const mockedPayment: PaymentModel = {
            id: 'id1',
            description: 'description1',
            amount: 120,
            paymentDate: '2023-04-12',
            categoryId: 'categoryId1',
            payee: 'payee1',
            incomeOrExpense: false,
        }

        service.updatePayment(mockedPayment);

        mockIPC((cmd) => {
            if (cmd === 'update_payment') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');
        invoke('update_payment');
        expect(spy).toHaveBeenCalled();
    });

    it('should delete a payment', () => {
        const mockedPaymentId: string = 'id1';

        service.deletePayment(mockedPaymentId);

        mockIPC((cmd) => {
            if (cmd === 'delete_payment') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');
        invoke('delete_payment');
        expect(spy).toHaveBeenCalled();
    });
});
