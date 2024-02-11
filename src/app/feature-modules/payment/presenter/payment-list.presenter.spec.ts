
import { of } from 'rxjs';
import { CategoryFacade } from '../../../core/facades/category.facade';
import { PaymentFacade } from '../../../core/facades/payment.facade';
import { PaymentListPresenter } from './payment-list.presenter';

describe('PaymentListPresenter', () => {
    let presenter: PaymentListPresenter;

    const categoryFacade: any = {
        categories$: of(),
        loadCategories: () => {}
    } as unknown as CategoryFacade;

    const paymentFacade: any = {
        payments$: of(),
        loadCategories: () => {}
    } as unknown as PaymentFacade;

    beforeEach(() => {
        presenter = new PaymentListPresenter(paymentFacade, categoryFacade);
    });

    it('should be created', () => {
        expect(presenter).toBeTruthy();
    });
});
