import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, Observable, ReplaySubject } from 'rxjs';
import { NOTIFICATION_TYPE } from '../enum/notification-type.enum';
import { Category } from '../models/category.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private categoriesSubject: ReplaySubject<Category[]>

    constructor(private notificationService: NotificationService) {
        this.categoriesSubject = new ReplaySubject<Category[]>(1);
        this.fetchCategories();
    }

    private fetchCategories(): void {
        from(invoke<Category[]>('get_categories')).subscribe((categories: Category[]) => {
            this.categoriesSubject.next(JSON.parse(categories.toString()));
        })
    }

    public getCategories(): Observable<Category[]> {
        return this.categoriesSubject.asObservable();
    }

    public createCategory(category: Category): void {
        invoke('create_category', {
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
        })
        this.fetchCategories();
    }

    public updateCategory(category: Category): void {
        invoke('update_category', {
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
        })
        this.fetchCategories();
    }

    public deleteCategory(categoryId: string): void {
        invoke('delete_category', {
            id: categoryId
        })
        this.fetchCategories();
    }
}
