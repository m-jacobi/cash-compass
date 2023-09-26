import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
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
