import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CategoryModalDialogComponent } from './dialog/category-modal-dialog/category-modal-dialog.component';
import { PaymentModalDialogComponent } from './dialog/payment-modal-dialog/payment-modal-dialog.component';
import { CategoryListComponent } from './feature-modules/category/components/category-list/category-list.component';
import { PaymentListComponent } from './feature-modules/payment/components/payment-list/payment-list.component';
import { getMatPaginatorIntl } from './utils/paginator-intl';


@NgModule({
    declarations: [
        AppComponent,
        PaymentListComponent,
        NavigationComponent,
        PaymentModalDialogComponent,
        CategoryListComponent,
        CategoryModalDialogComponent,
        NotificationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DatePipe,
        MatTooltipModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        OverlayModule,
        MatExpansionModule,
        MatCardModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: true,
                height: 'auto',
                minWidth: '400px',
                maxWidth: '1000px',
                minHeight: '100px',
                maxHeight: '536px',
            },
        }, {
            provide: MAT_DATE_LOCALE,
            useValue: 'de'
        },
        {
            provide: MatPaginatorIntl,
            useValue: getMatPaginatorIntl()
        },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
