import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, Observable } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category.model';
import { CategoryDto } from '../../dtos/category.dto';



@Injectable({
  providedIn: 'root'
})
export class CategoryServiceNew {

    constructor() {
    }


    // TODO: NEW CODE

    public getCategoriesNew(): Observable<CategoryModel[]> {
        // return from(invoke<CategoryDto[]>('get_categories')).pipe(
        //     map((dtos: CategoryDto[]) => dtos.map((dto: CategoryDto) => this.mapCategoryFromDto(JSON.parse(dto.toString()))))
        // );

        // return from(invoke<CategoryDto[]>('get_categories')).pipe(
        //     tap(() => console.log('fooo')),
        //     map((dtos: CategoryDto[]) => dtos.map((dto: CategoryDto) => this.mapCategoryFromDto(dto)))
        // ).subscribe((c: CategoryModel[]) => {console.log('faa', c)})

        return from(invoke<CategoryDto[]>('get_categories'));
    }

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
