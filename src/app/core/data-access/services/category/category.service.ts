import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, Observable, ReplaySubject } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category.model';
import { NOTIFICATION_TYPE } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryDto } from '../../dtos/category.dto';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private categoriesSubject: ReplaySubject<CategoryModel[]>

    constructor(private notificationService: NotificationService) {
        this.categoriesSubject = new ReplaySubject<CategoryModel[]>(1);
        this.fetchCategories();
    }

    private fetchCategories(): void {
        from(invoke<CategoryModel[]>('get_categories')).subscribe((categories: CategoryModel[]) => {
            this.categoriesSubject.next(JSON.parse(categories.toString()));
        })
    }

    public getCategories(): Observable<CategoryModel[]> {
        return this.categoriesSubject.asObservable();
    }

    public createCategory(category: CategoryModel): void {
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

    public updateCategory(category: CategoryModel): void {
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

    // TODO: NEW CODE

    // public getCategoriesNew(): Observable<CategoryModel[]> {
    //     // return from(invoke<CategoryDto[]>('get_categories')).pipe(
    //     //     map((dtos: CategoryDto[]) => dtos.map((dto: CategoryDto) => this.mapCategoryFromDto(JSON.parse(dto.toString()))))
    //     // );

    //     // return from(invoke<CategoryDto[]>('get_categories')).pipe(
    //     //     tap(() => console.log('fooo')),
    //     //     map((dtos: CategoryDto[]) => dtos.map((dto: CategoryDto) => this.mapCategoryFromDto(dto)))
    //     // ).subscribe((c: CategoryModel[]) => {console.log('faa', c)})
    // }

    // public getContractCommitments(year: number, departmentId: string = null, activityId: string = null): Observable<ContractCommitmentModel[]> {
    //     const url = `${environment.commitmentApiUrl}/contract-commitments?year=${year}`
    //         + (departmentId ? `&department-id=${departmentId}` : '')
    //         + (activityId ? `&activity-id=${activityId}` : '');

    //     return this.http.get<ContractCommitmentDto[]>(url).pipe(
    //         map((dtos: ContractCommitmentDto[]) => dtos.map((dto: ContractCommitmentDto) => this.mapContractCommitmentFromDto(dto)))
    //     );
    // }

    private mapCategoryFromDto(dto: CategoryDto): CategoryModel {
        console.log('dto', dto);
        return {
            id: dto.id,
            name: dto.name,
            defaultCategory: dto.defaultCategory
        }
    }
}
