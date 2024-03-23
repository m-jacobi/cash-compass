import { of } from "rxjs";
import { CategoryService } from "../data-access/services/category/category.service";
import { CategoryModel } from "../models/category.model";
import { CategoryFacade } from "./category.facade";

const mockedCategories: CategoryModel[] = [
    {
        id: 'id1',
        name: 'name1',
        defaultCategory: true
    },
    {
        id: 'id2',
        name: 'name2',
        defaultCategory: true
    },
    {
        id: 'id3',
        name: 'name3',
        defaultCategory: false
    }
];

describe('CategoryFacade', () => {
    let facade: CategoryFacade;

    const categoryService: any = {
        getCategories: () => of(mockedCategories),
        createCategory: () => {},
        updateCategory: () => {},
        deleteCategory: () => {}
    } as unknown as CategoryService;

    beforeEach(() => {
        facade = new CategoryFacade(categoryService);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should be created', () => {
        expect(facade).toBeTruthy();
    });

    it('should load categories', () => {
        jest.spyOn(categoryService, 'getCategories');

        facade.loadCategories();
        jest.runOnlyPendingTimers();

        const sub = facade.categories$.subscribe((categories: CategoryModel[]) => {
            expect(categories).toEqual(mockedCategories);
            expect(categoryService.getCategories).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });

    it('should create a category', () => {
        jest.spyOn(categoryService, 'createCategory');
        jest.spyOn(categoryService, 'getCategories');

        const mockedNewCategory: CategoryModel = {
            id: '',
            name: 'newCategory',
            defaultCategory: false
        };

        facade.createCategory(mockedNewCategory);
        jest.runOnlyPendingTimers();

        const sub = facade.categories$.subscribe(() => {
            expect(categoryService.createCategory).toHaveBeenCalledWith(mockedNewCategory);
            expect(categoryService.createCategory).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });

    it('should update a category', () => {
        jest.spyOn(categoryService, 'updateCategory');
        jest.spyOn(categoryService, 'getCategories');

        const mockedUpdateCategory: CategoryModel = {
            id: 'id2',
            name: 'nameUpdate',
            defaultCategory: true
        };

        facade.updateCategory(mockedUpdateCategory);
        jest.runOnlyPendingTimers();

        const sub = facade.categories$.subscribe(() => {
            expect(categoryService.updateCategory).toHaveBeenCalledWith(mockedUpdateCategory);
            expect(categoryService.updateCategory).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });

    it('should delete a category', () => {
        jest.spyOn(categoryService, 'updateCategory');
        jest.spyOn(categoryService, 'getCategories');

        const mockedDeleteCategory: string = 'id1';

        facade.deleteCategory(mockedDeleteCategory);
        jest.runOnlyPendingTimers();

        const sub = facade.categories$.subscribe(() => {
            expect(categoryService.deleteCategory).toHaveBeenCalledWith(mockedDeleteCategory);
            expect(categoryService.deleteCategory).toHaveBeenCalled();
        });

        sub.unsubscribe();
    });
});
