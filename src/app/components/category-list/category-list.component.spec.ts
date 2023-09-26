import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
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
