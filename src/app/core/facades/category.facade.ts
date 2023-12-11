import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryServiceNew } from "../data-access/services/category-new/category.service.new";
import { CategoryModel } from "../models/category.model";
import { CategoryState } from "../states/category.state";

@Injectable({ providedIn: 'root' })
export class CategoryFacade {

    public categories$: Observable<CategoryModel[]>;

    constructor(
        private categoryService: CategoryServiceNew,
        private categoryState: CategoryState
    ) {
        this.categories$ = this.categoryState.categories$;
    }

    public loadCategories(): void {
        this.categoryService.getCategoriesNew().subscribe((categories: CategoryModel[]) => {
            // JSON.parse(categories.toString())
            //console.log('categories', JSON.parse(categories.toString()));
            this.categoryState.setCategories(JSON.parse(categories.toString()));
        });
    }

}
