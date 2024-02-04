import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { TDictionary } from "../../utils/dictionary.util";
import { CategoryModel } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryState {

    public categories$: Observable<CategoryModel[]>;

    private categoriesSource = new ReplaySubject<CategoryModel[]>(1);
    private categoriesDict: TDictionary<CategoryModel>;
    constructor() {
        this.categoriesDict = {};
        this.categories$ = this.categoriesSource.asObservable();
    }

    public setCategories(categories: CategoryModel[]): void {
        this.categoriesToState(categories);
        this.categoriesSource.next(this.categoriesFromState());
    }

    private categoriesToState(categories: CategoryModel[]): void {
        this.categoriesDict = {};

        categories.forEach(
            (category: CategoryModel) => this.categoriesDict[category.id] = {...category}
        );
    }

    private categoriesFromState(): CategoryModel[] {
        return Object.values(this.categoriesDict);
    }

}
