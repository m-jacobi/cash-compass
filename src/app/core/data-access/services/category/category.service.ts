import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, Observable } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category.model';
import { NOTIFICATION_TYPE } from '../../../../enum/notification-type.enum';
import { NotificationService } from '../../../../services/notification.service';

@Injectable({providedIn: 'root'})
export class CategoryService {

    constructor(private notificationService: NotificationService) {}

    public getCategories(): Observable<CategoryModel[]> {
        return from(invoke<CategoryModel[]>('get_categories'));
    }

    public createCategory(category: CategoryModel): void {
         invoke<CategoryModel[]>('create_category', {
            name: category.name,
            defaultCategory: category.defaultCategory,
        }).then(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Kategorie wurde erfolgreich angelegt',
                buttonText: 'OK',
            });
        }).catch(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Kategorie konnt nicht angelegt werden',
                buttonText: 'OK',

            });
        });
    }

    public updateCategory(category: CategoryModel): void {
        invoke<CategoryModel[]>('update_category', {
            id: category.id,
            name: category.name,
            defaultCategory: category.defaultCategory,
        }).then(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                message: 'Die Kategorie wurde aktualisiert',
                buttonText: 'OK',

            });
        }).catch(() => {
            this.notificationService.showNotification({
                notificationType: NOTIFICATION_TYPE.ERROR,
                message: 'Die Kategorie konnt nicht aktualisiert werden',
                buttonText: 'OK',

            });
        });
    }

    public deleteCategory(categoryId: string): void {
        invoke<CategoryModel[]>('delete_category', {
            id: categoryId
        });
    }
}
