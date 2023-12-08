import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/core/data-access/services/category/category.service';
import { PaymentService } from 'src/app/core/data-access/services/payment/payment.service';
import { CategoryModel, EMPTY_CATEGORY } from '../../core/models/category.model';
import { PaymentModel } from '../../core/models/payment.model';
import { CategoryModalDialogComponent } from '../../dialog/category-modal-dialog/category-modal-dialog.component';
import { NOTIFICATION_TYPE } from '../../enum/notification-type.enum';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    public categoryDataSource: MatTableDataSource<CategoryModel>;
    public categoryListTableColumns: string[];
    private categoryIdsPerPayment: string[];
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private categoryService: CategoryService,
        private paymentService: PaymentService,
        private notificationService: NotificationService,
        private dialog: MatDialog,
    ) {
        this.categoryListTableColumns = ['name', 'action'];
        this.categoryDataSource = new MatTableDataSource<CategoryModel>([]);
        this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
        this.sort = new MatSort;
        this.categoryIdsPerPayment = [];
    }

    public ngOnInit(): void {
        this.getCategories();
        this.getCategoriesPerPayment();
    }

    public ngAfterViewInit(): void {
        this.categoryDataSource.sort = this.sort;
        this.categoryDataSource.paginator = this.paginator;
        if (this.categoryDataSource.paginator) {
            this.categoryDataSource.paginator.firstPage();
        }
    }

    public ngOnDestroy(): void {
        this.ngDestroy.next();
        this.ngDestroy.unsubscribe();
    }

    public getCategories(): void {
        this.categoryService.getCategories().pipe(takeUntil(this.ngDestroy))
            .subscribe((categories: CategoryModel[]) => {
                this.categoryDataSource.data = this.sortCategoriesAsc(categories);
         })
    }

    public filterCategories(event: Event): void  {
        const filterValue = (event.target as HTMLInputElement).value;
        this.categoryDataSource.filter = filterValue.trim().toLowerCase();

        if (this.categoryDataSource.paginator) {
            this.categoryDataSource.paginator.firstPage();
        }
    }

    public openCreateCategoryDialog(): void {
        const createDialogRef = this.dialog.open(CategoryModalDialogComponent, {
            data: EMPTY_CATEGORY
        });
    }

    public openEditCategoryDialog(category: CategoryModel): void {
        const editDialogRef = this.dialog.open(CategoryModalDialogComponent, {
            data: category
        });

    }

    public deleteCategory(category: CategoryModel): void {
        if(!this.categoryIsUsedForPayments(category.id, this.categoryIdsPerPayment)) {
            this.categoryService.deleteCategory(category.id);
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Kategorie wurde erfolgeich entfernt',
                buttonText: 'OK'
            });
        } else {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Kategorie konnt nicht entfernt werden, da sie noch mit mindestens einer bestehenden Buchung verknüpft ist.',
                buttonText: 'OK'
            });
        }
    }

    private sortCategoriesAsc(categories: CategoryModel[]): CategoryModel[] {
        return categories.sort((a: CategoryModel, b: CategoryModel)=> a.name > b.name ? 1:-1 );
    }

    private getCategoriesPerPayment(): void {
        this.paymentService.getPayments().pipe(takeUntil(this.ngDestroy))
            .subscribe((payments: PaymentModel[]) => {
                payments.forEach((payment: PaymentModel) => {
                    this.categoryIdsPerPayment.push(payment.categoryId);
                });
            });
    }

    private categoryIsUsedForPayments(categoryId: string, categoryIdsPerPayment: string[]): any {
        return categoryIdsPerPayment.some((categoryIdsPerPayment: string) => categoryIdsPerPayment === categoryId);
    }
}
