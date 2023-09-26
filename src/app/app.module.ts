import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { BrowserModule } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DEFAULT_OPTIONS as MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyPaginatorIntl as MatPaginatorIntl, MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CategoryModalDialogComponent } from './dialog/category-modal-dialog/category-modal-dialog.component';
import { PaymentModalDialogComponent } from './dialog/payment-modal-dialog/payment-modal-dialog.component';
import { getMatPaginatorIntl } from './utils/paginator-intl';
import { PaymentListComponent } from './components/payment-list/payment-list.component';


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
