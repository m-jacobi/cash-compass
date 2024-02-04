import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryListPresenter } from './category-list.presenter';

describe('CategoryListPresenter', () => {
    let presenter: CategoryListPresenter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule]
        });
        presenter = TestBed.inject(CategoryListPresenter);
    });

    it('should be created', () => {
        expect(presenter).toBeTruthy();
    });
});
