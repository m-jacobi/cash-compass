import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';


import { CategoryModalDialogComponent } from '../../dialog/category-modal-dialog/category-modal-dialog.component';
import { NOTIFICATION_TYPE } from '../../enum/notification-type.enum';
import { Category, EMPTY_CATEGORY } from '../../models/category.model';
import { DefaultCategory } from '../../models/default-category.model';
import { Payment } from '../../models/payment.model';
import { CategoryService } from '../../service/category.service';
import { NotificationService } from '../../service/notification.service';
import { PaymentService } from '../../service/payment.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {

    public categoryDataSource: MatTableDataSource<Category>;
    public tableColumns: string[];
    public defaultCategories: DefaultCategory[];
    private categories: Category[];
    private categoryIdsPerPayment: string[];
    private payments: Payment[];

    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    private readonly ngDestroy = new Subject<void>();

    constructor(
        private categoryService: CategoryService,
        private paymentService: PaymentService,
        private notificationService: NotificationService,
        private dialog: MatDialog,
    ) {
        this.tableColumns = ['name', 'action'];
        this.categoryDataSource = new MatTableDataSource<Category>([]);
        this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
        this.sort = new MatSort;
        this.categories = [];
        this.categoryIdsPerPayment = [];
        this.payments = [];
        this.defaultCategories = [
            {
                name: "---",
                default: "noFilter",
            },
            {
                name: "Ja",
                default: true,
            }, {
                name: "Nein",
                default: false,
            }
        ];
    }

    ngOnInit(): void {
        this.getCategories();
        this.getCategoriesperPayment();
    }

    public getCategories(): void {
        this.categoryService.getCategories().pipe(takeUntil(this.ngDestroy))
            .subscribe((categories: Category[]) => {
                this.categories = categories;
                this.categoryDataSource.data = this.sortCategoriesAsc(categories);
         })
    }

    private sortCategoriesAsc(categories: Category[]): Category[] {
        return categories.sort((a: Category, b: Category)=> a.name > b.name ? 1:-1 );
    }

    private getCategoriesperPayment(): void {
        this.paymentService.getPayments().pipe(takeUntil(this.ngDestroy))
            .subscribe((payments: Payment[]) => {
                payments.forEach((payment: Payment) => {
                    this.categoryIdsPerPayment.push(payment.categoryId);
                });
            });
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

    public filterCategories(event: Event): void  {
        const filterValue = (event.target as HTMLInputElement).value;
        this.categoryDataSource.filter = filterValue.trim().toLowerCase();

        if (this.categoryDataSource.paginator) {
            this.categoryDataSource.paginator.firstPage();
        }
    }

    public filterDefaultCategory(event: any): void {
        if (event.value != "noFilter") {
            const filteredDataByDefaultCategory = this.categories.filter((category: Category) => category.defaultCategory === event.value);
            this.categoryDataSource.data = filteredDataByDefaultCategory;
        } else {
            this.categoryDataSource.data = this.categories;
        }
    }

    public openCreateCategoryDialog(): void {
        const createDialogRef = this.dialog.open(CategoryModalDialogComponent, {
            data: EMPTY_CATEGORY
        });
    }

    public openEditCategoryDialog(category: Category): void {
        const editDialogRef = this.dialog.open(CategoryModalDialogComponent, {
            data: category
        });

    }

    public deleteCategory(category: Category): void {
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
                message: 'Die Kategorie konnt nicht entfernt werden, da sie noch mit mindestens einer bestehenden Buchung verknüpft ist',
                buttonText: 'OK'
            });
        }
    }

    private categoryIsUsedForPayments(categoryId: string, categoryIdsPerPayment: string[]): any {
        return categoryIdsPerPayment.some((categoryIdsPerPayment: string) => categoryIdsPerPayment === categoryId);
    }
}
