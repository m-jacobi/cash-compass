import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { PaymentModalDialogComponent } from './payment-modal-dialog.component';


describe('PaymentModalDialogComponent', () => {
    let component: PaymentModalDialogComponent;
    let fixture: ComponentFixture<PaymentModalDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ PaymentModalDialogComponent ],
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

        fixture = TestBed.createComponent(PaymentModalDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
