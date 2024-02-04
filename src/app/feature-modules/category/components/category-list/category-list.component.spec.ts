import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
    let component: CategoryListComponent;
    let fixture: ComponentFixture<CategoryListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CategoryListComponent ],
            imports: [MatSnackBarModule, MatDialogModule]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CategoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
