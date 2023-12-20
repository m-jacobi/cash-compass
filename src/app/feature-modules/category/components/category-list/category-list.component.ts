import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/core/data-access/services/category/category.service';
import { CategoryFacade } from 'src/app/core/facades/category.facade';
import { CategoryModel, EMPTY_CATEGORY } from '../../../../core/models/category.model';
import { CategoryModalDialogComponent } from '../../../../dialog/category-modal-dialog/category-modal-dialog.component';
import { NOTIFICATION_TYPE } from '../../../../enum/notification-type.enum';
import { NotificationService } from '../../../../services/notification.service';
import { CategoryListVM } from '../../models/category.vm';
import { CategoryListPresenter } from '../../presenter/category-list.presenter';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    public categories$: Observable<CategoryModel[]>;
    public categoryDataSource: MatTableDataSource<CategoryModel>;
    public categoryListTableColumns: string[];
    private categoryIdsPerPayment: string[];
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private categoryService: CategoryService,
        private categoryFacade: CategoryFacade,
        private categoryListPresenter: CategoryListPresenter,
        private notificationService: NotificationService,
        private dialog: MatDialog,
    ) {
        this.categoryListTableColumns = ['name', 'action'];
        this.categoryDataSource = new MatTableDataSource<CategoryModel>([]);
        this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
        this.sort = new MatSort;
        this.categoryIdsPerPayment = [];
        this.categories$ = this.categoryFacade.categories$;
    }

    public ngOnInit(): void {
        this.categoryFacade.loadCategories();

        this.categoryListPresenter.categories$.pipe(takeUntil(this.ngDestroy)).subscribe((categories: CategoryListVM[]) => {
            this.categoryDataSource.data = categories;
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
        this.categoryService.deleteCategory(category.id);
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Kategorie ist mit keiner bestehenden Buchung verbunden und wurde somit erfolgeich entfernt',
                buttonText: 'OK'
            });
    }
}
