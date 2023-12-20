import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentListPresenter } from './payment-list.presenter';

describe('PaymentListPresenter', () => {
    let presenter: PaymentListPresenter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule]
        });
        presenter = TestBed.inject(PaymentListPresenter);
    });

    it('should be created', () => {
        expect(presenter).toBeTruthy();
    });
});
