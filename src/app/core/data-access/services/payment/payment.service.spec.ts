import { invoke } from '@tauri-apps/api';
import { clearMocks, mockIPC } from "@tauri-apps/api/mocks";
import { invokeMock } from '../../../../../__mocks__/tauri.mock';
import { NotificationService } from '../../../../services/notification.service';
import { PaymentModel } from '../../../models/payment.model';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
    let service: PaymentService;

    const notificationService: any = {
        showNotification: () => {}
    } as unknown as NotificationService

    beforeEach(() => {
        service = new PaymentService(notificationService);
        invokeMock.mockReset();
    });

    afterEach(() => {
        clearMocks()
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

        invoke('get_payments');
        expect(invoke).toHaveBeenCalledWith('get_payments');


        // expect(invoke('get_payments')).toEqual(mockedPayments);

        // invokeMock.mockResolvedValue(mockedPayments);

        // service.getPayments().subscribe((payments: PaymentModel[]) => {
        //     expect(payments).toEqual(mockedPayments);
        //     expect(invokeMock).toHaveBeenCalledWith('get_payments');
        // });

        // expect(invoke('get_payments')).toEqual({ foo: 'bar' });
    });
});
