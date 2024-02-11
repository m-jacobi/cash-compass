import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

import { CategoryService } from "../data-access/services/category/category.service";
import { CategoryModel } from "../models/category.model";

@Injectable({ providedIn: 'root' })
export class CategoryFacade {

    public categories$: Observable<CategoryModel[]>;

    private categoriesSource =  new ReplaySubject<CategoryModel[]>(1)

    constructor(
        private categoryService: CategoryService,
    ) {
        this.loadCategories();
        this.categories$ = this.categoriesSource.asObservable();
    }

    public loadCategories(): void {
        this.categoryService.getCategories().subscribe((categories: CategoryModel[]) => {
            this.categoriesSource.next(categories);
        });
    }

    public createCategory(category: CategoryModel): void {
        this.categoryService.createCategory(category);
        this.loadCategories();
    }

    public updateCategory(category: CategoryModel): void {
        this.categoryService.updateCategory(category);
        this.loadCategories();
    }

    public deleteCategory(categoryId: string): void {
        this.categoryService.deleteCategory(categoryId);
        this.loadCategories();
    }
}
