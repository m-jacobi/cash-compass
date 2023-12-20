import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CategoryService } from "../data-access/services/category/category.service";
import { CategoryModel } from "../models/category.model";
import { CategoryState } from "../states/category.state";

@Injectable({ providedIn: 'root' })
export class CategoryFacade {

    public categories$: Observable<CategoryModel[]>;

    constructor(
        private categoryService: CategoryService,
        private categoryState: CategoryState
    ) {
        this.categories$ = this.categoryState.categories$;
    }

    public loadCategories(): void {
        this.categoryService.getCategories().subscribe((categories: CategoryModel[]) => {
            this.categoryState.setCategories(JSON.parse(categories.toString()));
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
