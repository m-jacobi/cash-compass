import { TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
    let service: PaymentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule]
        });
        service = TestBed.inject(PaymentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
