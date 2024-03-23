
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CategoryFacade } from '../../../../core/facades/category.facade';
import { CategoryModel, EMPTY_CATEGORY } from '../../../../core/models/category.model';
import { CategoryModalDialogComponent } from '../../../../dialog/category-modal-dialog/category-modal-dialog.component';
import { NOTIFICATION_TYPE } from '../../../../enum/notification-type.enum';
import { NotificationService } from '../../../../services/notification.service';
import { CategoryListVM } from '../../models/category.vm';
import { CategoryListPresenter } from '../../presenter/category-list.presenter';
import { CategoryListComponent } from './category-list.component';

const mockedCategory: CategoryListVM[] = [
    {
        id: 'id1',
        name: 'name1',
        defaultCategory: true
    },
    {
        id: 'id2',
        name: 'name2',
        defaultCategory: false
    },
    {
        id: 'id2',
        name: 'name2',
        defaultCategory: false
    }
];

describe('CategoryListComponent', () => {
    let component: CategoryListComponent;

    const categoryFacade: any = {
        deleteCategory: () => {}
    } as unknown as CategoryFacade;

    const categoryListPresenter: any = {
        categoriesVM$: of(mockedCategory)
    } as unknown as CategoryListPresenter;

    const notificationService: any = {
        showNotification: () => {}
    } as unknown as NotificationService;

    const dialog: any = {
        open: () => {}
    } as unknown as MatDialog;


    beforeEach(() => {
        component = new CategoryListComponent(categoryFacade, categoryListPresenter, notificationService, dialog);
    });

    it('should create', () => {
        component.ngOnInit();
        expect(component).toBeTruthy();
        component.ngAfterViewInit();
    });

    it('should load the category data', () => {
        component.ngOnInit();
        expect(component.categoryDataSource.data).toEqual(mockedCategory);
        component.ngOnDestroy();
    });

    it('should filter categories correctly', () => {
        const mockEvent = new Event('name1');
        Object.defineProperty(mockEvent, 'target', { value: { value: 'name1' } });

        component.filterCategories(mockEvent);

        expect(component.categoryDataSource.filter).toBe('name1');
    });

    it('should reset filter when empty value is provided', () => {
        component.categoryDataSource.filter = 'previousFilterValue';

        const mockEvent = new Event('');
        Object.defineProperty(mockEvent, 'target', { value: { value: '' } });

        component.filterCategories(mockEvent);

        expect(component.categoryDataSource.filter).toEqual('');
    });

    it('should call firstPage method on paginator if available', () => {
        const mockEvent = new Event('testFilter');
        Object.defineProperty(mockEvent, 'target', { value: { value: 'testFilter' } });

        component.categoryDataSource.paginator = {
            firstPage: jest.fn(),
        } as any;

        component.filterCategories(mockEvent);

        expect(component.categoryDataSource.paginator?.firstPage).toHaveBeenCalled();
      });

    it('should open CategoryModalDialogComponent with EMPTY_CATEGORY data', () => {
        const openSpy = jest.spyOn(dialog, 'open');

        component.openCreateCategoryDialog();

        expect(openSpy).toHaveBeenCalledWith(CategoryModalDialogComponent, {
          data: EMPTY_CATEGORY
        });
    });

    it('should open CategoryModalDialogComponent for edit the category data', () => {
        const openSpy = jest.spyOn(dialog, 'open');

        const mockedCategory: CategoryModel = {
            id: 'id1',
            name: 'name1',
            defaultCategory: true
        };

        component.openEditCategoryDialog(mockedCategory);

        expect(openSpy).toHaveBeenCalledWith(CategoryModalDialogComponent, {
            data: mockedCategory
        });
    });

    it('should delete a category', () => {
        jest.spyOn(categoryFacade, 'deleteCategory');
        jest.spyOn(notificationService,'showNotification');

        const categoryId: string = 'id1';

        const notification: any = {
            notificationType: NOTIFICATION_TYPE.SUCCESS,
            message: 'Die Kategorie ist mit keiner bestehenden Buchung verbunden und wurde somit erfolgeich entfernt',
            buttonText: 'OK'
        };

        component.deleteCategory(categoryId);

        expect(categoryFacade.deleteCategory).toHaveBeenCalledWith(categoryId);
        expect(notificationService.showNotification).toHaveBeenCalledWith(notification);
    });
});
