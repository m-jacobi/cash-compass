import { invoke } from '@tauri-apps/api';
import { mockIPC } from '@tauri-apps/api/mocks';
import { NotificationService } from '../../../../services/notification.service';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
    let service: CategoryService;

    const notificationService: any = {
        showNotification: () => {}
    } as unknown as NotificationService;

    beforeEach(() => {
        service = new CategoryService(notificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all categories', () => {
        const mockedCategories: CategoryModel[] = [
            {
                id: 'id1',
                name: 'shopping',
                defaultCategory: true
            },
            {
                id: 'id2',
                name: 'car',
                defaultCategory: true
            }
        ];

        mockIPC((cmd) => {
            if (cmd === 'get_categories') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');

        service.getCategories().subscribe((categories: CategoryModel[]) => {
            invoke('get_categories');
            expect(spy).toHaveBeenCalled();
            expect(categories).toEqual(mockedCategories);
        });
    });

    it('should create a category', () => {
        const mockedCategory: CategoryModel = {
            id: 'idNew1',
            name: 'music',
            defaultCategory: false
        }

        service.createCategory(mockedCategory);

        mockIPC((cmd) => {
            if (cmd === 'create_category') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');
        invoke('create_category');
        expect(spy).toHaveBeenCalled();
    });

    it('should update a category', () => {
        const mockedCategory: CategoryModel = {
            id: 'id2',
            name: 'party',
            defaultCategory: true
        }

        service.updateCategory(mockedCategory);

        mockIPC((cmd) => {
            if (cmd === 'update_category') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');
        invoke('update_category');
        expect(spy).toHaveBeenCalled();
    });

    it('should delete a category', () => {
        const mockedCategoryId: string = 'id1';

        service.deleteCategory(mockedCategoryId);

        mockIPC((cmd) => {
            if (cmd === 'delete_category') {
              return;
            }
        });

        const spy = jest.spyOn(window, '__TAURI_IPC__');
        invoke('delete_category');
        expect(spy).toHaveBeenCalled();
    });
});
