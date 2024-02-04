import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryFacade } from 'src/app/core/facades/category.facade';
import { CategoryModel } from '../../core/models/category.model';

@Component({
  selector: 'app-category-modal-dialog',
  templateUrl: './category-modal-dialog.component.html',
  styleUrls: ['./category-modal-dialog.component.scss']
})
export class CategoryModalDialogComponent {

    public categoryForm: FormGroup;

    constructor(
        private categoryFacade: CategoryFacade,
        private modalRef: MatDialogRef<CategoryModalDialogComponent, CategoryModel>,
        @Inject(MAT_DIALOG_DATA) public data: CategoryModel
    ) {
        this.categoryForm = new FormGroup({
            name: new FormControl<string>(this.data.name, Validators.required)
        });
    }

    public get formControl() {
        return this.categoryForm.controls;
    }

    public saveCategory(): void {
        const category: CategoryModel = {
            id: this.data.id,
            name: this.formControl['name'].value,
            defaultCategory: this.data.defaultCategory,
        }

        if(this.data.id) {
            this.categoryFacade.updateCategory(category);
        } else {
            this.categoryFacade.createCategory(category);
        }
        this.onClose();
    }

    public onClose(): void {
        this.modalRef.close();
    }
}
