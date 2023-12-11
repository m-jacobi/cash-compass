import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryServiceNew } from './category.service.new';

describe('CategoryService', () => {
    let service: CategoryServiceNew;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule]
        });
        service = TestBed.inject(CategoryServiceNew);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
