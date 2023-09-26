import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentListComponent } from './payment-list.component';

describe('PaymentListComponent', () => {
    let component: PaymentListComponent;
    let fixture: ComponentFixture<PaymentListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ PaymentListComponent ],
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
                MatDialogModule,
                MatInputModule,
                MatFormFieldModule,
                MatPaginatorModule,
                MatSortModule,
                MatSelectModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatFormFieldModule
            ],
        })
        .compileComponents();

        fixture = TestBed.createComponent(PaymentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
