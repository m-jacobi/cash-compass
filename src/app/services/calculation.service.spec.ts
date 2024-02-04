import { TestBed } from '@angular/core/testing';
import { PaymentModel } from '../core/models/payment.model';

import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
    let service: CalculationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getTotalIncomeCost', () => {
        let payments: PaymentModel[] = [];
        // it('should return the total income cost of payments', () => {
        //   const result = service.getTotalIncomeCost(payments);
        //   expect(result).toBe(175);
        // });

        it('should return 0 if there are no income payments', () => {
          payments = payments.filter((payment) => !payment.incomeOrExpense);
          const result = service.getTotalIncomeCost(payments);
          expect(result).toBe(0);
        });
      });
});
