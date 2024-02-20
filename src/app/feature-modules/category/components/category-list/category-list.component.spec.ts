
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CategoryFacade } from '../../../../core/facades/category.facade';
import { CategoryModel } from '../../../../core/models/category.model';
import { NotificationService } from '../../../../services/notification.service';
import { CategoryListPresenter } from '../../presenter/category-list.presenter';
import { CategoryListComponent } from './category-list.component';

const mockedCategory: CategoryModel[] = [
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
]
describe('CategoryListComponent', () => {
    let component: CategoryListComponent;

    const categoryFacade: any = {
        categories$: of(),
        loadCategories: () => {},
        createCategory: () => {},
        updateCategory: () => {},
        deleteCategory: () => {}
    } as unknown as CategoryFacade;

    const categoryListPresenter: any = {
        categoriesVM$: of()
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
        expect(component).toBeTruthy();
    });
});
