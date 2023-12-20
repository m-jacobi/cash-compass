import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, Observable } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category.model';
import { CategoryDto } from '../../dtos/category.dto';



@Injectable({
  providedIn: 'root'
})
export class CategoryServiceNew {

    constructor() {}

    public getCategories(): Observable<CategoryModel[]> {
        return from(invoke<CategoryDto[]>('get_categories'));
    }
}
