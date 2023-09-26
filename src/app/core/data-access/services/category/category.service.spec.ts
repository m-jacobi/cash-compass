import { TestBed } from '@angular/core/testing';

import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
    let service: CategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule]
        });
        service = TestBed.inject(CategoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
