import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryModalDialogComponent } from './category-modal-dialog.component';

describe('CategoryModalDialogComponent', () => {
    let component: CategoryModalDialogComponent;
    let fixture: ComponentFixture<CategoryModalDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CategoryModalDialogComponent ],
            imports: [
                MatSnackBarModule,
                MatFormFieldModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [{provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}}]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CategoryModalDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
