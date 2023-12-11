import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
