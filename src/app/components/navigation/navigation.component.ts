import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { CategoryModalDialogComponent } from '../../dialog/category-modal-dialog/category-modal-dialog.component';
import { PaymentModalDialogComponent } from '../../dialog/payment-modal-dialog/payment-modal-dialog.component';
import { EMPTY_CATEGORY } from '../../models/category.model';
import { EMPTY_PAYMENT } from '../../models/payment.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    public breakpoint$: Observable<boolean>;

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,) {
        this.breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map((breakpoint) => breakpoint.matches)
        );
    }

    public ngOnInit(): void {
    }

    public openCreatePaymentDialog() {
        const createDialogRef = this.dialog.open(PaymentModalDialogComponent, {
            data: EMPTY_PAYMENT
        });
    }

    public openCreateCategoryDialog(): void {
        const createDialogRef = this.dialog.open(CategoryModalDialogComponent, {
            data: EMPTY_CATEGORY
        });
    }

}
