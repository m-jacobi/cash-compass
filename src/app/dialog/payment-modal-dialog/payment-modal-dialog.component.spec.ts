import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
